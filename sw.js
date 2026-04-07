// Bass Ear Training — Service Worker
// Caches the app shell and piano samples for offline use

const CACHE_NAME = 'bass-ear-v1';
const SAMPLE_CACHE = 'bass-ear-samples-v1';

// App shell — always cached on install
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Space+Mono:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js'
];

// Piano sample URLs — cached on first fetch, reused offline
const SALAMANDER_BASE = 'https://cdn.jsdelivr.net/npm/@danigb/salamander-piano@1.0.0/samples/';
const SAMPLE_NOTES = [
  'A0','C1','Ds1','Fs1','A1','C2','Ds2','Fs2','A2',
  'C3','Ds3','Fs3','A3','C4','Ds4','Fs4','A4',
  'C5','Ds5','Fs5','A5','C6','Ds6','Fs6','A6',
  'C7','Ds7','Fs7','A7','C8'
];
const SAMPLE_URLS = SAMPLE_NOTES.map(n => SALAMANDER_BASE + n + '.mp3');

// Install — cache app shell immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(SHELL_ASSETS).catch(err => {
        // Don't fail install if external resources are unavailable
        console.warn('Shell cache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== SAMPLE_CACHE)
          .map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — serve from cache, fall back to network, cache piano samples
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Piano samples: cache-first with network fallback, then store for offline
  if (SAMPLE_URLS.some(s => url.includes(s) || url.startsWith(SALAMANDER_BASE))) {
    event.respondWith(
      caches.open(SAMPLE_CACHE).then(cache => {
        return cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // App shell + fonts + Tone.js: stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        if (response.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      }).catch(() => null);

      return cached || networkFetch;
    })
  );
});
