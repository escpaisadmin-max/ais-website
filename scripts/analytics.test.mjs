import assert from "node:assert/strict";
import { describe, test } from "node:test";

const CONSENT_KEY = "ais-analytics-consent-v1";
const NOW = 1_800_000_000_000;
const LIFETIME = 180 * 24 * 60 * 60 * 1000;
let importNumber = 0;

function preference(accepted, expiresAt = NOW + 60_000) {
  return JSON.stringify({ accepted, expiresAt });
}

function storage(entries = {}, blocked = false) {
  const values = { ...entries };
  const checkAccess = () => {
    if (blocked) throw new Error("Browser storage is blocked");
  };
  Object.defineProperties(values, {
    getItem: { value(key) { checkAccess(); return Object.hasOwn(values, key) ? values[key] : null; } },
    setItem: { value(key, value) { checkAccess(); values[key] = String(value); } },
    removeItem: { value(key) { checkAccess(); delete values[key]; } },
  });
  return values;
}

async function setup(t, { local = {}, session = {}, hostname = "www.escpais.com", blockedStorage = false, blockedCookies = false } = {}) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const previousNow = Date.now;
  const listeners = new Map();
  const scripts = new Map();
  const timers = new Map();
  let timerId = 0;
  const env = { now: NOW, appended: [], cookieWrites: [], reloads: 0, scripts, timers };
  const fakeWindow = {
    localStorage: storage(local, blockedStorage),
    sessionStorage: storage(session, blockedStorage),
    location: { hostname, reload() { env.reloads += 1; } },
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(listener);
    },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener); },
  };
  const fakeDocument = {
    createElement(tag) {
      assert.equal(tag, "script", "Only an analytics script should be created");
      return { dataset: {}, remove() { scripts.delete(this.id); } };
    },
    getElementById(id) { return scripts.get(id) || null; },
    head: { appendChild(script) { env.appended.push(script); scripts.set(script.id, script); } },
    set cookie(value) {
      if (blockedCookies) throw new Error("Cookie access is blocked");
      env.cookieWrites.push(value);
    },
  };
  Object.defineProperty(globalThis, "window", { configurable: true, value: fakeWindow });
  Object.defineProperty(globalThis, "document", { configurable: true, value: fakeDocument });
  Date.now = () => env.now;
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else delete globalThis.document;
    Date.now = previousNow;
  });
  env.window = fakeWindow;
  env.emit = (type, event = {}) => {
    for (const listener of [...(listeners.get(type) || [])]) listener(event);
  };
  env.listenerCount = (type) => listeners.get(type)?.size || 0;
  env.fireTimer = () => {
    const next = timers.entries().next().value;
    assert.ok(next, "Expected an expiry timer");
    timers.delete(next[0]);
    next[1].callback();
  };
  env.analytics = await import(new URL(`../src/lib/analytics.js?test=${++importNumber}`, import.meta.url));
  return env;
}

