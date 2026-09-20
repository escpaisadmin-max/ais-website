import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAnalyticsConsent, setAnalyticsConsent } from "../../lib/analytics";

const buttonClass = "rounded border border-ais-navy bg-white px-5 py-2 text-sm font-semibold text-ais-navy hover:bg-ais-silver/30 transition-colors";

export default function CookieNotice({ open, focusOnOpen, onClose }) {
  const panel = useRef(null);
  const consent = getAnalyticsConsent();

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
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="text-sm text-ais-navy/80 flex-1 space-y-2">
          <p>
            With your permission, DataFast measures page visits, successful enquiries, newsletter requests
            and publication download clicks to help us improve AIS. Analytics is off until you accept.
            You can change your choice anytime in Privacy settings. See our{" "}
            <Link to="/privacy-policy" className="text-ais-ocean underline">Privacy Policy</Link>.
          </p>
          {consent !== null && <p>Current choice: analytics {consent ? "accepted" : "rejected"}.</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => choose(false)} className={buttonClass}>Reject analytics</button>
          <button type="button" onClick={() => choose(true)} className={buttonClass}>Accept analytics</button>
          {consent !== null && <button type="button" onClick={onClose} className="px-2 py-2 text-sm text-ais-navy underline">Close</button>}
        </div>
      </div>
    </section>
  );
}
