<script setup lang="ts">
import { computed, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterView, useRoute } from 'vue-router'

import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { setLocale } from '@/composables/useLocale'
import { alternates, defaultLocale, localizedPath, pagePaths, type Locale } from '@/data/locales'
import { siteUrl } from '@/data/site'

const route = useRoute()

// The locale follows the URL. Copy in services (the API client, the download
// composable) reads it through `copy()`, so it has to be in step before any
// descendant renders or fetches anything.
watch(
  () => route.meta.locale,
  (locale) => setLocale(locale ?? defaultLocale),
  { immediate: true, flush: 'sync' },
)

/** Open Graph wants a language and a territory. */
const ogLocales: Record<Locale, string> = { en: 'en_US', pt: 'pt_BR', es: 'es_ES' }

function logicalPath(): string {
  return route.meta.logicalPath ?? pagePaths.home
}

// Every route declares its own SEO metadata in src/router/index.ts and it is
// applied here, once, so no page can ship with a missing or duplicated title.
useHead(
  computed(() => {
    const meta = route.meta
    const locale = meta.locale ?? defaultLocale
    const path = logicalPath()
    const canonical = meta.canonical ?? `${siteUrl}${localizedPath(locale, path)}`

    // hreflang tells search engines that these pages are translations of each
    // other. x-default points at English, which is at the root.
    const alternateLinks = [
      ...alternates(path).map((entry) => ({
        rel: 'alternate',
        hreflang: entry.hreflang,
        href: `${siteUrl}${entry.href}`,
      })),
      { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}${localizedPath(defaultLocale, path)}` },
    ]

    return {
      htmlAttrs: { lang: locale },
      title: meta.title,
      meta: [
        { name: 'description', content: meta.description },
        ...(meta.robots ? [{ name: 'robots', content: meta.robots }] : []),
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Video Hunter' },
        { property: 'og:locale', content: ogLocales[locale] },
        { property: 'og:image', content: 'https://www.myvideohunter.com/assets/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: meta.title },
        { name: 'twitter:description', content: meta.description },
        { name: 'twitter:image', content: 'https://www.myvideohunter.com/assets/og-image.png' },
      ],
      link: [{ rel: 'canonical', href: canonical }, ...alternateLinks],
      script: meta.jsonld
        ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(meta.jsonld) }]
        : [],
    }
  }),
)
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
