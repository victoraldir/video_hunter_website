import { computed, ref } from 'vue'

import { copy } from '@/composables/useLocale'
import {
  detectPlatform,
  getDownloadLink,
  isSupportedUrl,
  postVideoUrl,
  type DownloadError,
} from '@/services/apiService'

/** Only failures that can plausibly succeed on a second attempt are retried. */
const MAX_ATTEMPTS = 3
const RETRY_DELAY_MS = 1000

export function useVideoDownload() {
  const videoUrl = ref('')
  const loading = ref(false)
  const error = ref<DownloadError | null>(null)
  const successMessage = ref('')

  const platform = computed(() => detectPlatform(videoUrl.value))
  const canSubmit = computed(() => videoUrl.value.trim().length > 0 && !loading.value)

  async function submit(): Promise<void> {
    error.value = null
    successMessage.value = ''

    if (!isSupportedUrl(videoUrl.value)) {
      error.value = {
        kind: 'invalidLink',
        message: copy().errors.invalidLink,
      }
      return
    }

    loading.value = true

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const response = await postVideoUrl(videoUrl.value.trim())

        if (!response?.id) {
          throw { kind: 'network', message: copy().errors.unexpectedResponse } as DownloadError
        }

        successMessage.value = copy().errors.downloadReady
        loading.value = false

        window.setTimeout(() => {
          window.location.href = getDownloadLink(response.id)
        }, 1200)

        return
      } catch (failure) {
        const downloadError = asDownloadError(failure)

        // A bad link or a post without a video will not get better by asking
        // again, so the user is told immediately instead of after three tries.
        const retryable = downloadError.kind === 'network' || downloadError.kind === 'serviceBusy'

        if (!retryable || attempt === MAX_ATTEMPTS) {
          error.value = downloadError
          loading.value = false
          return
        }

        await delay(RETRY_DELAY_MS)
      }
    }
  }

  /**
   * The home page and the error page link here as /?url=..., so a pasted link
   * is submitted as soon as the form mounts. Client only.
   */
  function submitFromQuery(): void {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const fromQuery = params.get('url') ?? params.get('videoUrl')

    if (!fromQuery) return

    videoUrl.value = fromQuery
    void submit()
  }

  function clearError(): void {
    error.value = null
  }

  function clearSuccessMessage(): void {
    successMessage.value = ''
  }

  return {
    videoUrl,
    loading,
    error,
    successMessage,
    platform,
    canSubmit,
    submit,
    submitFromQuery,
    clearError,
    clearSuccessMessage,
  }
}

function asDownloadError(value: unknown): DownloadError {
  if (value && typeof value === 'object' && 'kind' in value && 'message' in value) {
    return value as DownloadError
  }

  return { kind: 'network', message: copy().errors.network }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}
