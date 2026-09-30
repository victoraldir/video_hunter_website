<script setup lang="ts">
import { RouterLink } from 'vue-router'

import VideoForm from '@/components/VideoForm.vue'
</script>

<template>
  <div class="container py-5 text-center">
    <h1 class="display-6">Page not found</h1>
    <p class="lead">
      The page you are looking for does not exist. Paste a video link below to download a video from X (Twitter),
      Reddit or Bluesky.
    </p>

    <VideoForm />

    <p class="mt-4">
      <RouterLink to="/">Go to the Video Hunter home page</RouterLink> or read the
      <RouterLink to="/faq.html">FAQ</RouterLink>.
    </p>
  </div>
</template>
