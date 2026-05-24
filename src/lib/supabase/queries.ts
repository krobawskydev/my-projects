import { supabase } from './client'
import type { Project, Skill, SkillCategory } from '../../types/project'

function getClient() {
  if (!supabase) {
    return null
  }
  return supabase
}

export async function getProjects(): Promise<Project[]> {
  const client = getClient()
  if (!client) return []

  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data ?? []
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const client = getClient()
  if (!client) return []

  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }

  return data ?? []
}

export async function getSkills(): Promise<Skill[]> {
  const client = getClient()
  if (!client) return []

  const { data, error } = await client
    .from('skills')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }

  return data ?? []
}

export async function getSkillsByCategory(): Promise<Record<SkillCategory, Skill[]>> {
  const skills = await getSkills()

  const grouped: Record<string, Skill[]> = {}

  for (const skill of skills) {
    const category = skill.category
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(skill)
  }

  return grouped as Record<SkillCategory, Skill[]>
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const client = getClient()
  if (!client) return []

  const { data, error } = await client
    .from('projects')
    .select('slug')
    .eq('published', true)

  if (error) {
    console.error('Error fetching project slugs:', error)
    return []
  }

  return (data ?? []).map((p) => p.slug)
}

export async function getProjectBySlugWithSkills(slug: string): Promise<Project | null> {
  const client = getClient()
  if (!client) return null

  const { data, error } = await client
    .from('projects')
    .select('*, project_skills(skill:skills(*))')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error(`Error fetching project with slug "${slug}":`, error)
    return null
  }

  return mapProjectSkills(data)
}

type ProjectWithRelations = Project & {
  project_skills?: Array<{
    skill?: Skill | null
  }>
}

function mapProjectSkills(project: ProjectWithRelations | null): Project | null {
  if (!project) return null

  return {
    ...project,
    skills: (project.project_skills ?? [])
      .map((relation) => relation.skill)
      .filter((skill): skill is Skill => Boolean(skill)),
  }
}
