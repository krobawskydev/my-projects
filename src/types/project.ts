export interface Project {
  id: string
  title: string
  slug: string
  short_description: string
  content: string
  cover_image: string
  gallery: string[]
  github_url: string
  live_url: string
  featured: boolean
  created_at: string
  skills?: Skill[]
}

export interface Skill {
  id: string
  name: string
  slug: string
  category: SkillCategory
  icon: string
  created_at: string
}

export type SkillCategory =
  | 'language'
  | 'framework'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'mobile'
  | 'cloud'
  | 'tool'

export interface ProjectSkill {
  id: string
  project_id: string
  skill_id: string
}
