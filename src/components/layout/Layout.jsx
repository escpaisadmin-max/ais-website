import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import CookieNotice from "./CookieNotice";

export default function Layout() {
  const location = useLocation();

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
        <Footer />
        <CookieNotice />
      </div>
    </MotionConfig>
  );
}
