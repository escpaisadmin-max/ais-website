const CONSENT_KEY = "ais-analytics-consent-v1";
const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
const SCRIPT_ID = "ais-datafast";
const GOALS = new Set(["contact_submit", "newsletter_signup", "publication_download"]);

function readPreference() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
    return typeof stored?.accepted === "boolean" && stored.expiresAt > Date.now() ? stored : null;
  } catch {
    return null;
  }
}

let preference = readPreference();
let started = false;
let expiryTimer;

export function getAnalyticsConsent() {
  return preference?.expiresAt > Date.now() ? preference.accepted : null;
}

function setIgnored(ignored) {
  try {
    if (ignored) window.localStorage.setItem("datafast_ignore", "true");
    else window.localStorage.removeItem("datafast_ignore");
  } catch {
    // Consent still applies to this page when browser storage is unavailable.
  }
}

function clearIdentifiers() {
  const cookies = ["datafast_visitor_id", "datafast_visitor_first_seen_at", "datafast_visitor_session_count", "datafast_session_id"];
  try {
    for (const name of cookies) {
      for (const domain of ["", window.location.hostname, "escpais.com"]) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure${domain ? `; Domain=${domain}` : ""}`;
      }
    }
  } catch {
    // Some browser privacy settings block cookie access entirely.
  }
  try {
    for (const key of Object.keys(window.sessionStorage)) {
      if (key.startsWith("datafast_")) window.sessionStorage.removeItem(key);
    }
  } catch {
    // Storage may be blocked by the browser.
  }
}

function stopAnalytics() {
  window.clearTimeout(expiryTimer);
  setIgnored(true);
  if (Array.isArray(window.datafast?.q)) window.datafast.q.length = 0;
  window.datafast = undefined;
  document.getElementById(SCRIPT_ID)?.remove();
  clearIdentifiers();
  // The vendor has no teardown API; reload removes its listeners and pending requests.
  if (started) window.location.reload();
}

function scheduleExpiry() {
  window.clearTimeout(expiryTimer);
  if (getAnalyticsConsent() !== true) return;
  expiryTimer = window.setTimeout(() => {
    if (getAnalyticsConsent() === true) scheduleExpiry();
    else stopAnalytics();
  }, Math.min(preference.expiresAt - Date.now(), 2 ** 31 - 1));
}

function startAnalytics() {
  scheduleExpiry();
  if (started || getAnalyticsConsent() !== true || !["escpais.com", "www.escpais.com"].includes(window.location.hostname)) return;
  setIgnored(false);
  started = true;
  const queue = (...args) => {
    if (getAnalyticsConsent() === true) queue.q.push(args);
  };
  queue.q = [];
  window.datafast = queue;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.dataset.websiteId = "dfid_XMhiN5M8DMVgnrKxocV4D";
  script.dataset.domain = "escpais.com";
  script.dataset.disablePayments = "true";
  script.src = "https://datafa.st/js/script.js";
  document.head.appendChild(script);
}

export function setAnalyticsConsent(accepted) {
  preference = { accepted, expiresAt: Date.now() + CONSENT_LIFETIME };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(preference));
  } catch {
    // A full storage quota must not leave an older acceptance active after reload.
    try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage is blocked. */ }
  }
  if (accepted) startAnalytics();
  else stopAnalytics();
}

export function initializeAnalytics() {
  preference = readPreference();
  if (getAnalyticsConsent() === true) startAnalytics();
  else stopAnalytics();
  const syncPreference = (event) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    preference = readPreference();
    if (getAnalyticsConsent() === true) startAnalytics();
    else stopAnalytics();
  };
  const checkExpiry = () => {
    if (getAnalyticsConsent() !== true) stopAnalytics();
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

export function trackGoal(name, properties = {}) {
  if (!started || getAnalyticsConsent() !== true || !GOALS.has(name) || typeof window.datafast !== "function") return;
  const safeProperties = {};
  if (name === "publication_download") {
    if (["presentation", "newsletter", "founder_report"].includes(properties.publication_type)) {
      safeProperties.publication_type = properties.publication_type;
    }
    if (typeof properties.publication_id === "string" && /^[a-z0-9_-]{1,255}$/.test(properties.publication_id)) {
      safeProperties.publication_id = properties.publication_id;
    }
  }
  try {
    window.datafast(name, safeProperties);
  } catch {
    // Optional analytics must never interrupt a form submission or download.
  }
}
