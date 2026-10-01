<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import VideoForm from '@/components/VideoForm.vue'
import { useLocale } from '@/composables/useLocale'
import { pagePaths, platformIds, platformPaths } from '@/data/locales'
import { telegramBotUrl } from '@/data/site'

const { copy, localize } = useLocale()

const platforms = computed(() =>
  platformIds.map((id) => ({
    key: id,
    path: platformPaths[id],
    heading: copy.value.platforms[id].heading,
    blurb: copy.value.platforms[id].blurb,
  })),
)
</script>

<template>
  <header class="container-fluid p-md-5 p-4 bg-primary text-white text-center">
    <h1 class="display-4 fw-bold">{{ copy.home.heroTitle }}</h1>
    <p class="lead col-md-8 mx-auto">{{ copy.home.heroLead }}</p>
    <VideoForm autofocus />
  </header>

  <section class="py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h2 class="h1">{{ copy.home.aboutTitle }}</h2>
          <p class="lead">
            {{ copy.home.aboutBodyBefore }}<strong>{{ copy.siteName }}</strong>{{ copy.home.aboutBodyAfter }}
          </p>
          <p class="text-muted small">{{ copy.home.legalNote }}</p>
        </div>
        <div class="col-md-6 text-center">
          <img src="/assets/method-1.png" :alt="copy.home.imageAltAbout" class="img-fluid rounded shadow-lg" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4 h1">{{ copy.home.stepsTitle }}</h2>
      <div class="row text-center">
        <div v-for="(step, index) in copy.home.steps" :key="step.name" class="col-md-3">
          <div class="p-3">
            <span class="display-4 text-primary">{{ index + 1 }}</span>
            <h3 class="h5 mt-2">{{ step.name }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <h2 class="text-center mb-4 h1">{{ copy.home.platformsTitle }}</h2>
      <div class="row text-center">
        <div v-for="page in platforms" :key="page.key" class="col-md-4">
          <div class="p-3">
            <h3 class="h5">
              <RouterLink class="text-decoration-none" :to="localize(page.path)">{{ page.heading }}</RouterLink>
            </h3>
            <p>{{ page.blurb }}</p>
          </div>
        </div>
      </div>
      <p class="text-center mt-3">
        {{ copy.home.preferChatting.before
        }}<RouterLink :to="localize(pagePaths.telegram)">{{ copy.home.preferChatting.link }}</RouterLink
        >{{ copy.home.preferChatting.after }}
      </p>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="/assets/method-2.png" :alt="copy.home.imageAltTelegram" class="img-fluid rounded shadow-lg" />
        </div>
        <div class="col-md-6">
          <h2 class="h1">{{ copy.home.telegramTitle }}</h2>
          <p class="lead">
            {{ copy.home.telegramLead.before
            }}<a :href="telegramBotUrl" target="_blank" rel="noopener" class="fw-bold text-decoration-none">{{
              copy.home.telegramLead.link
            }}</a
            >{{ copy.home.telegramLead.after }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
