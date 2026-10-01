<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { loginAvailable, ready, refresh, signIn } = useAuth()

const starting = ref(false)
const error = ref('')

/** Only same-site paths: the login must not be usable to bounce elsewhere. */
function returnPath(): string {
  const requested = route.query.return

  return typeof requested === 'string' && requested.startsWith('/') && !requested.startsWith('//')
    ? requested
    : '/library'
}

async function start(): Promise<void> {
  starting.value = true
  error.value = ''

  try {
    // This navigates away to the hosted UI; if it comes back it failed.
    await signIn(returnPath())
  } catch {
    starting.value = false
    error.value = 'We could not start the sign in. Please try again in a moment.'
  }
}

onMounted(() => {
  void refresh()
})
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-6 mx-auto">
        <h1 class="mb-3">Sign in</h1>

        <p class="lead">
          An account is optional. It lets you keep the videos you find in folders and join the chat on a video page.
          Downloading never needs one.
        </p>

        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

        <div v-if="ready && !loginAvailable" class="alert alert-secondary" role="alert">
          Signing in is not available right now. You can still download videos from the
          <RouterLink to="/">home page</RouterLink>.
        </div>

        <button v-else class="btn btn-primary btn-lg" type="button" :disabled="starting" @click="start">
          {{ starting ? 'Opening the sign in page…' : 'Continue' }}
        </button>

        <p class="text-muted small mt-3">
          You will be taken to Amazon Cognito, where you can sign in with an email address or a Google account. Video
          Hunter never sees your password.
        </p>

        <p class="mt-4"><RouterLink to="/">Back to the downloader</RouterLink></p>
      </div>
    </div>
  </div>
</template>
