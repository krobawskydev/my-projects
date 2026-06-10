export const defaultLocale = 'en'

export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
}

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : defaultLocale
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [maybeLocale] = pathname.split('/').filter(Boolean)
  return normalizeLocale(maybeLocale)
}

export function removeLocaleFromPathname(pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const segments = normalizedPath.split('/').filter(Boolean)

  if (isLocale(segments[0])) {
    const pathWithoutLocale = segments.slice(1).join('/')
    return pathWithoutLocale ? `/${pathWithoutLocale}` : '/'
  }

  return normalizedPath
}

export function localizePath(pathname: string, locale: Locale): string {
  const unlocalizedPath = removeLocaleFromPathname(pathname)

  if (locale === defaultLocale) {
    return unlocalizedPath
  }

  return unlocalizedPath === '/'
    ? `/${locale}/`
    : `/${locale}${unlocalizedPath}`
}

export function getAlternateLocalePath(pathname: string, locale: Locale): string {
  return localizePath(pathname, locale)
}
