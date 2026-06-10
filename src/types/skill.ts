import { t, type Locale } from '../i18n'
import type { SkillCategory } from './project'

export type { SkillCategory }

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

export function getSkillCategoryLabel(locale: Locale, category: SkillCategory): string {
  return t(locale, `skills.categories.${category}`)
}
