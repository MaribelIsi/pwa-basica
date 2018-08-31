// ASIGNAR NOMBRE Y VERSION DE CACHE

const CACHE_NAME = 'v1_cache_pw';


// Ficheros a cachear en la aplicacion

var urlsToCache = [
  './',
  './css/estilos.css',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/favicon.png',
  './img/favicon-1024.png',
  './img/favicon-512.png',
  './img/favicon-384.png',
  './img/favicon-256.png',
  './img/favicon-192.png',
  './img/favicon-128.png',
  './img/favicon-96.png',
  './img/favicon-64.png',
  './img/favicon-32.png',
  './img/favicon-16.png',
  './img/facebook.png',
  './img/instagram.png',
  './img/twitter.png',
  './videos/1.mp4'
];

// EVENTO INSTALL
// instalacion del serviceWorker y gusradar en cache los recursos estaticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
              .then(() => {
                self.skipWaiting();
              });
    })
      .catch(err => console.log('No se a registrado el cache', err))
  );
});

// ENVENTO ACTIVATE
// que la app funcione sin conexion
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
           cacheNames.map(cacheName => {
             if (cacheWhitelist.indexOf(cacheName) === -1) {
               // BORRAR ELEMENTOS QUE NO SE NECESITAN
               return caches.delete(cacheName);
             }
           })
        );
      })
      .then(() => {
        // ACTIVAR CACHE
        self.clients.claim();
      })
  );
});

// EVENTO FETCH
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          // DEVUELVO DATOS DESDE CACHE
          return res;
        }
        return fetch(e.request);
      })
  );
});
