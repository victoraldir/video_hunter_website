<script setup lang="ts">
import { RouterLink } from 'vue-router'

import FaqList from '@/components/FaqList.vue'
import { useLocale } from '@/composables/useLocale'
import { pagePaths } from '@/data/locales'
import { telegramBotUrl } from '@/data/site'

const { copy, localize } = useLocale()
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <h1 class="mb-3">{{ copy.faq.heading }}</h1>
        <p class="lead">
          {{ copy.faq.lead.before
          }}<RouterLink :to="localize(pagePaths.home)">{{ copy.faq.lead.homeLink }}</RouterLink
          >{{ copy.faq.lead.between
          }}<a :href="telegramBotUrl" target="_blank" rel="noopener">{{ copy.telegramHandle }}</a
          >{{ copy.faq.lead.after }}
        </p>

        <FaqList :entries="copy.faq.entries" />

        <p class="text-muted small mt-4">{{ copy.faq.legalNote }}</p>
      </div>
    </div>
  </div>
</template>
