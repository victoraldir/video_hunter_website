<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { StepText } from '@/data/locales/types'

defineProps<{ steps: StepText[]; heading?: string }>()

const { copy } = useLocale()
</script>

<template>
  <h2 class="h3">{{ heading ?? copy.howTo.fallbackHeading }}</h2>
  <ol class="how-to-steps">
    <li v-for="step in steps" :key="step.name">
      <strong>{{ step.name }}</strong> — {{ step.text }}
    </li>
  </ol>
</template>

<style scoped>
.how-to-steps {
  font-size: 1.1rem;
}

.how-to-steps li {
  margin-bottom: 0.5rem;
}
</style>
