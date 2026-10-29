// Website analytics via PostHog (EU cloud).
//
// Consent model:
// - No choice yet: PostHog is not loaded and nothing is sent.
// - Accepted: PostHog uses first-party cookies/local storage, records page visits, the three goals below
//   and session replays (inputs masked).
// - Rejected (or a browser privacy signal such as Do Not Track / Global Privacy Control): PostHog runs in
//   cookieless mode. Nothing is stored in the browser; visits and goals are counted with a daily rotating
//   hash computed on PostHog's servers. No session replay.
// The visitor's choice is stored here (not only in PostHog) so it expires after CONSENT_LIFETIME.

const CONSENT_KEY = "ais-analytics-consent-v1";
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const GOALS = new Set(["contact_submit", "newsletter_signup", "publication_download"]);
const PRODUCTION_HOSTS = new Set(["escpais.com", "www.escpais.com"]);
const MAX_BUFFERED_GOALS = 20;

// Public project token; it only allows sending events, not reading data.
export const POSTHOG_TOKEN = "phc_kQcQxz8zHV9f9CgQD7GTymhq67VnvhiSosDt9ETjSFcJ";
export const POSTHOG_CONFIG = {
  api_host: "https://eu.i.posthog.com",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-05-30",
  cookieless_mode: "on_reject",
  person_profiles: "identified_only",
  respect_dnt: true,
  disable_surveys: true,
  capture_exceptions: false,
  session_recording: { maskAllInputs: true },
  // Without cookie consent only page visits and the three goals are sent (no clicks, heatmaps or vitals).
  before_send: (event) => {
    if (!event) return event;
    if (getAnalyticsConsent() === true) return event;
    return COOKIELESS_EVENTS.has(event.event) ? event : null;
  },
};
const COOKIELESS_EVENTS = new Set(["$pageview", "$pageleave", ...GOALS]);

let loadPostHog = () => import("posthog-js").then((module) => module.default);

/** Test hook: replaces the dynamic import of posthog-js. */
export function setPostHogLoaderForTests(loader) {
  loadPostHog = loader;
}

function readPreference() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
    return typeof stored?.accepted === "boolean" && stored.expiresAt > Date.now() ? stored : null;
  } catch {
    return null;
  }
}

let preference = readPreference();
let client = null;
let loading = null;
let loadFailed = false;
let bufferedGoals = [];
let expiryTimer;

/** True when the browser sends Do Not Track or Global Privacy Control. */
export function hasPrivacySignal() {
  try {
    const nav = window.navigator || {};
    return nav.doNotTrack === "1" || nav.doNotTrack === "yes" || window.doNotTrack === "1"
      || nav.msDoNotTrack === "1" || nav.globalPrivacyControl === true;
  } catch {
    return false;
  }
}

/** true = accepted, false = rejected (or privacy signal), null = no choice yet. */
export function getAnalyticsConsent() {
  if (hasPrivacySignal()) return false;
  return preference?.expiresAt > Date.now() ? preference.accepted : null;
}

function isProductionHost() {
  try {
    return PRODUCTION_HOSTS.has(window.location.hostname);
  } catch {
    return false;
  }
}

// PostHog removes its cookie and local storage when switching to cookieless mode; this also drops the
// per-tab session storage entries it leaves behind. The "__ph_opt_in_out_" choice record is kept.
function removeLeftoverIdentifiers() {
  for (const store of ["sessionStorage", "localStorage"]) {
    try {
      const target = window[store];
      for (const key of Object.keys(target)) {
        if (key.startsWith("ph_")) target.removeItem(key);
      }
    } catch {
      // Storage may be blocked by the browser.
    }
  }
}

function syncClientConsent(ph) {
  const consent = getAnalyticsConsent();
  const status = ph.get_explicit_consent_status();
  if (consent === true && status !== "granted") ph.opt_in_capturing({ captureEventName: false });
  if (consent === false && status !== "denied") {
    ph.opt_out_capturing();
    removeLeftoverIdentifiers();
  }
  if (consent === null && status !== "pending") ph.clear_opt_in_out_capturing();
}

