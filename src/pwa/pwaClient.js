let deferredInstallPrompt = null;
let refreshing = false;

export function initializePwa() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    dispatchPwaEvent("storm-forge:installable", true);
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    dispatchPwaEvent("storm-forge:installable", false);
  });

  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (import.meta.env.DEV) {
    clearDevelopmentServiceWorkers();
    return;
  }

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      await registration.update();
      watchRegistration(registration);
    } catch (error) {
      console.warn("No se ha podido activar el modo PWA.", error);
    }
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

export async function requestPwaInstall() {
  if (!deferredInstallPrompt) {
    return false;
  }

  await deferredInstallPrompt.prompt();
  const result = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  dispatchPwaEvent("storm-forge:installable", false);
  return result.outcome === "accepted";
}

function activatePwaUpdate(registration) {
  registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
}

export function isStandalonePwa() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
}

export function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
    (
      window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1
    );
}

function watchRegistration(registration) {
  if (registration.waiting && navigator.serviceWorker.controller) {
    activatePwaUpdate(registration);
  }

  registration.addEventListener("updatefound", () => {
    const worker = registration.installing;

    worker?.addEventListener("statechange", () => {
      if (worker.state === "installed" && navigator.serviceWorker.controller) {
        activatePwaUpdate(registration);
      }
    });
  });
}

async function clearDevelopmentServiceWorkers() {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));

    if ("caches" in window) {
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith("storm-forge-"))
          .map((name) => window.caches.delete(name))
      );
    }
  } catch (error) {
    console.warn("No se ha podido limpiar la caché PWA de desarrollo.", error);
  }
}

function dispatchPwaEvent(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}
