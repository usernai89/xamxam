// XamXam : fonctionnement hors ligne.
// Changer VERSION à chaque mise à jour de l'appli pour rafraîchir le cache.
const VERSION = 'xamxam-v12';
// Ces caches-là sont gardés d'une version à l'autre : les bibliothèques (lecture des PDF et des photos, environ 10 Mo)
// et les polices ne sont pas retéléchargées à chaque mise à jour.
const LIB = 'xamxam-lib-1', FONTS = 'xamxam-fonts-1', SHARE = 'xamxam-share', LESSONS = 'xamxam-internat-1';
const KEEP = [VERSION, LIB, FONTS, SHARE, LESSONS];
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-512-maskable.png',
  'icons/apple-touch-icon.png'
];
const isFont = u => u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';
const isLib = u => u.origin === self.location.origin && u.pathname.includes('/lib/');

// À l'installation, les fichiers sont pris sur le serveur (pas dans le cache du navigateur, qui peut garder
// l'ancienne version quelques minutes) : la version gardée pour le hors ligne est bien la nouvelle.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      if (KEEP.includes(k)) continue;
      try { // on récupère les bibliothèques et les polices des anciennes versions avant de les effacer
        const old = await caches.open(k);
        for (const req of await old.keys()) {
          const u = new URL(req.url);
          const to = isFont(u) ? FONTS : isLib(u) ? LIB : null;
          if (!to) continue;
          const res = await old.match(req);
          if (res) await (await caches.open(to)).put(req, res);
        }
      } catch (err) {}
      await caches.delete(k);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  // Fichier partagé vers XamXam (WhatsApp → Partager → XamXam) : on le garde, puis on ouvre l'appli.
  if (req.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const fd = await req.formData(); const f = fd.get('file');
        if (f) { const c = await caches.open(SHARE); await c.put('shared-file', new Response(f)); }
      } catch (err) {}
      return Response.redirect(new URL('./?shared=1', self.registration.scope).href, 303);
    })());
    return;
  }
  if (req.method !== 'GET') return;

  // Page de l'appli : réseau d'abord pour avoir la dernière version, mais sans attendre plus de 3 secondes.
  // Réseau lent ou absent : on ouvre la version gardée sur l'appareil.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const net = fetch(req).then(res => {
        if (res.ok && !res.redirected && new URL(res.url).origin === self.location.origin) cache.put('index.html', res.clone());
        return res;
      });
      try {
        return await Promise.race([net, new Promise((_, no) => setTimeout(() => no(new Error('lent')), 3000))]);
      } catch (err) {
        const hit = await cache.match('index.html');
        if (hit) { net.catch(() => {}); return hit; }
        return net;
      }
    })());
    return;
  }

  // Fichiers de l'appli, bibliothèques et polices : cache d'abord, puis réseau.
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !isFont(url)) return;
  // Leçons d'internat : la version gardée s'affiche tout de suite, et elle est rafraîchie en arrière-plan.
  if (url.pathname.includes('/internat/')) {
    e.respondWith((async () => {
      const cache = await caches.open(LESSONS);
      const hit = await cache.match(req);
      const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; });
      if (hit) { net.catch(() => {}); return hit; }
      return net;
    })());
    return;
  }
  const name = isFont(url) ? FONTS : isLib(url) ? LIB : VERSION;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(name).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
