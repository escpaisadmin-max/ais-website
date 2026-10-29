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

function fakePostHog({ throwOnCapture = false } = {}) {
  const ph = {
    calls: [],
    status: "pending",
    config: null,
    init(token, config) { ph.calls.push(["init", token]); ph.config = config; },
    get_explicit_consent_status() { return ph.status; },
    opt_in_capturing(options) { ph.calls.push(["opt_in", options]); ph.status = "granted"; },
    opt_out_capturing() { ph.calls.push(["opt_out"]); ph.status = "denied"; },
    clear_opt_in_out_capturing() { ph.calls.push(["clear"]); ph.status = "pending"; },
    reset() { ph.calls.push(["reset"]); },
    capture(name, properties) {
      if (throwOnCapture) throw new Error("Vendor unavailable");
      ph.calls.push(["capture", name, properties]);
    },
  };
  ph.captured = () => ph.calls.filter(([kind]) => kind === "capture").map(([, name, properties]) => [name, properties]);
  ph.count = (kind) => ph.calls.filter(([k]) => k === kind).length;
  return ph;
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

async function setup(t, {
  local = {}, hostname = "www.escpais.com", blockedStorage = false, navigator = {}, posthog = fakePostHog(), failLoad = false,
} = {}) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousNow = Date.now;
  const listeners = new Map();
  const timers = new Map();
  let timerId = 0;
  const env = { now: NOW, reloads: 0, timers, loads: 0, posthog };
  const fakeWindow = {
    localStorage: storage(local, blockedStorage),
    navigator,
    location: { hostname, reload() { env.reloads += 1; } },
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(listener);
    },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener); },
  };
  Object.defineProperty(globalThis, "window", { configurable: true, value: fakeWindow });
  Date.now = () => env.now;
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else delete globalThis.window;
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
  env.analytics.setPostHogLoaderForTests(async () => {
    env.loads += 1;
    if (failLoad) throw new Error("Blocked by an ad blocker");
    return posthog;
  });
  return env;
}

