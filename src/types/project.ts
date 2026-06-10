import { t, type Locale } from '../i18n'

export type ProjectType =
  | 'enterprise'
  | 'freelance'
  | 'startup'
  | 'personal'
  | 'landing_page'

export const PROJECT_TYPE_VARIANTS: Record<ProjectType, string> = {
  enterprise: 'border border-border/40 bg-surface text-foreground',
  freelance: 'border border-accent/20 bg-accent/5 text-accent',
  startup: 'border border-blue-500/20 bg-blue-500/5 text-blue-400',
  personal: 'border border-border bg-elevated text-muted',
  landing_page: 'border border-green-500/20 bg-green-500/5 text-green-400',
}

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
  project_type: ProjectType
  role: string
  company: string
  duration: string
  team_size: number | null
  published: boolean
  display_order: number
  highlights: string[]
  translations?: ProjectTranslations | null
  created_at: string
  updated_at: string
  skills?: Skill[]
}

export interface Skill {
  id: string
  name: string
  slug: string
  category: SkillCategory
  icon: string
  display: boolean
  order: number
  created_at: string
}

export type SkillCategory =
  | 'language'
  | 'framework'
  | 'frontend'
  | 'backend'
  | 'architecture'
  | 'database'
  | 'mobile'
  | 'cloud'
  | 'tool'

export interface ProjectSkill {
  id: string
  project_id: string
  skill_id: string
}

export type ProjectTranslationFields = {
  title?: string
  short_description?: string
  content?: string
  role?: string
  company?: string
  duration?: string
  highlights?: string[]
}

export type ProjectTranslations = Partial<Record<Locale, ProjectTranslationFields>>

export function getProjectTypeLabel(locale: Locale, projectType: ProjectType): string {
  return t(locale, `projects.types.${projectType}`)
}