describe("Analytics consent and safe goals", { concurrency: false }, () => {
  const unapprovedPreferences = [
    ["unknown", {}, null],
    ["legacy acknowledgement", { "ais-cookie-notice-acknowledged": "true" }, null],
    ["rejected", { [CONSENT_KEY]: preference(false) }, false],
    ["expired", { [CONSENT_KEY]: preference(true, NOW - 1) }, null],
    ["malformed", { [CONSENT_KEY]: "invalid json" }, null],
    ["non-boolean", { [CONSENT_KEY]: JSON.stringify({ accepted: "true", expiresAt: NOW + 60_000 }) }, null],
  ];
  for (const [name, local, expected] of unapprovedPreferences) {
    test(`${name} preference never starts tracking or sends goals`, async (t) => {
      const env = await setup(t, { local });
      const calls = [];
      env.window.datafast = (...args) => calls.push(args);
      env.analytics.trackGoal("contact_submit");
      const cleanup = env.analytics.initializeAnalytics();
      env.analytics.trackGoal("newsletter_signup");
      assert.equal(env.analytics.getAnalyticsConsent(), expected);
      assert.equal(env.appended.length, 0);
      assert.equal(env.window.datafast, undefined);
      assert.deepEqual(calls, []);
      assert.equal(env.reloads, 0);
      cleanup();
    });
  }

  test("accepted consent starts once across StrictMode setup/cleanup/setup", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
    const firstCleanup = env.analytics.initializeAnalytics();
    assert.equal(env.timers.size, 1);
    firstCleanup();
    assert.equal(env.timers.size, 0);
    const secondCleanup = env.analytics.initializeAnalytics();
    env.analytics.setAnalyticsConsent(true);
    assert.equal(env.appended.length, 1);
    assert.equal(env.scripts.size, 1);
    assert.equal(env.listenerCount("storage"), 1);
    assert.equal(env.listenerCount("focus"), 1);
    assert.equal(env.timers.size, 1);
    const script = env.appended[0];
    assert.equal(script.src, "https://datafa.st/js/script.js");
    assert.equal(script.async, true);
    assert.equal(script.dataset.domain, "escpais.com");
    assert.equal(script.dataset.disablePayments, "true");
    assert.equal(env.window.localStorage.getItem("datafast_ignore"), null);
    secondCleanup();
    assert.equal(env.listenerCount("storage"), 0);
    assert.equal(env.listenerCount("focus"), 0);
    assert.equal(env.listenerCount("pageshow"), 0);
  });

  test("acceptance buffers only subsequent goals and never replays pre-consent actions", async (t) => {
    const env = await setup(t);
    env.analytics.initializeAnalytics();
    env.analytics.trackGoal("contact_submit");
    env.analytics.trackGoal("publication_download", { publication_id: "pe-23-ai-in-pe" });
    env.analytics.setAnalyticsConsent(true);
    assert.deepEqual(env.window.datafast.q, []);
    env.analytics.trackGoal("newsletter_signup");
    assert.deepEqual(env.window.datafast.q, [["newsletter_signup", {}]]);
    env.analytics.initializeAnalytics()();
    assert.deepEqual(env.window.datafast.q, [["newsletter_signup", {}]]);
    assert.equal(env.appended.length, 1);
  });

  test("denial clears vendor cookies on all domain variants and session identifiers only", async (t) => {
    const env = await setup(t, {
      session: { datafast_session_id: "old", datafast_other: "old", unrelated: "keep" },
    });
    env.analytics.setAnalyticsConsent(false);
    const expectedNames = ["datafast_visitor_id", "datafast_visitor_first_seen_at", "datafast_visitor_session_count", "datafast_session_id"];
    for (const name of expectedNames) {
      for (const domain of [null, "www.escpais.com", "escpais.com"]) {
        assert.ok(env.cookieWrites.some((cookie) => cookie.startsWith(`${name}=;`)
          && cookie.includes("Max-Age=0") && cookie.includes("Path=/")
          && (domain ? cookie.includes(`Domain=${domain}`) : !cookie.includes("Domain="))), `${name} on ${domain || "host-only"}`);
      }
    }
    assert.deepEqual(Object.keys(env.window.sessionStorage), ["unrelated"]);
    assert.equal(env.window.sessionStorage.getItem("unrelated"), "keep");
    assert.equal(env.window.localStorage.getItem("datafast_ignore"), "true");
    assert.equal(env.reloads, 0);
  });

  test("withdrawing active consent removes the SDK/queue, reloads and prevents later goals", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    env.analytics.trackGoal("contact_submit");
    const priorQueue = env.window.datafast;
    env.analytics.setAnalyticsConsent(false);
    env.analytics.trackGoal("newsletter_signup");
    priorQueue("newsletter_signup", {});
    assert.equal(env.analytics.getAnalyticsConsent(), false);
    assert.equal(env.window.datafast, undefined);
    assert.equal(env.scripts.size, 0);
    assert.equal(env.timers.size, 0);
    assert.equal(env.reloads, 1);
    assert.deepEqual(priorQueue.q, [], "Withdrawal also discards already buffered events");
  });

  test("another tab's rejection stops active tracking, while unrelated storage changes do not", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
    env.analytics.initializeAnalytics();
    env.emit("storage", { key: "unrelated" });
    assert.equal(env.reloads, 0);
    env.window.localStorage.setItem(CONSENT_KEY, preference(false));
    env.emit("storage", { key: CONSENT_KEY });
    assert.equal(env.analytics.getAnalyticsConsent(), false);
    assert.equal(env.reloads, 1);
    assert.equal(env.scripts.size, 0);
    assert.equal(env.window.datafast, undefined);
  });

  test("another tab clearing preferences revokes active consent", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
    env.analytics.initializeAnalytics();
    env.window.localStorage.removeItem(CONSENT_KEY);
    env.emit("storage", { key: null });
    assert.equal(env.analytics.getAnalyticsConsent(), null);
    assert.equal(env.reloads, 1);
    assert.equal(env.window.datafast, undefined);
  });

  test("consent expiry timer is capped safely and stops tracking after expiry without waiting", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    assert.equal([...env.timers.values()][0].delay, 2 ** 31 - 1);
    env.now += 2 ** 31 - 1;
    env.fireTimer();
    assert.equal(env.reloads, 0);
    assert.equal(env.timers.size, 1);
    env.now = NOW + LIFETIME + 1;
    env.fireTimer();
    assert.equal(env.analytics.getAnalyticsConsent(), null);
    assert.equal(env.reloads, 1);
    assert.equal(env.window.datafast, undefined);
    assert.equal(env.scripts.size, 0);
    assert.equal(env.timers.size, 0);
  });

  for (const event of ["focus", "pageshow"]) {
    test(`${event} also stops an expired SDK after a suspended page resumes`, async (t) => {
      const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
      env.analytics.initializeAnalytics();
      env.now += 60_001;
      env.emit(event);
      assert.equal(env.reloads, 1);
      assert.equal(env.window.datafast, undefined);
      assert.equal(env.scripts.size, 0);
    });
  }

  test("blocked local/session storage preserves in-memory choice without breaking callers", async (t) => {
    const env = await setup(t, { blockedStorage: true });
    assert.equal(env.analytics.getAnalyticsConsent(), null);
    assert.doesNotThrow(() => env.analytics.initializeAnalytics());
    assert.doesNotThrow(() => env.analytics.setAnalyticsConsent(true));
    assert.equal(env.analytics.getAnalyticsConsent(), true);
    env.analytics.trackGoal("contact_submit");
    assert.deepEqual(env.window.datafast.q, [["contact_submit", {}]]);
    assert.doesNotThrow(() => env.analytics.setAnalyticsConsent(false));
    assert.equal(env.reloads, 1);
  });

  test("blocked cookie access cannot interrupt denial or SDK withdrawal", async (t) => {
    const env = await setup(t, { blockedCookies: true });
    assert.doesNotThrow(() => env.analytics.initializeAnalytics());
    env.analytics.setAnalyticsConsent(true);
    assert.doesNotThrow(() => env.analytics.setAnalyticsConsent(false));
    assert.equal(env.reloads, 1);
    assert.equal(env.window.datafast, undefined);
  });

  test("storage quota failure removes an older acceptance when consent is withdrawn", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true), unrelated: "keep" } });
    env.analytics.initializeAnalytics();
    const savedStorage = env.window.localStorage;
    env.window.localStorage = {
      getItem: (key) => savedStorage.getItem(key),
      removeItem: (key) => savedStorage.removeItem(key),
      setItem() { throw new Error("Storage quota exceeded"); },
    };
    assert.doesNotThrow(() => env.analytics.setAnalyticsConsent(false));
    assert.equal(env.analytics.getAnalyticsConsent(), false);
    assert.equal(env.window.localStorage.getItem(CONSENT_KEY), null);
    assert.equal(env.window.localStorage.getItem("unrelated"), "keep");
    assert.equal(env.window.datafast, undefined);
    assert.equal(env.scripts.size, 0);
    assert.equal(env.reloads, 1);
    const reloadedAnalytics = await import(new URL(`../src/lib/analytics.js?test=${++importNumber}`, import.meta.url));
    assert.equal(reloadedAnalytics.getAnalyticsConsent(), null, "Reload must not restore the old acceptance");
  });

  test("vendor exceptions do not interrupt successful form/download callers", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    let attempts = 0;
    env.window.datafast = () => { attempts += 1; throw new Error("Vendor unavailable"); };
    assert.doesNotThrow(() => env.analytics.trackGoal("contact_submit"));
    assert.doesNotThrow(() => env.analytics.trackGoal("publication_download", { publication_type: "newsletter", publication_id: "pe-23-ai-in-pe" }));
    assert.equal(attempts, 2);
  });

  test("only supported goals and public publication fields reach the vendor", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    for (const invalidName of ["payment", "identify", "pageview", "Contact_Submit", "", null]) {
      env.analytics.trackGoal(invalidName, { email: "private@example.com" });
    }
    assert.deepEqual(env.window.datafast.q, []);
    env.analytics.trackGoal("contact_submit", { email: "private@example.com", name: "Private", message: "Private message" });
    env.analytics.trackGoal("newsletter_signup", { email: "private@example.com" });
    for (const publication_type of ["presentation", "newsletter", "founder_report"]) {
      env.analytics.trackGoal("publication_download", { publication_type, publication_id: "pe-23-ai-in-pe", email: "private@example.com", message: "Private message" });
    }
    assert.deepEqual(env.window.datafast.q, [
      ["contact_submit", {}], ["newsletter_signup", {}],
      ...["presentation", "newsletter", "founder_report"].map((publication_type) => ["publication_download", { publication_type, publication_id: "pe-23-ai-in-pe" }]),
    ]);
  });

  test("invalid publication IDs and arbitrary properties are discarded", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    for (const publication_id of ["private@example.com", "/private/path", "id?email=private", "<script>", "A Mixed Case", "x".repeat(256), "", 123, null]) {
      env.analytics.trackGoal("publication_download", { publication_id, publication_type: "private_type", secret: "do not send" });
    }
    assert.equal(env.window.datafast.q.length, 9);
    assert.ok(env.window.datafast.q.every(([name, properties]) => name === "publication_download" && Object.keys(properties).length === 0));
  });

  for (const hostname of ["localhost", "127.0.0.1", "ais-website-preview.vercel.app"]) {
    test(`${hostname} never loads the SDK or emits goals`, async (t) => {
      const env = await setup(t, { hostname, local: { [CONSENT_KEY]: preference(true) } });
      env.analytics.initializeAnalytics();
      env.analytics.setAnalyticsConsent(true);
      env.analytics.trackGoal("newsletter_signup");
      assert.equal(env.appended.length, 0);
      assert.equal(env.window.datafast, undefined);
      const calls = [];
      env.window.datafast = (...args) => calls.push(args);
      env.analytics.trackGoal("contact_submit");
      assert.deepEqual(calls, [], "Preview goals must stay excluded even if another script has set window.datafast");
    });
  }
});
