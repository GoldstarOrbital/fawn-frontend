// FAWN Service Worker — offline shell + background sync
// Bump CACHE on every shell change: the fetch handler is cache-first for the
// shell, so an unbumped version leaves existing installs on the stale HTML.
const CACHE = 'fawn-v2';
const SHELL = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png', '/assets/fawn-mascot.png'];

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
  // Always fetch API calls live; serve shell from cache on failure
  if (url.pathname.startsWith('/auth') || url.pathname.startsWith('/accounts') ||
      url.pathname.startsWith('/transactions') || url.pathname.startsWith('/news')) {
    e.respondWith(fetch(e.request).catch(() => new Response('{"error":"offline"}', {
      headers: { 'Content-Type': 'application/json' }
    })));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});
