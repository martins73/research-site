---
layout: null
---
const CACHE_NAME = 'v{{ site.time | date: "%s" }}';

const PRECACHE = [
  '{{ "/assets/css/style.css" | relative_url }}?v={{ site.time | date: "%s" }}',
  '{{ "/assets/profile_picture.webp" | relative_url }}',
  '{{ "/assets/logos/favicon.svg" | relative_url }}',
  '{{ "/assets/fonts/atkinson-regular.woff2" | relative_url }}',
  '{{ "/assets/fonts/atkinson-bold.woff2" | relative_url }}',
  '{{ "/assets/fonts/merriweather-light.woff2" | relative_url }}',
  '{{ "/assets/fonts/merriweather-regular.woff2" | relative_url }}',
  '{{ "/assets/fonts/merriweather-bold.woff2" | relative_url }}'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  const isPage = request.mode === 'navigate' ||
                 request.headers.get('accept')?.includes('text/html');

  if (isPage) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  const isStatic = /\.(css|js|png|jpg|webp|svg|woff2?|ttf)(\?.*)?$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => cached);

          return cached || fetchPromise;
        })
      )
    );
    return;
  }
});
