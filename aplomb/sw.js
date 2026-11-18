// Aplomb : fonctionnement hors ligne.
// Changer VERSION à chaque mise à jour de l'appli pour rafraîchir le cache.
const VERSION = 'aplomb-v1';
const FONTS = 'aplomb-fonts-1';
const KEEP = [VERSION, FONTS];
const SHELL = ['./', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-512-maskable.png', 'icons/apple-touch-icon.png'];
const isFont = u => u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('aplomb-') && !KEEP.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Page : réseau d'abord (dernière version), sans attendre plus de 3 s ; sinon la version gardée.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const net = fetch(req).then(res => { if (res.ok && !res.redirected) cache.put('./', res.clone()); return res; });
      try {
        return await Promise.race([net, new Promise((_, no) => setTimeout(() => no(new Error('lent')), 3000))]);
      } catch (err) {
        const hit = await cache.match('./');
        if (hit) { net.catch(() => {}); return hit; }
        return net;
      }
    })());
    return;
  }
  const mine = url.origin === self.location.origin && url.pathname.startsWith(new URL('./', self.registration.scope).pathname);
  if (!mine && !isFont(url)) return;
  const name = isFont(url) ? FONTS : VERSION;
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(name).then(c => c.put(req, copy)); }
    return res;
  })));
});
