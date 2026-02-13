const CACHE_NAME = 'travel-pro-v29-4';
const ASSETS = [
  'TravelPlannerPro_v29.4_Desktop_Version_2026-02-12.html',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});