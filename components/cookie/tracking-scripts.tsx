"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

import { applyConsentToVendors, getConsent, subscribe } from "@/lib/cookie-consent";

const getServerConsent = () => null;

export function TrackingScripts() {
  const consent = useSyncExternalStore(subscribe, getConsent, getServerConsent);

  if (!consent?.analytics) return null;

  return (
    <Script
      id="posthog"
      src="https://t.horacal.app/static/array.js"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onReady={() => {
        if (!getConsent()?.analytics || window.posthog?.config?.token) return;

        window.posthog?.init("phc_tKiHxF7piKGzzyNNtSWQsyVamkZ3YzUwxHDzMt9Swr8M", {
          api_host: "https://t.horacal.app",
          ui_host: "https://us.posthog.com",
          defaults: "2026-05-30",
          person_profiles: "identified_only",
          opt_out_capturing_by_default: true,
          disable_persistence: true,
          loaded: () => {
            const currentConsent = getConsent();
            if (currentConsent) applyConsentToVendors(currentConsent);
            else window.posthog?.opt_out_capturing();
          },
        });
      }}
    />
  );
}
