import type { SkillCategory } from './project'

export type { SkillCategory }

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: 'Languages',
  framework: 'Frameworks',
  frontend: 'Frontend',
  backend: 'Backend',
  architecture: 'Architecture',
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
  'architecture',
  'database',
  'mobile',
  'cloud',
  'tool',
]
