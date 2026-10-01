<script setup lang="ts">
import { RouterLink } from 'vue-router'

import VideoForm from '@/components/VideoForm.vue'
import { useLocale } from '@/composables/useLocale'
import { pagePaths } from '@/data/locales'

const { copy, localize } = useLocale()
</script>

<template>
  <div class="container py-5 text-center">
    <h1 class="display-6">{{ copy.notFound.heading }}</h1>
    <p class="lead">{{ copy.notFound.lead }}</p>

    <VideoForm />

    <p class="mt-4">
      <RouterLink :to="localize(pagePaths.home)">{{ copy.notFound.goHome }}</RouterLink
      >{{ copy.notFound.orRead }}<RouterLink :to="localize(pagePaths.faq)">{{ copy.notFound.faqLink }}</RouterLink>.
    </p>
  </div>
</template>
