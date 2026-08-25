const CACHE_PREFIX = "storm-forge";
const CACHE_VERSION = "v7";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`;
const MEDIA_CACHE = `${CACHE_PREFIX}-media-${CACHE_VERSION}`;
const MAX_MEDIA_ENTRIES = 120;
const APP_ROOT = new URL("./", self.location.href).pathname;
const appFile = (path) => `${APP_ROOT}${path}`;
const CORE_FILES = [
  APP_ROOT,
  appFile("index.html"),
  appFile("offline.html"),
  appFile("manifest.webmanifest"),
  appFile("apple-touch-icon.png"),
  appFile("pwa-icon-192.png"),
  appFile("pwa-icon-512.png"),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(async (cache) => {
        const results = await Promise.allSettled(
          CORE_FILES.map(async (url) => {
            const response = await fetch(url, { cache: "reload" });
            if (!response.ok) throw new Error(`No se pudo precachear ${url}`);
            await cache.put(url, response);
          })
        );

        const hasAppShell = await cache.match(appFile("index.html"));
        if (!hasAppShell) {
          throw new Error("No se pudo instalar la pantalla principal offline.");
        }

        results
          .filter((result) => result.status === "rejected")
          .forEach((result) => console.warn(result.reason));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && ![STATIC_CACHE, RUNTIME_CACHE, MEDIA_CACHE].includes(key))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (["script", "style", "worker"].includes(request.destination)) {
    event.respondWith(networkFirstAsset(request));
    return;
  }

  event.respondWith(cacheFirstAsset(request));
});

async function networkFirstPage(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await safelyCacheResponse(cache, request, response.clone());
    }
    return response;
  } catch {
    return (
      await caches.match(request) ||
      await caches.match(appFile("index.html")) ||
      await caches.match(APP_ROOT) ||
      await caches.match(appFile("offline.html"))
    );
  }
}

async function cacheFirstAsset(request) {
  const cacheName = request.destination === "image" ? MEDIA_CACHE : RUNTIME_CACHE;
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (response.ok) {
      await safelyCacheResponse(cache, request, response.clone());
      if (cacheName === MEDIA_CACHE) await trimCache(cache, MAX_MEDIA_ENTRIES);
    }

    return response;
  } catch {
    return Response.error();
  }
}

async function networkFirstAsset(request) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await safelyCacheResponse(cache, request, response.clone());
    }

    return response;
  } catch {
    return (await caches.match(request)) || Response.error();
  }
}

async function safelyCacheResponse(cache, request, response) {
  try {
    await cache.put(request, response);
  } catch (error) {
    console.warn("No se pudo actualizar la caché de Storm Forge.", error);
  }
}

async function trimCache(cache, maximumEntries) {
  const keys = await cache.keys();
  const excess = keys.length - maximumEntries;
  if (excess <= 0) return;

  await Promise.all(keys.slice(0, excess).map((request) => cache.delete(request)));
}
