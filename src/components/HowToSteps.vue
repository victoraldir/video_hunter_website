<script setup lang="ts">
import type { HowToStep } from '@/data/schema'

defineProps<{ steps: HowToStep[]; heading?: string }>()
</script>

<template>
  <h2 class="h3">{{ heading ?? 'How it works' }}</h2>
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
