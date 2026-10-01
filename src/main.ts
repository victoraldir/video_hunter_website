import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { routerOptions } from './router'

const STALE_CHUNK_KEY = 'vh.stale-chunk-reload'

/**
 * A deploy replaces the hashed chunks in /assets and syncs with `--delete`, so
 * the old ones disappear. A tab that was open across a deploy still runs the
 * previous bundle, and when it navigates it tries to import a chunk that no
 * longer exists. The site is fine; the bundle in the tab is stale, so the fix
 * is a reload. The guard is per target path so a genuinely missing chunk cannot
 * put the tab in a reload loop.
 */
function isStaleChunk(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error)

  return /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed/i.test(
    message,
  )
}

export const createApp = ViteSSG(App, routerOptions, ({ router, isClient }) => {
  if (!isClient) return

  router.onError((error, to) => {
    if (!isStaleChunk(error) || !to) return
    if (window.sessionStorage.getItem(STALE_CHUNK_KEY) === to.fullPath) return

    window.sessionStorage.setItem(STALE_CHUNK_KEY, to.fullPath)
    window.location.assign(to.fullPath)
  })

  // Any navigation that does complete clears the guard.
  router.afterEach(() => {
    window.sessionStorage.removeItem(STALE_CHUNK_KEY)
  })
})

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
