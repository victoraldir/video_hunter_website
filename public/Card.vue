<template>
    <a 
    v-bind:href="getHref">
        <div 
            class="card" 
            style="width: 18rem;"
        >        
            <img
                v-if="videoThumb" 
                v-bind:src="videoThumb" 
                class="bd-placeholder-img card-img-top card" 
                width="100%" 
                height="180"/>
                <video
                    v-if="getHigherBitrate" 
                    width="320" 
                    height="240" 
                    controls
                >
                    <source 
                        v-bind:src="getHigherBitrate"
                        type="video/mp4"
                    >
                    Your browser does not support the video tag.
                </video>
            <div class="card-body">
                <p class="card-text">
                    {{addedSince}}
                </p>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    props: {
        createdAt: {
            type: String
        },
        videoThumb: {
            type: String
        },
        variants: {
            type: Array
        },
        user : {
            type: String
        }
    },

    computed: {
        addedSince() {
            const createdData = new Date(this.createdAt)
            const currecntDate = Date.now();
            const diff = currecntDate - createdData
            
            const diferenceInDays = Math.trunc(diff / (1000 * 3600 * 24));
            return diferenceInDays + " days ago"
        },
        getHref() {

            if(this.variants) {
                return "#"
            }

            return "http://127.0.0.1:5173/video.html?u=" + this.user + "&createdAt=" + this.createdAt
        },
        getHigherBitrate() {
            if(this.variants) {
                const sortedVariants = this.variants.sort((a, b) => b.bitrate - a.bitrate)
                const highestBitrate = sortedVariants[0].url.split("?")[0]
                console.info(highestBitrate)
                return highestBitrate
            }

            return null
        }
    }
}
</script>

<style scoped>
.card {
    /* crop image */
    object-fit: cover;
    /* margin */
}

a {
  text-decoration: none;
  text-decoration: underline;
}
</style>