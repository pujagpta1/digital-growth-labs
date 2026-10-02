"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, GA_ENABLED, trackEvent } from "@/lib/analytics";

/**
 * Loads GA4 and tracks the site's lead actions:
 *  - click_to_call   → any tel: link
 *  - email_click     → any mailto: link
 *  - audit_form_open → the Free Audit modal opening
 * Form submissions fire `generate_lead` from AuditModal.
 * Page views (including client-side route changes) come from GA4
 * enhanced measurement, which is on for this stream.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ENABLED) return;

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const location = window.location.pathname;
      if (href.startsWith("tel:")) {
        trackEvent("click_to_call", { link_url: href, page_location_path: location });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href.split("?")[0], page_location_path: location });
      }
    };
    const onAuditOpen = () =>
      trackEvent("audit_form_open", { page_location_path: window.location.pathname });

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("open-audit", onAuditOpen);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("open-audit", onAuditOpen);
    };
  }, []);

  if (!GA_ENABLED) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
