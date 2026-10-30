import { useEffect } from "react";
import MissionSection from "../preview/fall-2026/MissionSection";
import DivisionsGrid from "../preview/fall-2026/DivisionsGrid";
import TeamSection from "../preview/fall-2026/TeamSection";
import FaqSection from "../preview/fall-2026/FaqSection";

// Unlisted preview of the 2026-27 About page (PR #12). Not linked, not in the sitemap,
// served with noindex. Delete this page, its route and src/preview/fall-2026 when PR #12 merges.
export default function FallIntake2026Page() {
  useEffect(() => {
    document.title = "2026 Fall Intake preview | AIS";
  }, []);

  return (
    <>
      <div className="bg-amber-100 text-amber-900 text-sm text-center px-6 py-2">
        Internal preview of the 2026-27 About page. Not linked anywhere and hidden from search engines.
      </div>
      <MissionSection />
      <DivisionsGrid />
      <TeamSection />
      <FaqSection />
    </>
  );
}
