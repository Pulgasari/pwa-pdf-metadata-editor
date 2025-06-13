self.addEventListener('install', (event) => {
  // Optional: Cache leeren bei Installation
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Netzwerkanfragen ohne Caching
  event.respondWith(fetch(event.request));
});

//self.addEventListener('install', event => {
//  event.waitUntil(
//    caches.open('pdf-metadata-cache').then(cache => {
//      //return cache.addAll(['.', 'index.html', 'manifest.json']);
//      return cache.addAll(['manifest.json']);
//    })
//  );
//  self.skipWaiting();
//});
//
//self.addEventListener('fetch', event => {
//  event.respondWith(
//    caches.match(event.request).then(resp => resp || fetch(event.request))
//  );
//});
