import { Link, useParams } from "react-router-dom";
import Tag from "../components/ui/Tag";
import NotFoundPage from "./NotFoundPage";
import { trackGoal } from "../lib/analytics.js";
import { divisionFor, eduNumbers, findPublication, libraries, publicationPath, textPath } from "../lib/publications.js";
import { usePublicationText } from "../lib/publicationText.js";

const MORE_COUNT = 3;

function Byline({ item, library, author }) {
  const division = divisionFor(item);
  const team = division ? `the ${division.name} team` : "the AIS team";
  if (library === "founderReports") return <>By the ESCP Alternative Investment Society</>;
  return author ? <>By {author}, {team}</> : <>By {team} of the ESCP Alternative Investment Society</>;
}

function TextVersion({ state, item }) {
  const pages = state.data?.pages?.filter((page) => page.length > 0) ? state.data.pages : null;
  if (!pages) {
    return state.failed ? (
      <p className="text-ais-gray">
        The text version is not available yet. <a href={item.pdfPath} className="text-ais-ocean underline">Read the PDF</a>.
      </p>
    ) : (
      <p className="text-ais-gray">Loading the text version…</p>
    );
  }
  return (
    <div className="space-y-6">
      {pages.map((paragraphs, index) => paragraphs.length > 0 && (
        <section key={index} aria-label={`Page ${index + 1}`} className="border-l-2 border-ais-silver/40 pl-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ais-gray mb-2">Page {index + 1}</p>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-ais-navy/80 leading-relaxed mb-2 break-words">{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default function PublicationPage({ library: libraryKey }) {
  const { id } = useParams();
  const library = libraries[libraryKey];
  const item = findPublication(libraryKey, id);
  const state = usePublicationText(textPath(libraryKey, id));

  if (!item) return <NotFoundPage />;

  const division = divisionFor(item);
  const author = state.data?.author || "";
  const number = libraryKey === "presentations" ? `Edu #${eduNumbers.get(item.id)}` : libraryKey === "newsletters" && item.issue ? `Issue #${item.issue}` : null;
  const more = library.items
    .filter((other) => other.id !== item.id && (libraryKey === "founderReports" || other.department === item.department))
    .slice(0, MORE_COUNT);

  return (
    <article className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-ais-gray mb-8">
          <ol className="flex flex-wrap gap-2">
            <li><Link to="/" className="hover:text-ais-ocean">Home</Link> /</li>
            <li><Link to={library.route} className="hover:text-ais-ocean">{library.listLabel}</Link> /</li>
            <li aria-current="page" className="text-ais-navy">{item.title}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm text-ais-gray">
            {division && <Tag label={division.name} type={item.department} />}
            <span>{library.kindLabel}</span>
            {number && <span>&middot; {number}</span>}
            {item.date && <span>&middot; <time dateTime={item.date}>{item.date}</time></span>}
            {item.pageCount > 0 && <span>&middot; {item.pageCount} pages</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ais-navy mb-4">{item.title}</h1>
          <p className="text-ais-gray mb-4"><Byline item={item} library={libraryKey} author={author} /></p>
          {item.description && <p className="text-lg text-ais-navy/80 leading-relaxed mb-6">{item.description}</p>}
          <div className="flex flex-wrap gap-3">
            <a href={item.pdfPath} className="px-5 py-2.5 bg-ais-ocean text-white text-sm font-semibold rounded hover:bg-ais-ocean/80 transition-colors">
              Read the PDF
            </a>
            <a
              href={item.downloadPath || item.pdfPath}
              download
              onClick={() => trackGoal("publication_download", { publication_type: library.goalType, publication_id: item.id })}
              className="px-5 py-2.5 border border-ais-ocean text-ais-ocean text-sm font-semibold rounded hover:bg-ais-ocean hover:text-white transition-colors"
            >
              Download
            </a>
          </div>
        </header>

        <section aria-labelledby="text-version" className="border-t border-ais-silver/40 pt-10">
          <h2 id="text-version" className="text-2xl font-bold text-ais-navy mb-2">Text version</h2>
          <p className="text-sm text-ais-gray mb-8">
            Extracted from the PDF. Charts, tables and images are only in the PDF.
          </p>
          <TextVersion state={state} item={item} />
        </section>

        {more.length > 0 && (
          <section aria-labelledby="more" className="border-t border-ais-silver/40 pt-10 mt-12">
            <h2 id="more" className="text-xl font-bold text-ais-navy mb-4">
              More {division && libraryKey !== "founderReports" ? `from ${division.name}` : library.pluralLabel}
            </h2>
            <ul className="space-y-2">
              {more.map((other) => (
                <li key={other.id}>
                  <Link to={publicationPath(libraryKey, other.id)} className="text-ais-ocean hover:underline font-semibold">{other.title}</Link>
                  {other.date && <span className="text-sm text-ais-gray"> &middot; {other.date}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-6"><Link to={library.route} className="text-sm text-ais-ocean hover:underline">All {library.pluralLabel}</Link></p>
          </section>
        )}
      </div>
    </article>
  );
}
