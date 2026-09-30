<script setup lang="ts">
import { RouterLink } from 'vue-router'

import VideoForm from '@/components/VideoForm.vue'
import { platformList } from '@/data/platforms'
import { telegramBotUrl } from '@/data/site'

const steps = [
  { title: 'Find your video', text: 'Navigate to the video on X, Reddit or Bluesky.' },
  { title: 'Copy the URL', text: "Copy the video's URL from your browser or the share menu." },
  { title: 'Paste and download', text: 'Paste the link into Video Hunter and click Download.' },
  { title: 'Save it', text: 'Your video is processed and ready to save in moments.' },
]
</script>

<template>
  <header class="container-fluid p-md-5 p-4 bg-primary text-white text-center">
    <h1 class="display-4 fw-bold">Free Video Downloader for X (Twitter), Reddit &amp; Bluesky</h1>
    <p class="lead col-md-8 mx-auto">
      Easily save videos from X (Twitter), Reddit and Bluesky. Paste the link, click download, done.
    </p>
    <VideoForm autofocus />
  </header>

  <section class="py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h2 class="h1">Seamless Video Downloads from X, Reddit &amp; Bluesky</h2>
          <p class="lead">
            Tired of not being able to save videos from your favourite platforms? <strong>Video Hunter</strong> provides
            a simple and fast solution to download videos from X (formerly Twitter), Reddit, and Bluesky (bsky)
            directly to your computer or mobile device. Grab the video link, paste it into our downloader, and save your
            video in moments.
          </p>
          <p class="text-muted small">
            Note: Video Hunter respects content creators. All videos are streamed directly from the respective content
            delivery networks. Please ensure you have the right to download the content.
          </p>
        </div>
        <div class="col-md-6 text-center">
          <img
            src="/assets/method-1.png"
            alt="Illustration of the Video Hunter video downloading process"
            class="img-fluid rounded shadow-lg"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-center mb-4 h1">Simple Steps to Download Your Videos</h2>
      <div class="row text-center">
        <div v-for="(step, index) in steps" :key="step.title" class="col-md-3">
          <div class="p-3">
            <span class="display-4 text-primary">{{ index + 1 }}</span>
            <h3 class="h5 mt-2">{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <h2 class="text-center mb-4 h1">Supported platforms</h2>
      <div class="row text-center">
        <div v-for="page in platformList" :key="page.key" class="col-md-4">
          <div class="p-3">
            <h3 class="h5">
              <RouterLink class="text-decoration-none" :to="page.path">{{ page.heading }}</RouterLink>
            </h3>
            <p>{{ page.blurb }}</p>
          </div>
        </div>
      </div>
      <p class="text-center mt-3">
        Prefer chatting? Send links to the <RouterLink to="/telegram-bot.html">Video Hunter Telegram bot</RouterLink>
        instead.
      </p>
    </div>
  </section>

  <section class="py-5 bg-light">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img
            src="/assets/method-2.png"
            alt="Telegram bot for downloading videos with Video Hunter"
            class="img-fluid rounded shadow-lg"
          />
        </div>
        <div class="col-md-6">
          <h2 class="h1">Prefer Telegram? Use Our Video Hunter Bot!</h2>
          <p class="lead">
            For ultimate convenience, send video links directly to our
            <a :href="telegramBotUrl" target="_blank" rel="noopener" class="fw-bold text-decoration-none">
              MyVideoHunterBot </a
            >on Telegram. It's a quick and easy way to download videos on the go, right from your chat app.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
