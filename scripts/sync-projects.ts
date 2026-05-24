import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@supabase/supabase-js'
import yaml from 'js-yaml'
import 'dotenv/config'

type ProjectType = 'enterprise' | 'freelance' | 'startup' | 'personal' | 'landing_page'

type ProjectSeed = {
  title: string
  slug: string
  short_description: string
  content?: string
  cover_image?: string
  gallery?: string[]
  github_url?: string
  live_url?: string
  featured?: boolean
  project_type?: ProjectType
  role?: string
  company?: string
  duration?: string
  team_size?: number | null
  published?: boolean
  display_order?: number
  highlights?: string[]
  technologies?: string[]
}

type ProjectSeedFile = {
  projects: ProjectSeed[]
}

type ProjectRow = {
  id: string
  slug: string
}

type SkillRow = {
  id: string
  name: string
  slug: string
}

const seedPath = resolve('content', 'seeds', 'projects.yml')

function readYamlFile(path: string): ProjectSeedFile {
  const raw = readFileSync(path, 'utf-8')
  return yaml.load(raw) as ProjectSeedFile
}

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function getSupabaseClient() {
  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.')
  }

  return createClient(supabaseUrl, supabaseKey)
}

async function main() {
  const seedFile = readYamlFile(seedPath)
  const projects = seedFile.projects

  if (projects.length === 0) {
    throw new Error('No projects found in content/seeds/projects.yml.')
  }

  const supabase = getSupabaseClient()
  const projectRows = projects.map((project) => ({
    title: project.title,
    slug: project.slug,
    short_description: project.short_description,
    content: project.content ?? '',
    cover_image: project.cover_image ?? '',
    gallery: project.gallery ?? [],
    github_url: project.github_url ?? '',
    live_url: project.live_url ?? '',
    featured: project.featured ?? false,
    project_type: project.project_type ?? 'personal',
    role: project.role ?? '',
    company: project.company ?? '',
    duration: project.duration ?? '',
    team_size: project.team_size ?? null,
    published: project.published ?? true,
    display_order: project.display_order ?? 0,
    highlights: project.highlights ?? [],
  }))

  const { data: syncedProjects, error: projectError } = await supabase
    .from('projects')
    .upsert(projectRows, { onConflict: 'slug' })
    .select('id, slug')

  if (projectError) {
    throw projectError
  }

  const { data: skills, error: skillError } = await supabase
    .from('skills')
    .select('id, name, slug')

  if (skillError) {
    throw skillError
  }

  const projectBySlug = new Map((syncedProjects ?? []).map((project: ProjectRow) => [project.slug, project]))
  const skillByNameOrSlug = new Map<string, SkillRow>()

  for (const skill of (skills ?? []) as SkillRow[]) {
    skillByNameOrSlug.set(normalize(skill.slug), skill)
    skillByNameOrSlug.set(normalize(skill.name), skill)
  }

  const relations: Array<{ project_id: string; skill_id: string }> = []
  const missing = new Set<string>()

  for (const project of projects) {
    const projectRow = projectBySlug.get(project.slug)
    if (!projectRow) continue

    for (const technology of project.technologies ?? []) {
      const skill = skillByNameOrSlug.get(normalize(technology))

      if (!skill) {
        missing.add(technology)
        continue
      }

      relations.push({
        project_id: projectRow.id,
        skill_id: skill.id,
      })
    }
  }

  if (relations.length > 0) {
    const { error: relationError } = await supabase
      .from('project_skills')
      .upsert(relations, { onConflict: 'project_id,skill_id' })

    if (relationError) {
      throw relationError
    }
  }

  if (missing.size > 0) {
    console.warn(`Missing skills for technologies: ${Array.from(missing).join(', ')}`)
  }

  console.log(`Synced ${projects.length} projects and ${relations.length} project skill relations.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
