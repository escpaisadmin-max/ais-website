# ESCP Campus Life pages

**Rule: every change to escpais.com that affects how AIS describes itself must also be made on ESCP Campus Life, in the same piece of work.** This holds for whoever runs the website, now and after handover. A change is not finished until both are updated, or until you have checked that Campus Life doesn't need it.

Campus Life (campuslife.escp.eu, run on CampusGroups) is ESCP's official student society platform. It is often the first place ESCP students and staff see AIS, and search engines and AI assistants treat it as an official ESCP source. If it says something different from escpais.com, both lose credibility.

## What has to stay in sync

The Campus Life page is a short profile of the society that links to escpais.com. Mirror any change to:

- how AIS describes itself: the society description, the homepage hero line, "selective student society" wording;
- the divisions: names, number, order;
- recruitment and selectivity: when AIS recruits, the stages, and the "between 1 and 4 percent of applicants receive an offer" line;
- the newsletter signup and how application announcements are made;
- links into escpais.com: if a page or anchor moves (for example `/about#join`, `/presentations`, `/newsletters`, `/founder-report`), update the Campus Life links;
- the logo, brand colours and contact routes.

You don't need to mirror single publications, events, newsletters or team member changes. Campus Life links to those sections on escpais.com rather than copying them.

## Where the pages are

| Campus | Group on Campus Life | Status (31 Oct 2026) |
|---|---|---|
| London | "Alternative Investments - London Campus", site campuslife.escp.eu/ldnrealestate | AIS profile page live; editable by AIS officers |
| Berlin | "Alternative Investment Society - Berlin campus" (group id 35716) | Listed, but the current AIS account has no officer rights; the group text is still the old four-division text |
| Paris, Turin, Madrid | none | AIS is not listed |

To get edit rights on another campus group, ask that campus's student life office to add the AIS officer as a group officer.

## How to edit the London page

The whole page is one custom HTML widget (widget 12836), not the drag and drop page builder. Editing it in "Edit Web Pages" won't work, because the text there isn't editable.

1. Sign in at campuslife.escp.eu with an ESCP account that is an officer of the London group.
2. Open the menu (top left) → Website → Widgets.
3. On "AIS society profile" (widget 12836) click Edit, then the Source button in the editor toolbar.
4. Change only the text or links you need. The `<style>` block at the top holds the page design; leave it alone unless you are restyling.
5. Save, then check campuslife.escp.eu/ldnrealestate/home/ in a private window.

Before saving, copy the full source into a text file as a backup. CampusGroups keeps no version history that we have found.

## Change log

- 31 Oct 2026: hero line changed to "A selective ESCP student society researching private markets, hedge funds and alternative investments." The "For ESCP students" section now states recruitment timing, stages and the 1 to 4 percent offer rate, and links to escpais.com/about#join. Mirrors PR #12.
