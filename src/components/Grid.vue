<template>
    <div class="bd-example">
        <div class="row row-cols-1 row-cols-md-3">
            <div
                v-for="video in videoList" 
                class="col mb-3"
            >
                <video-card                     
                    v-bind:key="video.tweet_id"
                    v-bind:created-at="video.created_at"
                    v-bind:video-thumb="video.video_img"
                    v-bind:user="user"
                />
            </div>
        </div>
    </div>
</template>

<script>

import VideoCard from './Card.vue'

export default {
    
        props: {
            videoList: {
                type: Array
            },
            user: {
                type: String
            }
        },

        components: {
            VideoCard
        },
}
</script>

<style scoped>
.bd-example {
    padding: 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: 0.2rem;
}
</style>