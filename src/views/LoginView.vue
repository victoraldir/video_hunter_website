<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useAuth } from '@/composables/useAuth'
import { useLocale } from '@/composables/useLocale'
import { pagePaths } from '@/data/locales'

const route = useRoute()
const { loginAvailable, ready, refresh, signIn } = useAuth()
const { copy, localize } = useLocale()

const starting = ref(false)
const error = ref('')

/** Only same-site paths: the login must not be usable to bounce elsewhere. */
function returnPath(): string {
  const requested = route.query.return

  return typeof requested === 'string' && requested.startsWith('/') && !requested.startsWith('//')
    ? requested
    : localize(pagePaths.library)
}

async function start(): Promise<void> {
  starting.value = true
  error.value = ''

  try {
    // This navigates away to the hosted UI; if it comes back it failed.
    await signIn(returnPath())
  } catch {
    starting.value = false
    error.value = copy.value.login.startError
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
        <h1 class="mb-3">{{ copy.login.heading }}</h1>

        <p class="lead">{{ copy.login.lead }}</p>

        <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

        <div v-if="ready && !loginAvailable" class="alert alert-secondary" role="alert">
          {{ copy.common.signInUnavailable.before
          }}<RouterLink :to="localize(pagePaths.home)">{{ copy.common.signInUnavailable.link }}</RouterLink
          >{{ copy.common.signInUnavailable.after }}
        </div>

        <button v-else class="btn btn-primary btn-lg" type="button" :disabled="starting" @click="start">
          {{ starting ? copy.login.opening : copy.login.continueLabel }}
        </button>

        <p class="text-muted small mt-3">{{ copy.login.cognitoNote }}</p>

        <p class="mt-4">
          <RouterLink :to="localize(pagePaths.home)">{{ copy.common.backToDownloader }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
