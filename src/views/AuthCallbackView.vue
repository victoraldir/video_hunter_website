<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { completeSignIn } from '@/services/authService'

const router = useRouter()
const { syncSession } = useAuth()
const error = ref('')

// Client only by definition: this page exists to turn the code Cognito sent
// back into a session, and then to get out of the way.
onMounted(async () => {
  try {
    const returnPath = await completeSignIn()

    // Nothing reloads the page here, so the header and anything else showing
    // account state has to be told that the session now exists.
    syncSession()

    // Most of this site is the app and navigates in place, but a video page is
    // served by the API and is not a route. Handing that to the router would
    // land on the not found page, so those get a real page load.
    if (router.resolve(returnPath).name === 'not-found') {
      window.location.replace(returnPath)
      return
    }

    await router.replace(returnPath)
  } catch (failure) {
    error.value =
      failure instanceof Error && failure.message
        ? failure.message
        : 'The sign in did not complete. Please try again.'
  }
})
</script>

<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-6 mx-auto text-center">
        <div v-if="!error">
          <div class="spinner-border text-primary my-3" role="status">
            <span class="visually-hidden">Signing you in…</span>
          </div>
          <p>Signing you in…</p>
        </div>

        <div v-else>
          <h1 class="h3 mb-3">Sign in failed</h1>
          <div class="alert alert-danger" role="alert">{{ error }}</div>
          <RouterLink class="btn btn-primary" to="/login.html">Try again</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
