<template>
  <div class="container mt-4">
    <div v-if="!loading" class="input-group mb-3 shadow-sm">
      <input
        v-on:keyup.enter="submit"
        v-model="videoUrl"
        type="text"
        class="form-control form-control-lg"
        placeholder="Enter Video URL (Twitter, Reddit, Bluesky, x.com)"
        aria-label="Video URL"
        aria-describedby="button-addon"
      />
      <button
        class="btn btn-primary btn-lg"
        type="button"
        id="button-addon"
        @click="submit"
        :disabled="!videoUrl.trim()"
      >
        Download
      </button>
    </div>

    <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error:</strong> {{ error }}
      <button type="button" class="btn-close" @click="clearError" aria-label="Close"></button>
    </div>

    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button type="button" class="btn-close" @click="clearSuccessMessage" aria-label="Close"></button>
    </div>

    <div v-if="loading" class="text-center mt-5">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 fs-5">Processing your request, please wait...</p>
    </div>
  </div>
</template>

<script>
import { postVideoUrl, getDownloadLink } from '@/services/apiService'; // Adjusted path

export default {
  data() {
    return {
      videoUrl: '',
      error: '',
      loading: false,
      successMessage: ''
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrlFromQuery = urlParams.get('url') || urlParams.get('videoUrl'); // Support both 'url' and 'videoUrl'
    if (videoUrlFromQuery) {
      this.videoUrl = videoUrlFromQuery;
      this.submit();
    }
  },
  methods: {
    async submit() {
      if (!this.validateUrl(this.videoUrl)) {
        this.error = 'Please enter a valid URL from Twitter, Reddit, Bluesky, or x.com.';
        this.successMessage = ''; // Clear any previous success message
        return;
      }

      this.error = '';
      this.successMessage = '';
      this.loading = true;

      try {
        const response = await postVideoUrl(this.videoUrl);
        if (response && response.id) {
          this.successMessage = 'Your download will start shortly!';
          // Delay redirect slightly to allow user to see success message
          setTimeout(() => {
            window.location.href = getDownloadLink(response.id);
          }, 1500);
        } else {
          throw new Error('Invalid response from the server. Please try again.');
        }
      } catch (err) {
        this.error = err.message || 'Something went wrong, please try again.';
      } finally {
        this.loading = false;
        // Don't clear videoUrl here, user might want to retry or copy it
      }
    },

    validateUrl(url) {
      if (!url) return false; // Handle empty or null URLs
      const pattern = new RegExp(
        '^(https?:\/\/)?' + // protocol
        '(www\.)?' + // subdomain
        '(twitter\.com|bsky\.app|reddit\.com|x\.com)' + // domain name
        '(\/[-a-zA-Z0-9@:%._\+~#?&//=]*)?$' // path
      );
      return pattern.test(url);
    },
    clearError() {
      this.error = '';
    },
    clearSuccessMessage() {
      this.successMessage = '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 720px; /* Limit container width for better readability on large screens */
}

.input-group .form-control-lg {
  font-size: 1.1rem; /* Slightly larger input text */
}

.input-group .btn-lg {
  font-size: 1.1rem; /* Slightly larger button text */
}

.alert {
  margin-top: 1.5rem;
}

/* Optional: Add a subtle hover effect to the button */
#button-addon:hover {
  opacity: 0.9;
}
</style>
