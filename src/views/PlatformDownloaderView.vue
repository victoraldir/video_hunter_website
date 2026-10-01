<script setup lang="ts">
import { computed } from 'vue'

import FaqList from '@/components/FaqList.vue'
import HowToSteps from '@/components/HowToSteps.vue'
import PlatformLinks from '@/components/PlatformLinks.vue'
import VideoForm from '@/components/VideoForm.vue'
import { useLocale } from '@/composables/useLocale'
import { platformPaths } from '@/data/locales'
import type { PlatformId } from '@/data/routes'

// One view renders all three platform pages: they are the same page with
// different content, which keeps them consistent (the audit found the previous
// hand-written pages had drifted apart).
const props = defineProps<{ platform: PlatformId }>()

const { copy } = useLocale()

const page = computed(() => copy.value.platforms[props.platform])
const faqHeading = computed(() =>
  copy.value.platformPage.faqHeading.replace('{platform}', page.value.name),
)
</script>

<template>
  <header class="container-fluid p-md-5 p-4 bg-primary text-white text-center">
    <h1 class="display-5 fw-bold">{{ page.heading }}</h1>
    <p class="lead col-md-8 mx-auto">{{ page.lead }}</p>
    <VideoForm autofocus />
  </header>

  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <HowToSteps :steps="page.howTo" :heading="page.howToHeading" />
          <p>{{ page.note }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 class="h3 mb-4">{{ faqHeading }}</h2>
          <FaqList :entries="page.faq" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <PlatformLinks :current="platformPaths[props.platform]" />
        </div>
      </div>
    </div>
  </section>
</template>
