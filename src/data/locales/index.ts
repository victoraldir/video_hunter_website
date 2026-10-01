import { en } from '@/data/locales/en'
import { es } from '@/data/locales/es'
import { pt } from '@/data/locales/pt'
import {
  alternates,
  defaultLocale,
  isLocale,
  localeFromPath,
  locales,
  localizedPath,
  routerAlias,
  routerPath,
  type Locale,
} from '@/data/locales/locale'
import type { Dictionary } from '@/data/locales/types'
import { pagePaths, platformIds, platformPaths } from '@/data/routes'

export {
  alternates,
  defaultLocale,
  isLocale,
  localeFromPath,
  locales,
  localizedPath,
  pagePaths,
  platformIds,
  platformPaths,
  routerAlias,
  routerPath,
}
export type { Dictionary, Locale }

/** Every locale's copy, keyed by locale. */
export const dictionaries: Record<Locale, Dictionary> = { en, pt, es }

export function dictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export interface NavItem {
  label: string
  path: string
}

/** The shared navigation: the three platform pages, the bot and the FAQ. */
export function navItems(copy: Dictionary): NavItem[] {
  return [
    ...platformIds.map((id) => ({ label: copy.platforms[id].name, path: platformPaths[id] })),
    { label: copy.nav.telegram, path: pagePaths.telegram },
    { label: copy.nav.faq, path: pagePaths.faq },
  ]
}
