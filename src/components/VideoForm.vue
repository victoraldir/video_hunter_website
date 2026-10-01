<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useLocale } from '@/composables/useLocale'
import { useVideoDownload } from '@/composables/useVideoDownload'

const props = withDefaults(
  defineProps<{
    /** Pre-fills the field. Defaults to the shared prompt in the dictionary. */
    placeholder?: string
    autofocus?: boolean
  }>(),
  {
    autofocus: false,
  },
)

const { copy } = useLocale()

const { videoUrl, loading, error, successMessage, platform, canSubmit, submit, submitFromQuery, clearError, clearSuccessMessage } =
  useVideoDownload()

const placeholderText = computed(() => props.placeholder ?? copy.value.form.placeholder)

const platformLabel = computed(() =>
  platform.value ? copy.value.form.linkDetected.replace('{platform}', copy.value.platforms[platform.value].name) : '',
)

onMounted(() => {
  submitFromQuery()

  if (props.autofocus) {
    document.getElementById('video-url')?.focus()
  }
})
</script>

<template>
  <div class="container mt-4">
    <form class="row g-2 justify-content-center" @submit.prevent="submit">
      <div class="col-12 col-md-8">
        <label class="visually-hidden" for="video-url">{{ copy.form.videoUrlLabel }}</label>
        <div class="input-group input-group-lg shadow-sm">
          <input
            id="video-url"
            v-model="videoUrl"
            type="text"
            class="form-control"
            :placeholder="placeholderText"
            :aria-invalid="error?.kind === 'invalidLink'"
            autocomplete="off"
            spellcheck="false"
          />
          <button class="btn btn-primary" type="submit" :disabled="!canSubmit">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            {{ copy.form.download }}
          </button>
        </div>

        <p v-if="platform" class="form-text text-white-50 mb-0 mt-2">{{ platformLabel }}</p>
      </div>
    </form>

    <!-- Status is announced to screen readers as it changes. -->
    <div aria-live="polite" class="mt-3">
      <div v-if="loading" class="text-center">
        <p class="mb-0">{{ copy.form.processing }}</p>
      </div>

      <div v-if="error" class="alert alert-danger alert-dismissible fade show mb-0" role="alert">
        <strong>{{ error.kind === 'invalidLink' ? copy.form.checkLink : copy.form.sorry }}</strong> {{ error.message }}
        <button type="button" class="btn-close" :aria-label="copy.form.close" @click="clearError"></button>
      </div>

      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mb-0" role="alert">
        {{ successMessage }}
        <button type="button" class="btn-close" :aria-label="copy.form.close" @click="clearSuccessMessage"></button>
      </div>
    </div>
  </div>
</template>
