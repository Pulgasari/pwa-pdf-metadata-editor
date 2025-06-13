self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pdf-metadata-cache').then(cache => {
      //return cache.addAll(['.', 'index.html', 'manifest.json']);
      return cache.addAll(['manifest.json']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
