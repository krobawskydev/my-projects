import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import yaml from 'js-yaml'
import type {
  Project,
  ProjectTranslations,
  ProjectTranslationFields,
  ProjectType,
  Skill,
  SkillCategory,
} from '../../types/project'
import { defaultLocale, type Locale } from '../../i18n'

type SkillSeed = {
  name?: unknown
  slug?: unknown
  category?: unknown
  icon?: unknown
  display?: unknown
  order?: unknown
}

type SkillsSeedFile = {
  skills?: unknown
}

type ProjectSeed = {
  title?: unknown
  slug?: unknown
  short_description?: unknown
  content?: unknown
  cover_image?: unknown
  gallery?: unknown
  github_url?: unknown
  live_url?: unknown
  featured?: unknown
  project_type?: unknown
  role?: unknown
  company?: unknown
  duration?: unknown
  team_size?: unknown
  published?: unknown
  display_order?: unknown
  highlights?: unknown
  technologies?: unknown
  translations?: unknown
}

type ProjectsSeedFile = {
  projects?: unknown
}

export type ProjectSeedRecord = {
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
  technologies: string[]
  translations: ProjectTranslations
}

const skillsSeedPath = resolve(process.cwd(), 'content', 'seeds', 'skills.yml')
const projectsSeedPath = resolve(process.cwd(), 'content', 'seeds', 'projects.yml')

function loadYamlFile<T>(path: string): T {
  const raw = readFileSync(path, 'utf-8')
  return yaml.load(raw) as T
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid ${field}: expected a non-empty string.`)
  }

  return value
}

function optionalString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function optionalBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function optionalNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' ? value : fallback
}

function optionalNullableNumber(value: unknown): number | null {
  return typeof value === 'number' ? value : null
}

function optionalStringArray(value: unknown, field: string): string[] {
  if (value == null) return []

  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${field}: expected an array of strings.`)
  }

  return value.map((entry, index) => requireString(entry, `${field}[${index}]`))
}

function isProjectType(value: unknown): value is ProjectType {
  return (
    value === 'enterprise' ||
    value === 'freelance' ||
    value === 'startup' ||
    value === 'personal' ||
    value === 'landing_page'
  )
}

function isSkillCategory(value: unknown): value is SkillCategory {
  return (
    value === 'language' ||
    value === 'framework' ||
    value === 'frontend' ||
    value === 'backend' ||
    value === 'architecture' ||
    value === 'database' ||
    value === 'mobile' ||
    value === 'cloud' ||
    value === 'tool'
  )
}

function normalizeTranslationFields(value: unknown, locale: string): ProjectTranslationFields {
  if (!isRecord(value)) {
    throw new Error(`Invalid translations.${locale}: expected an object.`)
  }

  return {
    title: typeof value.title === 'string' ? value.title : undefined,
    short_description:
      typeof value.short_description === 'string' ? value.short_description : undefined,
    content: typeof value.content === 'string' ? value.content : undefined,
    role: typeof value.role === 'string' ? value.role : undefined,
    company: typeof value.company === 'string' ? value.company : undefined,
    duration: typeof value.duration === 'string' ? value.duration : undefined,
    highlights: Array.isArray(value.highlights)
      ? value.highlights.map((entry, index) =>
          requireString(entry, `translations.${locale}.highlights[${index}]`)
        )
      : undefined,
  }
}

function normalizeTranslations(value: unknown): ProjectTranslations {
  if (value == null) return {}

  if (!isRecord(value)) {
    throw new Error('Invalid translations: expected an object keyed by locale.')
  }

  const translations: ProjectTranslations = {}

  for (const [locale, fields] of Object.entries(value)) {
    translations[locale as Locale] = normalizeTranslationFields(fields, locale)
  }

  return translations
}

