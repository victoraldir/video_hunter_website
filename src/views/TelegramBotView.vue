<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import FaqList from '@/components/FaqList.vue'
import HowToSteps from '@/components/HowToSteps.vue'
import { useLocale } from '@/composables/useLocale'
import { pagePaths, platformIds, platformPaths } from '@/data/locales'
import { telegramBotUrl } from '@/data/site'

const { copy, localize } = useLocale()

const platforms = computed(() =>
  platformIds.map((id) => ({
    key: id,
    path: platformPaths[id],
    heading: copy.value.platforms[id].heading,
  })),
)
</script>

<template>
  <header class="container-fluid p-md-5 p-4 bg-primary text-white text-center">
    <h1 class="display-5 fw-bold">{{ copy.telegram.heading }}</h1>
    <p class="lead col-md-8 mx-auto">{{ copy.telegram.lead }}</p>
    <p class="mt-3">
      <a class="btn btn-light btn-lg" :href="telegramBotUrl" target="_blank" rel="noopener">
        {{ copy.telegram.openBot }}
      </a>
    </p>
  </header>

  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <HowToSteps :steps="copy.telegram.howTo" :heading="copy.telegram.howToHeading" />
          <p>{{ copy.telegram.worksOn }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 class="h3 mb-4">{{ copy.telegram.faqHeading }}</h2>
          <FaqList :entries="copy.telegram.faq" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 class="h3">{{ copy.telegram.preferTitle }}</h2>
          <p>
            {{ copy.telegram.preferLead.before
            }}<RouterLink :to="localize(pagePaths.home)">{{ copy.telegram.preferLead.link }}</RouterLink
            >{{ copy.telegram.preferLead.after }}
          </p>
          <ul class="lead">
            <li v-for="page in platforms" :key="page.key">
              <RouterLink :to="localize(page.path)">{{ page.heading }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
