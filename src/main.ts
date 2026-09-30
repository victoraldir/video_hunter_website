import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { routerOptions } from './router'

export const createApp = ViteSSG(App, routerOptions)

// The service worker is registered in the browser only: there is nothing to
// register while prerendering, and it must never cache the HTML shell
// (see public/service-worker.js).
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.error('ServiceWorker registration failed:', error)
    })
  })
}
