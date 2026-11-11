// PassPass – תמיד טוענים את הגרסה הכי חדשה של הדף מהאינטרנט (גם מהאייקון במסך הבית).
// רק אם אין אינטרנט – משתמשים בעותק האחרון ששמור.
const CACHE = "passpass-pages";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return;
  e.respondWith((async () => {
    try {
      const fresh = await fetch(e.request, { cache: "no-store" });
      const c = await caches.open(CACHE); c.put(e.request, fresh.clone());
      return fresh;
    } catch (err) {
      return (await caches.match(e.request)) || (await caches.match("./")) || Response.error();
    }
  })());
});
