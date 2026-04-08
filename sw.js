// GigEar Service Worker v3
// IMPORTANT: bump the version number here whenever index.html changes,
// so old cached versions get replaced immediately.

const CACHE_NAME = 'gigear-v3';

// Only cache truly static assets - NOT index.html
// index.html must always be fetched fresh from network so updates land immediately
const STATIC_ASSETS = [
  'icons/icon-192.png',
  'icons/icon-512.png',
  'manifest.json'
];

// Install: cache only static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete ALL old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - index.html: ALWAYS network-first, fall back to cache only if offline
// - icons/manifest: cache-first
// - everything else: network only
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isLocal = url.origin === location.origin;
  const isHTML = url.pathname === '/' || url.pathname.endsWith('.html');
  const isIcon = url.pathname.startsWith('/icons/') || url.pathname.endsWith('manifest.json');

  if (isHTML && isLocal) {
    // Network-first for HTML — always get the latest version
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache a copy for offline fallback
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  if (isIcon && isLocal) {
    // Cache-first for icons/manifest
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  // All other requests: straight to network
});
