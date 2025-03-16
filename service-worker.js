const CACHE_NAME = 'keita-solution-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/ampoule_led_e27.jpg',
  '/ampoule_led_b22.jpg',
  '/spot_led_encastrable.jpg',
  '/applique_murale_led.jpg',
  '/led_escalier_interieur.jpg',
  '/lampe_exterieur_led.jpg',
  '/projecteur_detecteur_mouvement.jpg',
  '/douille_ampoule.jpg',
  '/interrupteur_simple.jpg',
  '/interrupteur_va_et_vient.jpg',
  '/interrupteur_double_allumage.jpg',
  '/bouton_poussoir.jpg',
  '/prise_tv_sonnerie.jpg',
  '/prise_courant_pt2.jpg',
  '/minuterie.jpg',
  '/disjoncteur_dismatic.jpg',
  '/telerupteur.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
  // Add other assets you want to cache
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
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});