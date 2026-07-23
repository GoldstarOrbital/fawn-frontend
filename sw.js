// FAWN Service Worker — offline shell + background sync
// Bump this whenever the app shell changes. The previous cache-first shell
// could keep returning an old index.html after a GitHub Pages deployment.
const CACHE = 'fawn-v2-8183290';
const BASE = self.registration.scope;
const SHELL = [BASE, `${BASE}index.html`, `${BASE}manifest.json`];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Always fetch API calls live; serve cached data only when offline.
  if (url.pathname.startsWith('/auth') || url.pathname.startsWith('/accounts') ||
      url.pathname.startsWith('/transactions') || url.pathname.startsWith('/news')) {
    e.respondWith(fetch(e.request).catch(() => new Response('{"error":"offline"}', {
      headers: { 'Content-Type': 'application/json' }
    })));
    return;
  }
  const networkFirst = e.request.mode === 'navigate' ||
    ['document', 'script', 'style'].includes(e.request.destination);
  e.respondWith((networkFirst ? fetch(e.request) : caches.match(e.request).then(cached => cached || fetch(e.request)))
    .then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    })
    .catch(() => caches.match(e.request).then(cached => cached || caches.match(`${BASE}index.html`))));
});
