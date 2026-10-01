<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useLocale } from '@/composables/useLocale'
import { platformIds, platformPaths } from '@/data/locales'

const props = defineProps<{ current?: string }>()

const { copy, localize } = useLocale()

/** Every platform except the one this page is about. */
const otherPlatforms = computed(() =>
  platformIds
    .filter((id) => platformPaths[id] !== props.current)
    .map((id) => ({
      key: id,
      path: platformPaths[id],
      label: copy.value.platforms[id].heading,
    })),
)
</script>

<template>
  <h2 class="h3">{{ copy.platformLinks.heading }}</h2>
  <p>{{ copy.platformLinks.lead }}</p>
  <ul class="lead">
    <li v-for="link in otherPlatforms" :key="link.key">
      <RouterLink :to="localize(link.path)">{{ link.label }}</RouterLink>
    </li>
  </ul>
  <p class="text-muted small">{{ copy.platformLinks.note }}</p>
</template>
