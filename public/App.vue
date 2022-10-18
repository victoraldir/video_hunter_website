<template>
    <spinner
        v-if="isLoading"
    />
    <grid
        v-if="videoList"
        v-bind:video-list="videoList"
        v-bind:user="user"
    />
</template>

<script>

import Grid from './Grid.vue'
import Spinner from './Spinner.vue'

const api = "https://api.myvideohunter.com/requester"

export default {

    components: {
        Grid,
        Spinner,
    },

    data() {
        return {
            videoList: null,
            isLoading: true,
            user: null,
        }
    },
    created() {
        this.fetchData()
    },

    methods: {
        async fetchData() {
            let uri = window.location.search.substring(1); 
            let params = new URLSearchParams(uri);
            this.user = params.get("u")
            const url = `${api}` + `/${this.user}/list`
            const response = await window.fetch(`${url}`)
            const json = await response.json()
            this.videoList = json.Items
            this.isLoading = false
        }
    }
}
</script>

<style scoped>
</style>