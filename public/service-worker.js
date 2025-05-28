const CACHE_NAME = 'video-hunter-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/apple-icon-180x180.png',
  '/assets/favicon-32x32.png',
  '/manifest.json',
  '/assets/og-image.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});