<template>
    <div 
        class="text-center"
        v-show="isLoading"
    >
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            isLoading: true
        }
    },
    methods: {
        hide() {
            this.isLoading = false
        }
    }
}
</script>

<style scoped>
.spinner-border {
    /* Center */
    margin-top: 50px;
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-width: 0.2rem;
}

.spinner-border {
    display: inline-block;
    vertical-align: text-bottom;
    border: 0.2em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
    animation: spinner-border .75s linear infinite;
}
</style>