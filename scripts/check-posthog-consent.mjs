import assert from "node:assert/strict";
import { applyConsentToVendors, getConsent, setConsent, subscribe } from "../lib/cookie-consent.ts";

const storage = new Map();
let onStorage;
let optedIn = false;
let optIns = 0;
let marketingConsent;
globalThis.document = { cookie: "" };
globalThis.window = {
  location: { hostname: "localhost" },
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
  addEventListener: (_, listener) => { onStorage = listener; },
  removeEventListener: () => {},
  posthog: {
    config: {},
    set_config: (config) => Object.assign(window.posthog.config, config),
    register: (properties) => { marketingConsent = properties.marketing_consent; },
    has_opted_in_capturing: () => optedIn,
    opt_in_capturing: (options) => {
      assert.equal(options.captureEventName, false);
      optedIn = true;
      optIns++;
    },
    opt_out_capturing: () => { optedIn = false; },
  },
};

// A downloaded SDK must not capture before initialization and consent.
setConsent({ analytics: true, marketing: false });
assert.equal(optIns, 0);
window.posthog.config.token = "test";
applyConsentToVendors(getConsent());
applyConsentToVendors(getConsent());
assert.equal(optIns, 1);
assert.equal(optedIn, true);
assert.equal(window.posthog.config.disable_persistence, false);
assert.equal(marketingConsent, false);
setConsent({ analytics: true, marketing: true });
assert.equal(marketingConsent, true);
assert.equal(optIns, 1);

setConsent({ analytics: false, marketing: true });
assert.equal(optedIn, false);
assert.equal(window.posthog.config.disable_persistence, true);
setConsent({ analytics: true, marketing: false });
assert.equal(optedIn, true);
assert.equal(optIns, 2);

// Removing consent in another tab must stop an already initialized SDK.
const unsubscribe = subscribe(() => {});
storage.delete("cookie_consent");
onStorage({ key: "cookie_consent", newValue: null });
assert.equal(optedIn, false);
assert.equal(getConsent(), null);
assert.equal(window.posthog.config.disable_persistence, true);
unsubscribe();
console.log("PostHog consent check passed.");
