"use client";

import { Button } from "@/components/ui/button";

export function CookieSettingsButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      className="cookie-settings-button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      Cookie Settings
    </Button>
  );
}
