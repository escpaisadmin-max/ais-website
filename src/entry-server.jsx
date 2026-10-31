// Build time prerender: renders each public route to HTML so crawlers that do not
// run JavaScript (most AI assistants, link previews) still see the page content.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App.jsx";
import { PublicationTextContext } from "./lib/publicationText.js";

export function render(url, { publicationText = null } = {}) {
  return renderToString(
    <StrictMode>
      <PublicationTextContext.Provider value={publicationText}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </PublicationTextContext.Provider>
    </StrictMode>,
  );
}