export function loadSkills(): Skill[] {
  const data = loadYamlFile<SkillsSeedFile>(skillsSeedPath)

  if (!Array.isArray(data.skills)) {
    throw new Error('Invalid content/seeds/skills.yml: expected a top-level skills array.')
  }

  return data.skills.map((entry, index) => {
    const skill = entry as SkillSeed
    const category = skill.category

    if (!isSkillCategory(category)) {
      throw new Error(`Invalid skills[${index}].category: "${String(category)}".`)
    }

    return {
      id: requireString(skill.slug, `skills[${index}].slug`),
      name: requireString(skill.name, `skills[${index}].name`),
      slug: requireString(skill.slug, `skills[${index}].slug`),
      category,
      icon: requireString(skill.icon, `skills[${index}].icon`),
      display: optionalBoolean(skill.display, true),
      order: optionalNumber(skill.order, 0),
      created_at: '',
    }
  })
}

export function loadProjectSeeds(): ProjectSeedRecord[] {
  const data = loadYamlFile<ProjectsSeedFile>(projectsSeedPath)

  if (!Array.isArray(data.projects)) {
    throw new Error('Invalid content/seeds/projects.yml: expected a top-level projects array.')
  }

  return data.projects.map((entry, index) => {
    const project = entry as ProjectSeed
    const projectType = project.project_type

    if (projectType != null && !isProjectType(projectType)) {
      throw new Error(`Invalid projects[${index}].project_type: "${String(projectType)}".`)
    }

    return {
      title: requireString(project.title, `projects[${index}].title`),
      slug: requireString(project.slug, `projects[${index}].slug`),
      short_description: requireString(
        project.short_description,
        `projects[${index}].short_description`
      ),
      content: optionalString(project.content),
      cover_image: optionalString(project.cover_image),
      gallery: optionalStringArray(project.gallery, `projects[${index}].gallery`),
      github_url: optionalString(project.github_url),
      live_url: optionalString(project.live_url),
      featured: optionalBoolean(project.featured, false),
      project_type: projectType ?? 'personal',
      role: optionalString(project.role),
      company: optionalString(project.company),
      duration: optionalString(project.duration),
      team_size: optionalNullableNumber(project.team_size),
      published: optionalBoolean(project.published, true),
      display_order: optionalNumber(project.display_order, 0),
      highlights: optionalStringArray(project.highlights, `projects[${index}].highlights`),
      technologies: optionalStringArray(project.technologies, `projects[${index}].technologies`),
      translations: normalizeTranslations(project.translations),
    }
  })
}

function applyProjectLocale(
  seed: ProjectSeedRecord,
  locale: Locale = defaultLocale
): ProjectSeedRecord {
  const localized = seed.translations[locale] ?? {}

  return {
    ...seed,
    title: localized.title ?? seed.title,
    short_description: localized.short_description ?? seed.short_description,
    content: localized.content ?? seed.content,
    role: localized.role ?? seed.role,
    company: localized.company ?? seed.company,
    duration: localized.duration ?? seed.duration,
    highlights: localized.highlights ?? seed.highlights,
  }
}

export function hydrateProject(
  seed: ProjectSeedRecord,
  skillsByKey: Map<string, Skill>,
  locale: Locale = defaultLocale
): Project {
  const localizedSeed = applyProjectLocale(seed, locale)
  const resolvedSkills = localizedSeed.technologies
    .map((technology) => skillsByKey.get(technology.trim().toLowerCase()))
    .filter((skill): skill is Skill => Boolean(skill))

  return {
    id: localizedSeed.slug,
    title: localizedSeed.title,
    slug: localizedSeed.slug,
    short_description: localizedSeed.short_description,
    content: localizedSeed.content,
    cover_image: localizedSeed.cover_image,
    gallery: localizedSeed.gallery,
    github_url: localizedSeed.github_url,
    live_url: localizedSeed.live_url,
    featured: localizedSeed.featured,
    project_type: localizedSeed.project_type,
    role: localizedSeed.role,
    company: localizedSeed.company,
    duration: localizedSeed.duration,
    team_size: localizedSeed.team_size,
    published: localizedSeed.published,
    display_order: localizedSeed.display_order,
    highlights: localizedSeed.highlights,
    translations: localizedSeed.translations,
    created_at: '',
    updated_at: '',
    skills: resolvedSkills,
  }
}
