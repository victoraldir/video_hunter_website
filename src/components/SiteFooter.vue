<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useLocale } from '@/composables/useLocale'
import { navItems, pagePaths } from '@/data/locales'
import { telegramBotUrl } from '@/data/site'

const { copy, localize } = useLocale()

const year = new Date().getFullYear()
const links = computed(() => navItems(copy.value))
</script>

<template>
  <footer class="text-center py-4 mt-auto bg-dark text-white">
    <div class="container">
      <p class="mb-0">{{ copy.footer.copyright.replace('{year}', String(year)) }}</p>
      <p class="mb-0">
        <RouterLink v-for="link in links" :key="link.path" class="text-white-50" :to="localize(link.path)">
          {{ link.label }}
        </RouterLink>
        <span class="text-white-50"> | </span>
        <RouterLink class="text-white-50" :to="localize(pagePaths.policy)">{{ copy.nav.policy }}</RouterLink>
        <span class="text-white-50"> | </span>
        <a class="text-white-50" :href="telegramBotUrl" target="_blank" rel="noopener">{{ copy.footer.telegram }}</a>
      </p>
    </div>
  </footer>
</template>
