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

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: 'Languages',
  framework: 'Frameworks',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  mobile: 'Mobile',
  cloud: 'Cloud & DevOps',
  tool: 'Tools',
}

export const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  'language',
  'framework',
  'frontend',
  'backend',
  'database',
  'mobile',
  'cloud',
  'tool',
]