describe("PostHog analytics consent and safe goals", { concurrency: false }, () => {
  const undecided = [
    ["unknown", {}],
    ["legacy acknowledgement", { "ais-cookie-notice-acknowledged": "true" }],
    ["expired", { [CONSENT_KEY]: preference(true, NOW - 1) }],
    ["malformed", { [CONSENT_KEY]: "invalid json" }],
    ["non-boolean", { [CONSENT_KEY]: JSON.stringify({ accepted: "true", expiresAt: NOW + 60_000 }) }],
  ];
  for (const [name, local] of undecided) {
    test(`${name} preference never loads PostHog or sends goals`, async (t) => {
      const env = await setup(t, { local });
      env.analytics.trackGoal("contact_submit");
      const cleanup = env.analytics.initializeAnalytics();
      env.analytics.trackGoal("newsletter_signup");
      await flush();
      assert.equal(env.analytics.getAnalyticsConsent(), null);
      assert.equal(env.loads, 0);
      assert.deepEqual(env.posthog.calls, []);
      cleanup();
    });
  }

  test("accepted consent loads PostHog once with the EU, on_reject configuration and opts in", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
    const firstCleanup = env.analytics.initializeAnalytics();
    firstCleanup();
    const secondCleanup = env.analytics.initializeAnalytics();
    await flush();
    assert.equal(env.loads, 1);
    assert.equal(env.posthog.count("init"), 1);
    assert.equal(env.posthog.calls[0][1], env.analytics.POSTHOG_TOKEN);
    assert.match(env.analytics.POSTHOG_TOKEN, /^phc_/);
    const config = env.posthog.config;
    assert.equal(config.api_host, "https://eu.i.posthog.com");
    assert.equal(config.cookieless_mode, "on_reject");
    assert.equal(config.respect_dnt, true);
    assert.equal(config.person_profiles, "identified_only");
    assert.equal(config.session_recording.maskAllInputs, true);
    assert.deepEqual(env.posthog.calls[1], ["opt_in", { captureEventName: false }]);
    assert.equal(env.listenerCount("storage"), 1);
    secondCleanup();
    assert.equal(env.listenerCount("storage"), 0);
    assert.equal(env.listenerCount("focus"), 0);
    assert.equal(env.listenerCount("pageshow"), 0);
  });

  test("rejected consent loads PostHog in cookieless mode by opting out", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(false) } });
    env.analytics.initializeAnalytics();
    await flush();
    assert.equal(env.loads, 1);
    assert.deepEqual(env.posthog.calls.map(([kind]) => kind), ["init", "opt_out"]);
  });

  for (const [name, navigator] of [["Do Not Track", { doNotTrack: "1" }], ["Global Privacy Control", { globalPrivacyControl: true }]]) {
    test(`${name} counts as rejection even after an earlier acceptance`, async (t) => {
      const env = await setup(t, { navigator, local: { [CONSENT_KEY]: preference(true) } });
      assert.equal(env.analytics.hasPrivacySignal(), true);
      assert.equal(env.analytics.getAnalyticsConsent(), false);
      env.analytics.initializeAnalytics();
      await flush();
      assert.equal(env.posthog.count("opt_in"), 0);
      assert.equal(env.posthog.count("opt_out"), 1);
      assert.equal(env.timers.size, 0, "No expiry timer while a privacy signal decides");
    });
  }

  test("choosing in the banner loads PostHog; goals before the choice are never sent", async (t) => {
    const env = await setup(t);
    env.analytics.initializeAnalytics();
    env.analytics.trackGoal("contact_submit");
    env.analytics.setAnalyticsConsent(true);
    env.analytics.trackGoal("newsletter_signup");
    assert.equal(env.posthog.captured().length, 0, "Buffered while the library downloads");
    await flush();
    assert.deepEqual(env.posthog.captured(), [["newsletter_signup", {}]]);
    assert.equal(env.window.localStorage.getItem(CONSENT_KEY), preference(true, NOW + LIFETIME));
  });

  test("withdrawing acceptance opts out without a reload, and accepting again opts back in", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    await flush();
    env.analytics.setAnalyticsConsent(false);
    env.analytics.setAnalyticsConsent(true);
    assert.deepEqual(env.posthog.calls.map(([kind]) => kind), ["init", "opt_in", "opt_out", "opt_in"]);
    assert.equal(env.loads, 1);
    assert.equal(env.reloads, 0);
  });

  test("cookieless visitors only send page visits and goals", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(false);
    await flush();
    const filter = env.posthog.config.before_send;
    for (const name of ["$pageview", "$pageleave", "contact_submit", "newsletter_signup", "publication_download"]) {
      assert.deepEqual(filter({ event: name }), { event: name });
    }
    for (const name of ["$autocapture", "$$heatmap", "$web_vitals", "$rageclick", "$exception", "custom"]) {
      assert.equal(filter({ event: name }), null, `${name} must not be sent without consent`);
    }
    env.analytics.setAnalyticsConsent(true);
    assert.deepEqual(filter({ event: "$autocapture" }), { event: "$autocapture" });
  });

  test("another tab's rejection switches this tab to cookieless mode; unrelated keys are ignored", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
    env.analytics.initializeAnalytics();
    await flush();
    env.emit("storage", { key: "unrelated" });
    assert.equal(env.posthog.count("opt_out"), 0);
    env.window.localStorage.setItem(CONSENT_KEY, preference(false));
    env.emit("storage", { key: CONSENT_KEY });
    assert.equal(env.analytics.getAnalyticsConsent(), false);
    assert.equal(env.posthog.count("opt_out"), 1);
  });

  test("another tab clearing preferences resets PostHog and reloads to show the banner", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
    env.analytics.initializeAnalytics();
    await flush();
    env.window.localStorage.removeItem(CONSENT_KEY);
    env.emit("storage", { key: null });
    assert.equal(env.analytics.getAnalyticsConsent(), null);
    assert.equal(env.posthog.count("clear"), 1);
    assert.equal(env.posthog.count("reset"), 1);
    assert.equal(env.reloads, 1);
  });

  test("consent expiry timer is capped safely and resets PostHog once the choice runs out", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    await flush();
    assert.equal([...env.timers.values()][0].delay, 2 ** 31 - 1);
    env.now += 2 ** 31 - 1;
    env.fireTimer();
    assert.equal(env.reloads, 0);
    assert.equal(env.timers.size, 1);
    env.now = NOW + LIFETIME + 1;
    env.fireTimer();
    assert.equal(env.analytics.getAnalyticsConsent(), null);
    assert.equal(env.posthog.count("clear"), 1);
    assert.equal(env.reloads, 1);
    env.analytics.trackGoal("contact_submit");
    assert.equal(env.posthog.captured().length, 0);
  });

  for (const event of ["focus", "pageshow"]) {
    test(`${event} also resets an expired choice after a suspended page resumes`, async (t) => {
      const env = await setup(t, { local: { [CONSENT_KEY]: preference(true) } });
      env.analytics.initializeAnalytics();
      await flush();
      env.now += 60_001;
      env.emit(event);
      assert.equal(env.reloads, 1);
      assert.equal(env.posthog.count("clear"), 1);
    });
  }

  test("blocked browser storage keeps the in-memory choice without breaking callers", async (t) => {
    const env = await setup(t, { blockedStorage: true });
    assert.equal(env.analytics.getAnalyticsConsent(), null);
    assert.doesNotThrow(() => env.analytics.initializeAnalytics());
    assert.doesNotThrow(() => env.analytics.setAnalyticsConsent(true));
    assert.equal(env.analytics.getAnalyticsConsent(), true);
    await flush();
    env.analytics.trackGoal("contact_submit");
    assert.deepEqual(env.posthog.captured(), [["contact_submit", {}]]);
  });

  test("storage quota failure removes an older acceptance when the choice changes", async (t) => {
    const env = await setup(t, { local: { [CONSENT_KEY]: preference(true), unrelated: "keep" } });
    env.analytics.initializeAnalytics();
    await flush();
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
    const reloaded = await import(new URL(`../src/lib/analytics.js?test=${++importNumber}`, import.meta.url));
    assert.equal(reloaded.getAnalyticsConsent(), null, "Reload must not restore the old acceptance");
  });

  test("a blocked PostHog download never breaks forms or downloads", async (t) => {
    const env = await setup(t, { failLoad: true });
    env.analytics.setAnalyticsConsent(true);
    env.analytics.trackGoal("contact_submit");
    await flush();
    assert.doesNotThrow(() => env.analytics.trackGoal("newsletter_signup"));
    assert.deepEqual(env.posthog.calls, []);
  });

  test("vendor exceptions do not interrupt successful form or download callers", async (t) => {
    const env = await setup(t, { posthog: fakePostHog({ throwOnCapture: true }) });
    env.analytics.setAnalyticsConsent(true);
    await flush();
    assert.doesNotThrow(() => env.analytics.trackGoal("contact_submit"));
    assert.doesNotThrow(() => env.analytics.trackGoal("publication_download", { publication_type: "newsletter", publication_id: "pe-23-ai-in-pe" }));
  });

  test("only supported goals and public publication fields reach PostHog", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(false);
    await flush();
    for (const invalidName of ["payment", "identify", "$pageview", "Contact_Submit", "", null]) {
      env.analytics.trackGoal(invalidName, { email: "private@example.com" });
    }
    assert.deepEqual(env.posthog.captured(), []);
    env.analytics.trackGoal("contact_submit", { email: "private@example.com", name: "Private", message: "Private message" });
    env.analytics.trackGoal("newsletter_signup", { email: "private@example.com" });
    for (const publication_type of ["presentation", "newsletter", "founder_report"]) {
      env.analytics.trackGoal("publication_download", { publication_type, publication_id: "pe-23-ai-in-pe", email: "private@example.com" });
    }
    assert.deepEqual(env.posthog.captured(), [
      ["contact_submit", {}], ["newsletter_signup", {}],
      ...["presentation", "newsletter", "founder_report"].map((publication_type) => ["publication_download", { publication_type, publication_id: "pe-23-ai-in-pe" }]),
    ]);
  });

  test("invalid publication IDs and arbitrary properties are discarded", async (t) => {
    const env = await setup(t);
    env.analytics.setAnalyticsConsent(true);
    await flush();
    for (const publication_id of ["private@example.com", "/private/path", "id?email=private", "<script>", "A Mixed Case", "x".repeat(256), "", 123, null]) {
      env.analytics.trackGoal("publication_download", { publication_id, publication_type: "private_type", secret: "do not send" });
    }
    const captured = env.posthog.captured();
    assert.equal(captured.length, 9);
    assert.ok(captured.every(([name, properties]) => name === "publication_download" && Object.keys(properties).length === 0));
  });

  for (const hostname of ["localhost", "127.0.0.1", "ais-website-preview.vercel.app"]) {
    test(`${hostname} never loads PostHog or emits goals`, async (t) => {
      const env = await setup(t, { hostname, local: { [CONSENT_KEY]: preference(true) } });
      env.analytics.initializeAnalytics();
      env.analytics.setAnalyticsConsent(true);
      env.analytics.trackGoal("newsletter_signup");
      await flush();
      assert.equal(env.loads, 0);
      assert.deepEqual(env.posthog.calls, []);
    });
  }
});
