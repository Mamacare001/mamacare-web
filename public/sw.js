/* MamaCare service worker — app-shell caching for the CHW app.
   Strategy: network-first for pages (fresh when online, cached copy when offline),
   cache-first for static assets. Server actions (POST) are never cached. */
const VERSION = "mc-v1";
const SHELL = ["/chw", "/chw/caseload", "/chw/escalations", "/chw/learn", "/chw/enrol", "/chw/refer", "/chw/profile", "/offline", "/emergency", "/status", "/brand/mark.png", "/brand/wordmark.png", "/icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const isPage = req.mode === "navigate";
  const isAsset = url.pathname.startsWith("/_next/static") || url.pathname.startsWith("/brand") || url.pathname.startsWith("/images") || url.pathname.startsWith("/fonts");
  if (isAsset) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })));
    return;
  }
  if (isPage) {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/offline")))
    );
  }
});
