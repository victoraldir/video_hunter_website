<template>
  <div v-if="!loading" class="container" >
    <div class="input-group mb-3">
      <input v-on:keyup.enter="submit" v-model="videoUrl" type="text" class="form-control" placeholder="Video URL" aria-label="Video URL" aria-describedby="button-addon2"/>
      <button class="btn btn-secondary" type="button" id="button-addon2" @click="submit">Download</button>
    </div>

    <p v-if="error">
      <b>Please correct the following error(s):</b>
      <ul>
        <li>{{ error }}</li>
      </ul> 
    </p>
  </div>
  <div v-if="loading" class="spinner-border m-5" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>

let apiUrl = "https://myvideohunter.com/prod/url"

export default {
  data() {
    return {
      videoUrl: '',
      error: '',
      loading: false
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.videoUrl)
      console.info('submit', this.videoUrl)

      // POST email to API
      let data = {video_url: this.videoUrl}

      if (!this.validateUrl(this.videoUrl)) {
        this.error = 'Please enter a valid Twitter url'
        return
      }

      this.loading = true

        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .catch(error => {
            console.error('Error:', error)
            this.error = error
            this.loading = false
          })
          .then(response => {
            console.log('Success:', response)
            this.$emit('submit', this.videoUrl)

            let id = response.id

            window.location.href = `${apiUrl}/${id}`
          })

        this.email = ''   

    },

    validateUrl(url) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '(www\\.)?'+ // subdomain
        '(twitter\\.com|bsky\\.com|reddit\\.com|x\\.com|www\\.x\\.com|www\\.reddit\\.com|www\\.twitter\\.com)'+ // domain name
        '(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*\\/?$') // path
      
      return !!pattern.test(url)

    }
  }
}
</script>