import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import CookieNotice from "./CookieNotice";
import { getAnalyticsConsent, initializeAnalytics } from "../../lib/analytics";

export default function Layout() {
  const location = useLocation();
  const [privacyPanel, setPrivacyPanel] = useState(() => getAnalyticsConsent() === null ? "initial" : null);
  const privacyButton = useRef(null);

  useEffect(initializeAnalytics, []);

  const openPrivacy = (event) => {
    privacyButton.current = event.currentTarget;
    setPrivacyPanel("requested");
  };
  const closePrivacy = () => {
    setPrivacyPanel(null);
    privacyButton.current?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:text-ais-navy focus:rounded focus:shadow-lg">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer onOpenPrivacy={openPrivacy} />
        <CookieNotice open={privacyPanel !== null} focusOnOpen={privacyPanel === "requested"} onClose={closePrivacy} />
      </div>
    </MotionConfig>
  );
}
