import type { Locale } from '../../i18n'
import type { Project, Skill, SkillCategory } from '../../types/project'
import { hydrateProject, loadProjectSeeds, loadSkills } from './loaders'

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => {
    if (left.display_order !== right.display_order) {
      return left.display_order - right.display_order
    }

    return left.title.localeCompare(right.title)
  })
}

function sortSkills(skills: Skill[]): Skill[] {
  return [...skills].sort((left, right) => {
    if (left.category !== right.category) {
      return left.category.localeCompare(right.category)
    }

    if (left.order !== right.order) {
      return left.order - right.order
    }

    return left.name.localeCompare(right.name)
  })
}

function getSkillLookup(skills: Skill[]): Map<string, Skill> {
  const lookup = new Map<string, Skill>()

  for (const skill of skills) {
    lookup.set(normalize(skill.slug), skill)
    lookup.set(normalize(skill.name), skill)
  }

  return lookup
}

export async function getSkills(): Promise<Skill[]> {
  return sortSkills(loadSkills().filter((skill) => skill.display))
}

export async function getSkillsByCategory(): Promise<Record<SkillCategory, Skill[]>> {
  const skills = await getSkills()
  const grouped: Partial<Record<SkillCategory, Skill[]>> = {}

  for (const skill of skills) {
    grouped[skill.category] ??= []
    grouped[skill.category]?.push(skill)
  }

  return grouped as Record<SkillCategory, Skill[]>
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const projectSeeds = loadProjectSeeds().filter((project) => project.published)
  const skills = await getSkills()
  const skillLookup = getSkillLookup(skills)

  return sortProjects(projectSeeds.map((project) => hydrateProject(project, skillLookup, locale)))
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  const projects = await getProjects(locale)
  return projects.filter((project) => project.featured)
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return loadProjectSeeds()
    .filter((project) => project.published)
    .map((project) => project.slug)
}

export async function getProjectBySlugWithSkills(
  slug: string,
  locale: Locale
): Promise<Project | null> {
  const projectSeed = loadProjectSeeds().find(
    (project) => project.published && project.slug === slug
  )

  if (!projectSeed) {
    return null
  }

  const skills = await getSkills()
  return hydrateProject(projectSeed, getSkillLookup(skills), locale)
}
