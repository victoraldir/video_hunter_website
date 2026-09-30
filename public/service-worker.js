const CACHE_NAME = 'video-hunter-cache-v2';
const urlsToCache = [
  '/assets/apple-icon-180x180.png',
  '/assets/favicon-32x32.png',
  '/assets/manifest.json',
  '/assets/og-image.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        urlsToCache.map(url =>
          cache.add(url).catch(error => {
            // A single failing asset must not block the install.
            console.error(`Failed to cache ${url}:`, error);
          })
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Only handle GET requests; anything else goes straight to the network.
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Never cache video pages, downloads or cross-origin API calls.
  if (url.pathname.startsWith('/prod/') || url.origin !== self.location.origin) {
    return;
  }

  // Navigations and HTML are served network-first so a deploy is visible
  // immediately, falling back to the cache when offline.
  const isDocument = request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  if (isDocument) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets are content-stable, so cache-first is safe and fast.
  event.respondWith(
    caches.match(request).then(response => response || fetch(request))
  );
});
