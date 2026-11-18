// Ancienne adresse d'Aplomb : ce service worker se retire et renvoie vers https://usernai89.github.io/aplomb/
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try {
      for (const k of await caches.keys()) {
        if (!k.startsWith('aplomb-')) continue;
        const c = await caches.open(k);
        for (const req of await c.keys()) if (new URL(req.url).pathname.includes('/xamxam/aplomb/')) await c.delete(req);
      }
    } catch (err) {}
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) { try { c.navigate('https://usernai89.github.io/aplomb/'); } catch (err) {} }
  })());
});
