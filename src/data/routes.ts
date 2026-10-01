/**
 * The logical pages of the site: one entry per page, shared by every locale.
 * The router, the platform landing pages and the sitemap generator all read
 * this file, so a page cannot be added in one place and forgotten in another.
 *
 * Paths keep the `.html` extension: those are the canonical, indexed URLs, and
 * vite-ssg emits exactly them.
 */
export type PlatformId = 'x' | 'reddit' | 'bluesky'

export const platformIds: readonly PlatformId[] = ['x', 'reddit', 'bluesky']

export const platformPaths: Record<PlatformId, string> = {
  x: '/x-video-downloader.html',
  reddit: '/reddit-video-downloader.html',
  bluesky: '/bluesky-video-downloader.html',
}

export const pagePaths = {
  home: '/',
  telegram: '/telegram-bot.html',
  faq: '/faq.html',
  policy: '/policy.html',
  login: '/login.html',
  library: '/library.html',
} as const

export type PublicPageKey = 'home' | 'telegram' | 'faq' | 'policy' | PlatformId

export interface PublicPage {
  key: PublicPageKey
  /** Logical path, the same for every locale (the prefix is added later). */
  path: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: string
}

/**
 * The pages that belong in the sitemap. The login, the library and the error
 * pages are deliberately absent: they are noindex.
 */
export const publicPages: PublicPage[] = [
  { key: 'home', path: pagePaths.home, changefreq: 'weekly', priority: '1.0' },
  ...platformIds.map(
    (id): PublicPage => ({
      key: id,
      path: platformPaths[id],
      changefreq: 'monthly',
      priority: '0.9',
    }),
  ),
  { key: 'telegram', path: pagePaths.telegram, changefreq: 'monthly', priority: '0.7' },
  { key: 'faq', path: pagePaths.faq, changefreq: 'monthly', priority: '0.6' },
  { key: 'policy', path: pagePaths.policy, changefreq: 'yearly', priority: '0.2' },
]
