import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAnalyticsConsent, hasPrivacySignal, setAnalyticsConsent } from "../../lib/analytics";

const buttonClass = "rounded border border-ais-navy bg-white px-4 sm:px-5 py-2 text-sm font-semibold text-ais-navy hover:bg-ais-silver/30 transition-colors";
const policyLink = <Link to="/privacy-policy" className="text-ais-ocean underline">Privacy Policy</Link>;

export default function CookieNotice({ open, focusOnOpen, onClose }) {
  const panel = useRef(null);
  const consent = getAnalyticsConsent();
  const privacySignal = hasPrivacySignal();

  useEffect(() => {
    if (open && focusOnOpen) panel.current?.focus();
  }, [open, focusOnOpen]);

  const choose = (accepted) => {
    setAnalyticsConsent(accepted);
    onClose();
  };

  if (!open) return null;

  return (
    <section ref={panel} tabIndex={-1} aria-label="Analytics privacy settings" className="fixed bottom-0 left-0 right-0 z-[60] max-h-[70vh] overflow-y-auto border-t border-ais-silver/40 bg-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
        {privacySignal ? (
          <div className="text-xs sm:text-sm text-ais-navy/80 flex-1 space-y-2">
            <p>
              Your browser sends a privacy signal (Do Not Track or Global Privacy Control), so we use no
              analytics cookies and no session recordings. Visits, enquiries, newsletter requests and
              publication downloads are only counted anonymously, without cookies. See our {policyLink}.
            </p>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-ais-navy/80 flex-1 space-y-2">
            <p>
              We use PostHog analytics, hosted in the EU. Accept: cookies and session recordings, with form
              fields masked. Reject: no cookies, only anonymous counts of visits, enquiries, newsletter requests
              and downloads. Nothing is measured until you choose; change it anytime in Privacy settings.
              See our {policyLink}.
            </p>
            {consent !== null && <p>Current choice: analytics cookies {consent ? "accepted" : "rejected"}.</p>}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {!privacySignal && (
            <>
              <button type="button" onClick={() => choose(false)} className={buttonClass}>Reject cookies</button>
              <button type="button" onClick={() => choose(true)} className={buttonClass}>Accept analytics</button>
            </>
          )}
          {(consent !== null || privacySignal) && <button type="button" onClick={onClose} className="px-2 py-2 text-sm text-ais-navy underline">Close</button>}
        </div>
      </div>
    </section>
  );
}
