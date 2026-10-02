// Google Analytics 4 — Digital Growth Labs website stream.
// Override with NEXT_PUBLIC_GA_ID in Vercel if the property ever changes.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-MNN9CL72VM";

// Only send data from the live site, never from `next dev`.
export const GA_ENABLED = process.env.NODE_ENV === "production" && !!GA_ID;

// Fire a GA4 event. Safe to call before gtag loads (queues via dataLayer)
// and a no-op on the server or when analytics is disabled.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !GA_ENABLED) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  window.gtag("event", name, params);
}
