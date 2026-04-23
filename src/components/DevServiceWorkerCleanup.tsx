"use client";

import { useEffect } from "react";

export default function DevServiceWorkerCleanup() {
  useEffect(() => {
    const shouldCleanup =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (!shouldCleanup || !("serviceWorker" in navigator)) return;

    const cleanup = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));

        if ("caches" in window) {
          const cacheKeys = await caches.keys();
          await Promise.all(cacheKeys.map((key) => caches.delete(key)));
        }
      } catch {
        // Non-blocking cleanup: app should still render even if this fails.
      }
    };

    cleanup();
  }, []);

  return null;
}
