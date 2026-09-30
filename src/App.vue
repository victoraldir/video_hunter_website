<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterView, useRoute } from 'vue-router'

import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'

const route = useRoute()

// Every route declares its own SEO metadata in src/router/index.ts and it is
// applied here, once, so no page can ship with a missing or duplicated title.
useHead(
  computed(() => {
    const meta = route.meta

    return {
      title: meta.title,
      meta: [
        { name: 'description', content: meta.description },
        ...(meta.robots ? [{ name: 'robots', content: meta.robots }] : []),
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description },
        { property: 'og:url', content: meta.canonical },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Video Hunter' },
        { property: 'og:image', content: 'https://www.myvideohunter.com/assets/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: meta.title },
        { name: 'twitter:description', content: meta.description },
        { name: 'twitter:image', content: 'https://www.myvideohunter.com/assets/og-image.png' },
      ],
      link: [{ rel: 'canonical', href: meta.canonical }],
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
