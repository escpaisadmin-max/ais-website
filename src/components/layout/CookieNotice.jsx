import { useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "ais-cookie-notice-acknowledged";

export default function CookieNotice() {
  const [visible, setVisible] = useState(
    () => window.localStorage.getItem(STORAGE_KEY) !== "true"
  );

  const acknowledge = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-ais-silver/40 bg-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-ais-navy/80 flex-1">
          We do not use analytics or advertising cookies. This site stores only a local preference to remember
          that you have seen this notice. See our{" "}
          <Link to="/privacy-policy" className="text-ais-ocean underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="rounded bg-ais-navy px-5 py-2 text-sm font-semibold text-white hover:bg-ais-slate transition-colors"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
}
