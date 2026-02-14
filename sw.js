/**
 * 旅遊管家 Pro v31.9 Service Worker
 * 負責離線快取與資源管理
 */

const CACHE_NAME = 'travel-pro-v32-0';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] 正在快取靜態資源');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] 刪除過期快取:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => {
        // 如果是導航請求失敗，則回傳快取的 index.html
        if (e.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});