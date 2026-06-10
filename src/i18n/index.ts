import { en } from './en'
import { es } from './es'
import { defaultLocale, type Locale } from './locales'

export {
  defaultLocale,
  getAlternateLocalePath,
  getLocaleFromPathname,
  isLocale,
  localeLabels,
  locales,
  localizePath,
  normalizeLocale,
  removeLocaleFromPathname,
} from './locales'

export type { Locale } from './locales'

export type TranslationDictionary = typeof en

type Primitive = string | number | boolean | null | undefined

type TranslationPath<T> = {
  [Key in keyof T & string]: T[Key] extends Primitive | readonly unknown[]
    ? Key
    : Key | `${Key}.${TranslationPath<T[Key]>}`
}[keyof T & string]

type TranslationPathValue<T, Path extends string> =
  Path extends `${infer Head}.${infer Rest}`
    ? Head extends keyof T
      ? TranslationPathValue<T[Head], Rest>
      : never
    : Path extends keyof T
      ? T[Path]
      : never

export type TranslationKey = TranslationPath<TranslationDictionary>

export const translations: Record<Locale, TranslationDictionary> = {
  en,
  es,
}

export function getTranslations(locale: Locale = defaultLocale): TranslationDictionary {
  return translations[locale] ?? translations[defaultLocale]
}

export function t<Key extends TranslationKey>(
  locale: Locale,
  key: Key,
): TranslationPathValue<TranslationDictionary, Key> {
  const dictionary = getTranslations(locale)
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }

    return undefined
  }, dictionary) as TranslationPathValue<TranslationDictionary, Key>
}
