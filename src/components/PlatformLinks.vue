<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { navLinks } from '@/data/site'

const props = defineProps<{ current?: string }>()

/** Every platform except the one this page is about. */
const otherPlatforms = computed(() =>
  navLinks.filter((link) => link.to !== '/faq.html' && link.to !== props.current),
)
</script>

<template>
  <h2 class="h3">Download videos from other platforms</h2>
  <p>Video Hunter also downloads videos from:</p>
  <ul class="lead">
    <li v-for="link in otherPlatforms" :key="link.to">
      <RouterLink :to="link.to">{{ link.label }} downloader</RouterLink>
    </li>
  </ul>
  <p class="text-muted small">
    Please make sure you have the right to download the content you save. Video Hunter streams videos directly from
    the platform's content delivery network and does not store them.
  </p>
</template>
