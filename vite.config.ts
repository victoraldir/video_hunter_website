import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// The site is prerendered to static HTML by `vite-ssg build` (see package.json).
// Routes are declared without the .html extension and emitted as flat files, so
// the URLs that are already indexed keep working unchanged.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Keep the output small and predictable for the CDN.
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
})
