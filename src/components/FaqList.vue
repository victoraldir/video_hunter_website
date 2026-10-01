<script setup lang="ts">
import type { FaqText } from '@/data/locales/types'

defineProps<{ entries: FaqText[] }>()
</script>

<template>
  <!-- Native details/summary: the answers stay in the markup (crawlable and
       readable without JavaScript) and the browser handles the toggling. -->
  <div class="faq">
    <details v-for="(entry, index) in entries" :key="entry.question" class="faq-item" :open="index === 0">
      <summary class="faq-question h5">{{ entry.question }}</summary>
      <p class="faq-answer">{{ entry.answer }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid var(--bs-border-color);
  padding: 0.75rem 0;
}

.faq-question {
  cursor: pointer;
  margin-bottom: 0;
}

.faq-answer {
  margin: 0.75rem 0 0;
  color: var(--bs-secondary-color);
}
</style>
