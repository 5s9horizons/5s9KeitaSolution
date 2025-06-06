const CACHE_NAME = 'keita-solution-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
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
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
  '/notification-content.json'
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

// IndexedDB functions
const dbPromise = idb.open('notifications-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
});

function saveMessage(message) {
  return dbPromise.then(db => {
    const tx = db.transaction('notifications', 'readwrite');
    tx.objectStore('notifications').put({ message, sent: false });
    return tx.complete;
  });
}

function getUnsentMessages() {
  return dbPromise.then(db => {
    const tx = db.transaction('notifications', 'readonly');
    return tx.objectStore('notifications').getAll();
  }).then(messages => messages.filter(msg => !msg.sent));
}

function markMessageAsSent(id) {
  return dbPromise.then(db => {
    const tx = db.transaction('notifications', 'readwrite');
    const store = tx.objectStore('notifications');
    return store.get(id).then(msg => {
      msg.sent = true;
      store.put(msg);
      return tx.complete;
    });
  });
}

function getCachedNotificationContent() {
  return caches.match('/notification-content.json').then(response => {
    if (!response) {
      return null;
    }
    return response.json();
  });
}

function updateCachedNotificationContent(content) {
  return caches.open(CACHE_NAME).then(cache => {
    const response = new Response(JSON.stringify(content), {
      headers: { 'Content-Type': 'application/json' }
    });
    return cache.put('/notification-content.json', response);
  });
}

// Push notification event
self.addEventListener('sync', event => {
  if (event.tag === 'send-notifications') {
    event.waitUntil(
      fetch('/notification-content.json')
        .then(response => response.json())
        .then(newContent => {
          return getCachedNotificationContent().then(cachedContent => {
            if (!cachedContent || cachedContent.message !== newContent.message) {
              self.registration.showNotification('Keita Solution', {
                body: newContent.message,
                icon: '/favicon.png'
              });
              return updateCachedNotificationContent(newContent);
            }
          });
        })
    );
  }
});