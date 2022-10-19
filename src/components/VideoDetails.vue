<template>
    <meta property="og:image" v-bind:content="video.video_img" />
    <spinner v-show="isLoading" />
    <!-- Video details -->
    <div v-if="!isLoading" class="card">
        <a v-bind:href="getHref">
            Back to {{user}} videos
        </a>
        <hr />
        <div class="row row-cols-1 row-cols-md-2 text-center">
            <div class="col mb-3">
                <video-card v-if="video" v-bind:created-at="video.created_at" v-bind:variants="video.variants"
                    v-bind:user="user" />
            </div>
            <div class="col mb-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Format</th>
                            <th>Bitrate</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="variant in video.variants" v-bind:key="variant.content_type">
                            <td><strong>{{variant.content_type}}</strong></td>
                            <td><strong>{{variant.bitrate}}</strong></td>
                            <td><button v-on:click="downloadVideo(variant.url)"
                                    class="btn btn-primary">Download</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div class="col mb-3" >
                <div class="sharethis-inline-share-buttons"></div>
            </div>
        </div>
    </div>
</template>

<script>

import VideoCard from './Card.vue'
import Spinner from './Spinner.vue'

const api = "https://api.myvideohunter.com/requester"

export default {

    components: {
        VideoCard,
        Spinner
    },

    data: function () {
        return {
            video: null,
            user: null,
            createdAt: null,
            isLoading: true,
        }
    },
    computed: {
        getHref() {
            return "/videos.html?u=" + this.user
        }
    },
    created() {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.user = params.get("u")
        this.createdAt = params.get("createdAt")
        this.fetchData()
    },

    methods: {
        async fetchData() {
            const response = await window.fetch(`${api}` + `/${this.user}` + `/${this.createdAt}`)
            const json = await response.json()
            this.isLoading = false
            this.video = json
        },
        downloadVideo(videoUrl) {
            this.isLoading = true
            let oReq = new XMLHttpRequest();
            oReq.responseType = 'blob';
            oReq.onload = function (e) {
                var blob = e.currentTarget.response;
                var fileName = 'video.mp4';
                let a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = fileName;
                a.dispatchEvent(new MouseEvent('click'));
            };
            oReq.open("get", videoUrl, true);
            oReq.send();
            oReq.onreadystatechange = () => {
                if (oReq.readyState === 4) {
                    this.isLoading = false
                }
            }
        },
    },
}
</script>

<style scoped>
.card {
    margin-top: 20px;
    padding: 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: 0.2rem;
}

.bd-example {
    position: relative;
    padding: 1rem;
    margin: 1rem -15px 0;
    border: solid #f7f7f9;
    border-width: 0.2rem 0 0;
}
</style>