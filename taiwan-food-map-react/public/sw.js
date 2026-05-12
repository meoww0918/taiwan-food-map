/* Coco Cruise service worker — minimal cache-then-network for offline access. */
const CACHE_VERSION = 'coco-v3';

// Paths relative to SW scope (works under any base path, e.g. /taiwan-food-map/).
const CORE_ASSETS_REL = [
  '',
  'manifest.webmanifest',
  'assets/header.png',
  'assets/food-map.png',
  'assets/street-map.png',
  'assets/challenge.png',
  'assets/survival-tools.png',
  'assets/contact.png',
  'assets/music.png',
  'assets/icons/nav-food-map.png',
  'assets/icons/nav-street-map.png',
  'assets/icons/nav-challenges.png',
  'assets/icons/nav-survival-tools.png',
  'assets/icons/nav-music.png',
];

self.addEventListener('install', (event) => {
  const scope = self.registration.scope;
  const urls = CORE_ASSETS_REL.map((p) => scope + p);
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(urls).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Stale-while-revalidate for same-origin GETs
  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((res) => {
          if (res && res.ok) cache.put(request, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
