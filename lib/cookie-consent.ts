export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export const CONSENT_STORAGE_KEY = "cookie_consent";

const listeners = new Set<(state: ConsentState | null) => void>();
let removeStorageListener: (() => void) | null = null;
let cachedRaw: string | null | undefined;
let cachedConsent: ConsentState | null = null;
let volatileConsent: ConsentState | null = null;

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("analytics" in parsed) ||
      !("marketing" in parsed) ||
      !("timestamp" in parsed)
    ) {
      return null;
    }

    const analytics = parsed.analytics;
    const marketing = parsed.marketing;
    const timestamp = parsed.timestamp;

    if (
      typeof analytics !== "boolean" ||
      typeof marketing !== "boolean" ||
      typeof timestamp !== "number"
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics,
      marketing,
      timestamp,
    };
  } catch {
    return null;
  }
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  if (volatileConsent) return volatileConsent;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedConsent = parseConsent(raw);
    }

    return cachedConsent;
  } catch {
    return cachedConsent;
  }
}

export function hasConsented(): boolean {
  return getConsent() !== null;
}

function isOptionalVendorCookie(name: string, state: ConsentState): boolean {
  const analyticsCookie =
    name === "_gid" ||
    name === "_gat" ||
    name.startsWith("_ga") ||
    name.startsWith("_gac_");

  const marketingCookie =
    name === "_fbp" ||
    name === "_fbc" ||
    name === "_ttp" ||
    name === "_tt_enable_cookie" ||
    name === "ttclid" ||
    name === "li_gc" ||
    name === "AnalyticsSyncHistory" ||
    name === "UserMatchHistory" ||
    name === "bcookie" ||
    name === "bscookie" ||
    name === "lidc";

  return (!state.analytics && analyticsCookie) || (!state.marketing && marketingCookie);
}

function clearRevokedVendorCookies(state: ConsentState): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const hostname = window.location.hostname;
  const hostnameParts = hostname.split(".");
  const rootDomain =
    hostnameParts.length > 2 ? `.${hostnameParts.slice(-2).join(".")}` : `.${hostname}`;
  const domains = new Set(["", hostname, `.${hostname}`, rootDomain]);

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !isOptionalVendorCookie(name, state)) return;

    domains.forEach((domain) => {
      const domainAttribute = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttribute}; SameSite=Lax`;
    });
  });
}

export function applyConsentToVendors(state: ConsentState): void {
  if (typeof window === "undefined") return;

  window.gtag?.("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
  });

  window.fbq?.("consent", state.marketing ? "grant" : "revoke");

  if (state.marketing) {
    window.ttq?.grantConsent?.();
  } else {
    window.ttq?.revokeConsent?.();
  }

  if (!state.analytics || !state.marketing) {
    clearRevokedVendorCookies(state);
  }
}

function notify(state: ConsentState | null): void {
  listeners.forEach((listener) => listener(state));
}

export function setConsent(
  choices: Pick<ConsentState, "analytics" | "marketing">,
): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: choices.analytics,
    marketing: choices.marketing,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    const serializedState = JSON.stringify(state);
    cachedRaw = serializedState;
    cachedConsent = state;

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, serializedState);
      volatileConsent = null;
    } catch {
      // Consent still applies for the current page when storage is unavailable.
      volatileConsent = state;
    }
  }

  applyConsentToVendors(state);
  notify(state);

  return state;
}

function ensureStorageSubscription(): void {
  if (typeof window === "undefined" || removeStorageListener) return;

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_STORAGE_KEY) return;

    const state = parseConsent(event.newValue);
    cachedRaw = event.newValue;
    cachedConsent = state;
    volatileConsent = null;
    applyConsentToVendors(
      state ?? {
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now(),
      },
    );
    notify(state);
  };

  window.addEventListener("storage", handleStorage);
  removeStorageListener = () => window.removeEventListener("storage", handleStorage);
}

export function subscribe(listener: (state: ConsentState | null) => void): () => void {
  listeners.add(listener);
  ensureStorageSubscription();

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && removeStorageListener) {
      removeStorageListener();
      removeStorageListener = null;
    }
  };
}
