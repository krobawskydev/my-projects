import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@supabase/supabase-js'
import yaml from 'js-yaml'
import 'dotenv/config'

type SkillCategory =
  | 'language'
  | 'framework'
  | 'frontend'
  | 'mobile'
  | 'backend'
  | 'database'
  | 'architecture'
  | 'cloud'
  | 'tool'

type SkillSeed = {
  name: string
  slug: string
  category: SkillCategory
  icon?: string
  display?: boolean
  order?: number
}

type SkillSeedFile = {
  skills: SkillSeed[]
}

const seedPath = resolve('content', 'seeds', 'skills.yml')

function readYamlFile(path: string): SkillSeedFile {
  const raw = readFileSync(path, 'utf-8')
  return yaml.load(raw) as SkillSeedFile
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
  const skills = seedFile.skills.map((skill) => ({
    name: skill.name,
    slug: skill.slug,
    category: skill.category,
    icon: skill.icon ?? '',
    display: skill.display ?? true,
    order: skill.order ?? 0,
  }))

  if (skills.length === 0) {
    throw new Error('No skills found in content/seeds/skills.yml.')
  }

  const supabase = getSupabaseClient()
  const seedSlugs = skills.map((skill) => skill.slug)

  const { error } = await supabase
    .from('skills')
    .upsert(skills, { onConflict: 'slug' })

  if (error) {
    throw error
  }

  const { data: existingSkills, error: fetchError } = await supabase
    .from('skills')
    .select('slug')

  if (fetchError) {
    throw fetchError
  }

  const staleSlugs = (existingSkills ?? [])
    .map((skill) => skill.slug)
    .filter((slug) => !seedSlugs.includes(slug))

  if (staleSlugs.length > 0) {
    const { error: deleteError } = await supabase
      .from('skills')
      .delete()
      .in('slug', staleSlugs)

    if (deleteError) {
      throw deleteError
    }
  }

  console.log(`Synced ${skills.length} skills.`)
  console.log(`Deleted ${staleSlugs.length} skills missing from content/seeds/skills.yml.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
