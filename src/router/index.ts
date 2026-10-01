import type { RouteComponent, RouteMeta, RouteRecordRaw, RouterOptions } from 'vue-router'

import {
  defaultLocale,
  dictionaries,
  localizedPath,
  locales,
  routerAlias,
  routerPath,
  platformIds,
  platformPaths,
  pagePaths,
  type Locale,
} from '@/data/locales'
import { breadcrumbJsonLd, faqJsonLd, graph, howToJsonLd } from '@/data/schema'
import { siteUrl } from '@/data/site'
import type { SeoText } from '@/data/locales/types'

// Route metadata drives every SEO tag on the page (see src/App.vue), so each
// route declares its own title, description, canonical and structured data.
// `locale` and `logicalPath` are what let App.vue build the hreflang alternates
// without listing every translation by hand.
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    locale: Locale
    /** The English address of the page, shared by every locale. */
    logicalPath: string
    robots?: string
    jsonld?: Record<string, unknown>
  }
}

/** A route name that is stable for English and suffixed for the others. */
function routeName(locale: Locale, name: string): string {
  return locale === defaultLocale ? name : `${name}-${locale}`
}

interface PageMetaInput {
  locale: Locale
  logicalPath: string
  seo: SeoText
  jsonld?: Record<string, unknown>
  robots?: string
}

function pageMeta({ locale, logicalPath, seo, jsonld, robots }: PageMetaInput): RouteMeta {
  return {
    title: seo.title,
    description: seo.description,
    canonical: `${siteUrl}${localizedPath(locale, logicalPath)}`,
    locale,
    logicalPath,
    ...(robots ? { robots } : {}),
    ...(jsonld ? { jsonld } : {}),
  }
}

interface PageInput {
  locale: Locale
  name: string
  logicalPath: string
  component: RouteComponent
  meta: RouteMeta
  props?: RouteRecordRaw['props']
}

function page({ locale, name, logicalPath, component, meta, props }: PageInput): RouteRecordRaw {
  const alias = routerAlias(locale, logicalPath)

  return {
    path: routerPath(locale, logicalPath),
    name: routeName(locale, name),
    component,
    meta,
    ...(props ? { props } : {}),
    ...(alias ? { alias } : {}),
  }
}

function homeRoute(locale: Locale): RouteRecordRaw {
  const copy = dictionaries[locale]
  const logicalPath = pagePaths.home
  const loc = localizedPath(locale, logicalPath)

  return page({
    locale,
    name: 'home',
    logicalPath,
    component: () => import('@/views/HomeView.vue'),
    meta: pageMeta({
      locale,
      logicalPath,
      seo: copy.home.seo,
      jsonld: graph(
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}${loc}`,
          name: copy.siteName,
          description: copy.home.websiteDescription,
          inLanguage: locale,
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${siteUrl}/#app`,
          name: copy.siteName,
          url: `${siteUrl}${loc}`,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any (web browser)',
          description: copy.home.appDescription,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          featureList: copy.home.featureList,
          publisher: { '@type': 'Organization', name: copy.siteName, url: `${siteUrl}/` },
        },
      ),
    }),
  })
}

function platformRoute(locale: Locale, id: (typeof platformIds)[number]): RouteRecordRaw {
  const copy = dictionaries[locale]
  const platform = copy.platforms[id]
  const logicalPath = platformPaths[id]
  const loc = localizedPath(locale, logicalPath)

  return page({
    locale,
    name: `platform-${id}`,
    logicalPath,
    component: () => import('@/views/PlatformDownloaderView.vue'),
    props: { platform: id },
    meta: pageMeta({
      locale,
      logicalPath,
      seo: platform.seo,
      jsonld: graph(
        breadcrumbJsonLd(platform.heading, loc, copy.siteName, localizedPath(locale, pagePaths.home)),
        howToJsonLd(platform.howToHeading, platform.howTo),
        faqJsonLd(platform.faq),
      ),
    }),
  })
}

function telegramRoute(locale: Locale): RouteRecordRaw {
  const copy = dictionaries[locale]
  const logicalPath = pagePaths.telegram
  const loc = localizedPath(locale, logicalPath)

  return page({
    locale,
    name: 'telegram-bot',
    logicalPath,
    component: () => import('@/views/TelegramBotView.vue'),
    meta: pageMeta({
      locale,
      logicalPath,
      seo: copy.telegram.seo,
      jsonld: graph(
        breadcrumbJsonLd(copy.telegram.heading, loc, copy.siteName, localizedPath(locale, pagePaths.home)),
        howToJsonLd(copy.telegram.howToHeading, copy.telegram.howTo),
        faqJsonLd(copy.telegram.faq),
      ),
    }),
  })
}

