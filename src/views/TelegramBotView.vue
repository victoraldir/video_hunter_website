<script setup lang="ts">
import { RouterLink } from 'vue-router'

import FaqList from '@/components/FaqList.vue'
import HowToSteps from '@/components/HowToSteps.vue'
import type { FaqEntry } from '@/data/faq'
import type { HowToStep } from '@/data/schema'
import { platformList } from '@/data/platforms'
import { telegramBotUrl } from '@/data/site'

const howTo: HowToStep[] = [
  { name: 'Open the bot', text: 'Open @MyVideoHunterBot in Telegram and press Start.' },
  { name: 'Send a video link', text: 'Send the link to a post with a video from X (Twitter), Reddit or Bluesky.' },
  { name: 'Get your download link', text: 'The bot replies with a download link you can open on any device.' },
]

const faq: FaqEntry[] = [
  { question: 'Is the bot free?', answer: 'Yes, and it needs no registration.' },
  {
    question: 'Which platforms does it support?',
    answer: 'X (Twitter), Reddit and Bluesky — the same platforms as the website.',
  },
  {
    question: 'Why did the bot not reply?',
    answer:
      'It can be busy or rate limited by the platform. Wait a moment and send the link again, and make sure the post is public and contains a video.',
  },
  {
    question: 'Does the bot store my videos?',
    answer:
      'No. Videos are streamed directly from the platform\'s content delivery network and are not stored on our servers.',
  },
]
</script>

<template>
  <header class="container-fluid p-md-5 p-4 bg-primary text-white text-center">
    <h1 class="display-5 fw-bold">Video Hunter Telegram Bot</h1>
    <p class="lead col-md-8 mx-auto">
      Send a video link in Telegram and get a download link back. No app to install, no signup.
    </p>
    <p class="mt-3">
      <a class="btn btn-light btn-lg" :href="telegramBotUrl" target="_blank" rel="noopener">
        Open @MyVideoHunterBot
      </a>
    </p>
  </header>

  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <HowToSteps :steps="howTo" heading="How to download videos with the bot" />
          <p>It works in the Telegram app on iOS, Android, desktop and in the web client.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 class="h3 mb-4">Frequently asked questions about the bot</h2>
          <FaqList :entries="faq" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 class="h3">Prefer the website?</h2>
          <p>
            You can also paste a link directly on the <RouterLink to="/">Video Hunter home page</RouterLink>, or use a
            dedicated page for your platform:
          </p>
          <ul class="lead">
            <li v-for="page in platformList" :key="page.key">
              <RouterLink :to="page.path">{{ page.heading }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
