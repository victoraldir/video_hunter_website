<script setup lang="ts">
import { RouterLink } from 'vue-router'

import FaqList from '@/components/FaqList.vue'
import { faqEntries } from '@/data/faq'
import { telegramBotUrl } from '@/data/site'
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-9 mx-auto">
        <h1 class="mb-3">Frequently Asked Questions</h1>
        <p class="lead">
          Everything you need to know about downloading videos with Video Hunter. Still stuck?
          <RouterLink to="/">Paste a link on the home page</RouterLink> or message
          <a :href="telegramBotUrl" target="_blank" rel="noopener">@MyVideoHunterBot</a> on Telegram.
        </p>

        <FaqList :entries="faqEntries" />

        <p class="text-muted small mt-4">
          Please make sure you have the right to download the content you save. Video Hunter respects content creators.
        </p>
      </div>
    </div>
  </div>
</template>
