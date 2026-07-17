"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getConsent,
  setConsent,
  subscribe,
} from "@/lib/cookie-consent";

const getServerConsent = () => null;

interface ConsentOptionProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function ConsentOption({
  id,
  label,
  description,
  checked,
  disabled = false,
  onCheckedChange,
}: ConsentOptionProps) {
  const descriptionId = `${id}-description`;

  return (
    <div className="consent-option">
      <div className="consent-option__copy">
        <label htmlFor={id}>{label}</label>
        <p id={descriptionId}>{description}</p>
      </div>
      <input
        id={id}
        className="consent-toggle"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => onCheckedChange?.(event.target.checked)}
      />
    </div>
  );
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getConsent, getServerConsent);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const openPreferences = useCallback(() => {
    const savedConsent = getConsent();
    setAnalytics(savedConsent?.analytics ?? false);
    setMarketing(savedConsent?.marketing ?? false);
    setPreferencesOpen(true);
  }, []);

  useEffect(() => {
    return subscribe((nextConsent) => {
      if (!nextConsent) return;

      setAnalytics(nextConsent.analytics);
      setMarketing(nextConsent.marketing);
    });
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => openPreferences();
    window.addEventListener("open-cookie-settings", handleOpenPreferences);

    return () => window.removeEventListener("open-cookie-settings", handleOpenPreferences);
  }, [openPreferences]);

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    setPreferencesOpen(false);
  };

  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false });
    setPreferencesOpen(false);
  };

  const savePreferences = () => {
    setConsent({ analytics, marketing });
    setPreferencesOpen(false);
  };

  return (
    <>
      {consent === null && !preferencesOpen ? (
        <section
          className="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="cookie-banner__surface">
            <div className="cookie-banner__copy">
              <p className="cookie-banner__label">Privacy controls</p>
              <h2 id="cookie-banner-title">Your privacy, your choice.</h2>
              <p id="cookie-banner-description">
                Optional analytics and marketing tools only load after you choose. Vercel Web
                Analytics remains active for basic traffic measurement.
              </p>
            </div>
            <div className="cookie-banner__actions">
              <Button type="button" variant="outline" size="lg" onClick={rejectAll}>
                Reject all
              </Button>
              <Button type="button" variant="ghost" size="lg" onClick={openPreferences}>
                Customize
              </Button>
              <Button type="button" size="lg" onClick={acceptAll}>
                Accept all
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <Sheet open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <SheetContent side="bottom" className="cookie-preferences">
          <div className="cookie-preferences__inner">
            <SheetHeader className="cookie-preferences__header">
              <p className="cookie-banner__label">Privacy controls</p>
              <SheetTitle>Cookie preferences</SheetTitle>
              <SheetDescription>
                Choose which optional services can run. You can change this at any time from the
                footer.
              </SheetDescription>
            </SheetHeader>

            <fieldset className="consent-options">
              <legend className="sr-only">Optional tracking categories</legend>
              <ConsentOption
                id="consent-necessary"
                label="Necessary"
                description="Stores your privacy choice and supports essential site behavior. Always active."
                checked
                disabled
              />
              <ConsentOption
                id="consent-analytics"
                label="Analytics"
                description="Google Analytics helps me understand visits and navigation."
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
              <ConsentOption
                id="consent-marketing"
                label="Marketing"
                description="Meta Pixel, TikTok Pixel and LinkedIn Insight measure campaigns."
                checked={marketing}
                onCheckedChange={setMarketing}
              />
            </fieldset>

            <p className="cookie-preferences__note">
              Vercel Web Analytics is always active. Optional vendor scripts stay off until you
              grant consent.
            </p>

            <SheetFooter className="cookie-preferences__footer">
              <Button type="button" variant="outline" size="lg" onClick={rejectAll}>
                Reject all
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={acceptAll}>
                Accept all
              </Button>
              <Button type="button" size="lg" onClick={savePreferences}>
                Save preferences
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