function sendGoal(ph, name, properties) {
  try {
    ph.capture(name, properties);
  } catch {
    // Optional analytics must never interrupt a form submission or download.
  }
}

function flushBufferedGoals() {
  const goals = bufferedGoals;
  bufferedGoals = [];
  if (!client || getAnalyticsConsent() === null) return;
  for (const [name, properties] of goals) sendGoal(client, name, properties);
}

function ensureClient() {
  if (client || loading || loadFailed || !isProductionHost() || getAnalyticsConsent() === null) return;
  loading = loadPostHog()
    .then((ph) => {
      // The choice may have been withdrawn while the library was downloading.
      if (getAnalyticsConsent() === null) {
        bufferedGoals = [];
        return;
      }
      ph.init(POSTHOG_TOKEN, POSTHOG_CONFIG);
      client = ph;
      syncClientConsent(ph);
      flushBufferedGoals();
    })
    .catch(() => {
      loadFailed = true;
      bufferedGoals = [];
    })
    .finally(() => {
      loading = null;
    });
}

function reloadPage() {
  try {
    window.location.reload();
  } catch {
    // Nothing else to do.
  }
}

// Called when an accepted choice runs out or is cleared in another tab: forget PostHog's state and show the banner again.
function resetToPending() {
  window.clearTimeout(expiryTimer);
  bufferedGoals = [];
  if (client) {
    try {
      client.clear_opt_in_out_capturing();
      client.reset();
    } catch {
      // Ignore vendor errors; the reload below starts from a clean state.
    }
    reloadPage();
  }
}

function scheduleExpiry() {
  window.clearTimeout(expiryTimer);
  if (preference === null || hasPrivacySignal()) return;
  expiryTimer = window.setTimeout(() => {
    if (getAnalyticsConsent() === null) resetToPending();
    else scheduleExpiry();
  }, Math.max(0, Math.min(preference.expiresAt - Date.now(), 2 ** 31 - 1)));
}

function applyPreference() {
  scheduleExpiry();
  if (getAnalyticsConsent() === null) {
    resetToPending();
    return;
  }
  if (client) syncClientConsent(client);
  else ensureClient();
}

export function setAnalyticsConsent(accepted) {
  preference = { accepted, expiresAt: Date.now() + CONSENT_LIFETIME };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(preference));
  } catch {
    // A full storage quota must not leave an older acceptance active after reload.
    try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage is blocked. */ }
  }
  applyPreference();
}

export function initializeAnalytics() {
  preference = readPreference();
  scheduleExpiry();
  if (getAnalyticsConsent() !== null) {
    if (client) syncClientConsent(client);
    else ensureClient();
  }
  const syncPreference = (event) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    preference = readPreference();
    applyPreference();
  };
  const checkExpiry = () => {
    if (preference !== null && getAnalyticsConsent() === null) {
      preference = null;
      resetToPending();
    }
  };
  window.addEventListener("storage", syncPreference);
  window.addEventListener("focus", checkExpiry);
  window.addEventListener("pageshow", checkExpiry);
  return () => {
    window.clearTimeout(expiryTimer);
    window.removeEventListener("storage", syncPreference);
    window.removeEventListener("focus", checkExpiry);
    window.removeEventListener("pageshow", checkExpiry);
  };
}

function safeGoalProperties(name, properties) {
  const safe = {};
  if (name === "publication_download") {
    if (["presentation", "newsletter", "founder_report"].includes(properties.publication_type)) {
      safe.publication_type = properties.publication_type;
    }
    if (typeof properties.publication_id === "string" && /^[a-z0-9_-]{1,255}$/.test(properties.publication_id)) {
      safe.publication_id = properties.publication_id;
    }
  }
  return safe;
}

export function trackGoal(name, properties = {}) {
  if (!GOALS.has(name) || !isProductionHost() || getAnalyticsConsent() === null) return;
  const safe = safeGoalProperties(name, properties || {});
  if (client) {
    sendGoal(client, name, safe);
    return;
  }
  if (loading && bufferedGoals.length < MAX_BUFFERED_GOALS) bufferedGoals.push([name, safe]);
}