function faqRoute(locale: Locale): RouteRecordRaw {
  const copy = dictionaries[locale]

  return page({
    locale,
    name: 'faq',
    logicalPath: pagePaths.faq,
    component: () => import('@/views/FaqView.vue'),
    meta: pageMeta({
      locale,
      logicalPath: pagePaths.faq,
      seo: copy.faq.seo,
      jsonld: faqJsonLd(copy.faq.entries),
    }),
  })
}

function policyRoute(locale: Locale): RouteRecordRaw {
  return page({
    locale,
    name: 'policy',
    logicalPath: pagePaths.policy,
    component: () => import('@/views/PolicyView.vue'),
    meta: pageMeta({ locale, logicalPath: pagePaths.policy, seo: dictionaries[locale].policy.seo }),
  })
}

function loginRoute(locale: Locale): RouteRecordRaw {
  return page({
    locale,
    name: 'login',
    logicalPath: pagePaths.login,
    component: () => import('@/views/LoginView.vue'),
    // A login page is not something to index: it only exists for people who
    // already know about it.
    meta: pageMeta({
      locale,
      logicalPath: pagePaths.login,
      seo: dictionaries[locale].login.seo,
      robots: 'noindex, follow',
    }),
  })
}

function authCallbackRoute(locale: Locale): RouteRecordRaw {
  return page({
    locale,
    name: 'auth-callback',
    // The path registered as the callback of the Cognito app client.
    logicalPath: '/auth/callback.html',
    component: () => import('@/views/AuthCallbackView.vue'),
    meta: pageMeta({
      locale,
      logicalPath: '/auth/callback.html',
      seo: dictionaries[locale].authCallback.seo,
      robots: 'noindex, nofollow',
    }),
  })
}

function libraryRoute(locale: Locale): RouteRecordRaw {
  return page({
    locale,
    name: 'library',
    logicalPath: pagePaths.library,
    component: () => import('@/views/LibraryView.vue'),
    // Private to each visitor, and empty without a login.
    meta: pageMeta({
      locale,
      logicalPath: pagePaths.library,
      seo: dictionaries[locale].library.seo,
      robots: 'noindex, follow',
    }),
  })
}

/**
 * Prerendered to dist/404.html, which CloudFront serves for missing keys (see
 * the 403 -> /404.html error mapping in the SAM template). English only: the
 * CDN error mapping points at this one file.
 */
function notFoundPageRoute(): RouteRecordRaw {
  const locale = defaultLocale
  const logicalPath = '/404'

  return {
    path: '/404',
    name: 'not-found-page',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      ...pageMeta({ locale, logicalPath, seo: dictionaries[locale].notFound.seo, robots: 'noindex, follow' }),
      canonical: `${siteUrl}/`,
    },
  }
}

/** The catch-all: any unknown address renders the localized not found page. */
function catchAllRoute(locale: Locale): RouteRecordRaw {
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  return {
    path: `${prefix}/:pathMatch(.*)*`,
    name: routeName(locale, 'not-found'),
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      ...pageMeta({
        locale,
        logicalPath: '/404',
        seo: dictionaries[locale].notFound.seo,
        robots: 'noindex, follow',
      }),
      canonical: `${siteUrl}${localizedPath(locale, pagePaths.home)}`,
    },
  }
}

export const routes: RouteRecordRaw[] = [
  ...locales.flatMap((locale) => [
    homeRoute(locale),
    ...platformIds.map((id) => platformRoute(locale, id)),
    telegramRoute(locale),
    faqRoute(locale),
    policyRoute(locale),
    loginRoute(locale),
    authCallbackRoute(locale),
    libraryRoute(locale),
  ]),
  notFoundPageRoute(),
  ...locales.map(catchAllRoute),
]

/**
 * Router options rather than a router instance: vite-ssg builds the router
 * itself, with a memory history while prerendering and the browser history in
 * the client. Creating the router here would break prerendering.
 */
export const routerOptions: Omit<RouterOptions, 'history'> = {
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
}

export default routerOptions
