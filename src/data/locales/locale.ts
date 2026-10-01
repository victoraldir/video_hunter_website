/**
 * The locale primitives. Deliberately dependency free: the router, the sitemap
 * generator and the runtime composable all read this, so it must not pull in a
 * dictionary or a Vue component.
 *
 * English is the default and stays at the root, because those URLs are already
 * indexed and linked. Every other locale lives under a prefix (`/pt/...`).
 */
export type Locale = 'en' | 'pt' | 'es'

export const locales: readonly Locale[] = ['en', 'pt', 'es']

export const defaultLocale: Locale = 'en'

/** The locale a page has when the URL carries no prefix. */
export function localeFromPath(path: string): Locale {
  const [first] = path.replace(/^\//, '').split(/[/?#]/, 1)
  const match = locales.find((locale) => locale === first)

  return match ?? defaultLocale
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * The public URL of a logical page in one locale. Logical paths are the English
 * ones (for example `/faq.html`) and are shared by every locale, so a page has
 * one canonical address per language and nothing is lost in translation.
 */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path

  return path === '/' ? `/${locale}/` : `/${locale}${path}`
}

/**
 * The vue-router path for a logical page. Routes are declared without the
 * `.html` extension so vite-ssg emits flat files, exactly as the English pages
 * already do. The root keeps its trailing slash so it is emitted as an
 * `index.html` inside the locale directory.
 */
export function routerPath(locale: Locale, path: string): string {
  return localizedPath(locale, path).replace(/\.html$/, '')
}

/** The `.html` alias, kept so indexed URLs keep resolving. Undefined at root. */
export function routerAlias(locale: Locale, path: string): string | undefined {
  if (path === '/') return undefined

  return localizedPath(locale, path)
}

/** Every locale's version of a logical page, for the hreflang alternates. */
export function alternates(path: string): { hreflang: string; href: string }[] {
  return locales.map((locale) => ({ hreflang: locale, href: localizedPath(locale, path) }))
}
