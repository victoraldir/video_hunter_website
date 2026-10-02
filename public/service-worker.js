const CACHE_NAME = 'video-hunter-cache-v5';
const CDN = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist';

const urlsToCache = [
  '/assets/apple-icon-180x180.png',
  '/assets/android-icon-512x512.png',
  '/assets/maskable-icon-512x512.png',
  '/assets/favicon-32x32.png',
  '/assets/manifest.json',
  '/assets/og-image.png',
  `${CDN}/css/bootstrap.min.css`,
  `${CDN}/js/bootstrap.bundle.min.js`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          urlsToCache.map((url) =>
            cache.add(url).catch((error) => {
              // One failing asset must not block the install.
              console.error(`Failed to cache ${url}:`, error);
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only GETs are handled; everything else goes straight to the network.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never touch video pages, downloads, or anything off-origin other than the
  // pinned CDN assets.
  if (url.pathname.startsWith('/prod/')) return;
  if (url.origin !== self.location.origin && !url.href.startsWith(CDN)) return;

  // HTML is network-first so a deploy is visible immediately, falling back to
  // the cache when offline. The prerendered pages are the whole point of the
  // site, so they must never be served stale. Scripts are network-first too:
  // the video page chat lives in /assets/video-page.js, and serving an old
  // version of that file under stale-while-revalidate left a visitor stuck on
  // a broken UI for a whole extra visit before the background refresh landed.
  const isDocument =
    request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
  const isScript = request.destination === 'script';

  if (isDocument || isScript) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  // Static assets: serve from the cache and refresh in the background, so an
  // updated icon or image is picked up on the next visit.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    }),
  );
});
