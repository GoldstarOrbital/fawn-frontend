// FAWN Service Worker — offline shell only. API responses are NEVER cached.
// Bump CACHE on every shell change (activate purges every other cache), which
// also flushes any API responses an older SW wrongly cached.
const CACHE = 'fawn-v3';
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
  if (e.request.method !== 'GET') return; // never intercept POST/PUT/etc.
  const url = new URL(e.request.url);

  // Cross-origin requests ARE the FAWN API (and third-party SDKs). NEVER cache
  // them: serving a stale balance or transfer list on a payments app is a real
  // hazard — the exact bug that made a reissued wallet keep showing its old
  // balance. Go to the network; fall back to a clear offline marker only when
  // actually offline, so the app shows "offline" rather than stale money data.
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(e.request).catch(() => new Response('{"error":"offline"}', {
      headers: { 'Content-Type': 'application/json' }
    })));
    return;
  }

  // Same-origin app shell/assets: network-first for the shell (so a new deploy
  // is picked up immediately), cache-first for static assets (icons/images).
  const networkFirst = e.request.mode === 'navigate' ||
    ['document', 'script', 'style'].includes(e.request.destination);
  e.respondWith(
    (networkFirst ? fetch(e.request) : caches.match(e.request).then(cached => cached || fetch(e.request)))
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request).then(cached => cached || caches.match('/index.html')))
  );
});
