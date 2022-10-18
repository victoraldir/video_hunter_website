import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default {
  plugins: [vue()],
  base : './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        videos: resolve(__dirname, 'public/videos.html'),
        video: resolve(__dirname, 'public/video.html'),
        policy: resolve(__dirname, 'public/policy.html'),
        faq: resolve(__dirname, 'public/faq.html'),
        error: resolve(__dirname, 'public/404.html'),
      },
    },
  },
}
