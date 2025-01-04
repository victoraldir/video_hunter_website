<template>
  <div class="container mt-4">
    <div v-if="!loading" class="input-group mb-3">
      <input 
        v-on:keyup.enter="submit" 
        v-model="videoUrl" 
        type="text" 
        class="form-control" 
        placeholder="Enter Video URL (Twitter, Reddit, Bluesky)" 
        aria-label="Video URL" 
        aria-describedby="button-addon"
      />
      <button 
        class="btn btn-primary" 
        type="button" 
        id="button-addon" 
        @click="submit"
      >
        Download
      </button>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <div v-if="loading" class="text-center mt-3">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Processing your request, please wait...</p>
    </div>
  </div>
</template>

<script>
const apiUrl = "https://myvideohunter.com/prod/url";

export default {
  data() {
    return {
      videoUrl: '',
      error: '',
      loading: false,
      successMessage: ''
    };
  },
  methods: {
    async submit() {
      if (!this.validateUrl(this.videoUrl)) {
        this.error = 'Please enter a valid URL from Twitter, Reddit, or Bluesky.';
        return;
      }

      this.error = '';
      this.loading = true;

      try {
        const response = await this.postVideoUrl(this.videoUrl);
        if (response && response.id) {
          this.successMessage = 'Your download will start shortly!';
          window.location.href = `${apiUrl}/${response.id}`;
        } else {
          throw new Error('Invalid response from server.');
        }
      } catch (err) {
        this.error = err.message || 'Something went wrong, please try again.';
      } finally {
        this.loading = false;
        this.videoUrl = '';
      }
    },

    async postVideoUrl(videoUrl) {
      const data = { video_url: videoUrl };
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download video. Please check the URL and try again.');
      }

      return response.json();
    },

    validateUrl(url) {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '(www\\.)?' + // subdomain
        '(twitter\\.com|bsky\\.app|reddit\\.com|x\\.com)' + // domain name
        '(\\/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?$' // path
      );
      return pattern.test(url);
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
