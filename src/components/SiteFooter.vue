<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { navLinks, telegramBotUrl } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="text-center py-4 mt-auto bg-dark text-white">
    <div class="container">
      <p class="mb-0">&copy; {{ year }} Video Hunter. All rights reserved.</p>
      <p class="mb-0">
        <RouterLink v-for="link in navLinks" :key="link.to" class="text-white-50" :to="link.to">
          {{ link.label }}
        </RouterLink>
        <span class="text-white-50"> | </span>
        <RouterLink class="text-white-50" to="/policy.html">Privacy Policy</RouterLink>
        <span class="text-white-50"> | </span>
        <a class="text-white-50" :href="telegramBotUrl" target="_blank" rel="noopener">Telegram</a>
      </p>
    </div>
  </footer>
</template>
