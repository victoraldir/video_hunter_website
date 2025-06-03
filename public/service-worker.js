const CACHE_NAME = 'video-hunter-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/apple-icon-180x180.png',
  '/assets/favicon-32x32.png',
  '/assets/manifest.json',
  // '/assets/og-image.png', // Temporarily removed for testing
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to add all to cache:', error);
          // Log which URL might be causing the issue if possible
          // This requires iterating and adding one by one if addAll fails generally
          // For now, this general error will point to a problem with one of the URLs.
          urlsToCache.forEach(url => {
            fetch(url).catch(err => console.error(`Failed to fetch ${url}:`, err));
          });
          throw error; // Re-throw to ensure install fails if caching fails
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {

        // If /share is requested, print console log
        if (event.request.url.includes('/share')) {
          console.log('Share request intercepted:', event.request.url);
        }

        return response || fetch(event.request);
      })
  );
});