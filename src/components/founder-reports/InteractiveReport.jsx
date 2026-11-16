// Web edition of a Founder Report: the PDF rebuilt as a readable, searchable page.
// Everything renders in the prerendered HTML (filters default to "all", interviews sit in
// <details>), so search engines and AI assistants read the full report.
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { trackGoal } from "../../lib/analytics.js";
import { publicationPath } from "../../lib/publications.js";

const money = (m) => (m >= 1 ? `$${m.toFixed(1)}M` : `$${Math.round(m * 1000)}K`);
const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const SECTIONS = [
  ["snapshot", "Snapshot"],
  ["rounds", "Funding rounds"],
  ["exit", "Hugging Face exit"],
  ["interviews", "Interviews"],
  ["y-combinator", "Y Combinator"],
  ["unicorns", "Unicorns"],
  ["methodology", "Methodology"],
];

function Section({ id, eyebrow, title, intro, children, tint = false }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 py-16 ${tint ? "bg-ais-ice/40" : ""}`}>
      <div className="max-w-6xl mx-auto px-6">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ais-slate mb-3">{eyebrow}</p>}
        <h2 id={`${id}-title`} className="text-3xl md:text-4xl font-bold text-ais-navy mb-4">{title}</h2>
        {intro && <p className="text-lg text-ais-navy/75 max-w-3xl leading-relaxed mb-10">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${active ? "bg-ais-navy text-white border-ais-navy" : "bg-white text-ais-navy border-ais-silver hover:border-ais-navy"}`}
    >
      {children}
    </button>
  );
}

function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0][0]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return (
    <nav aria-label="In this report" className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-ais-silver/60">
      <ol className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto no-scrollbar">
        {SECTIONS.map(([id, label]) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className={`block px-3 py-3 text-sm border-b-2 transition-colors ${active === id ? "border-ais-navy text-ais-navy font-semibold" : "border-transparent text-ais-gray hover:text-ais-navy"}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function RoundCard({ r }) {
  const [open, setOpen] = useState(false);
  const shown = open ? r.investors : r.investors.slice(0, 4);
  return (
    <article id={`startup-${slug(r.company)}`} className="bg-white border border-ais-silver/70 rounded-lg p-6 flex flex-col">
      <header className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-xl font-bold text-ais-navy">{r.company}</h3>
          <p className="text-sm text-ais-gray">{r.hq} &middot; founded {r.founded}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-ais-navy leading-none">{money(r.amount)}</p>
          <p className="text-xs uppercase tracking-wider text-ais-slate mt-1">{r.stage}</p>
        </div>
      </header>
      <p className="text-ais-navy/80 leading-relaxed mb-4">{r.description}</p>
      <dl className="text-sm space-y-2 mt-auto">
        <div>
          <dt className="inline font-semibold text-ais-navy">ESCP founder: </dt>
          <dd className="inline text-ais-navy/80">{r.escpFounder} ({r.program})</dd>
        </div>
        {r.cofounders.length > 0 && (
          <div>
            <dt className="inline font-semibold text-ais-navy">Co-founders: </dt>
            <dd className="inline text-ais-navy/80">{r.cofounders.join(", ")}</dd>
          </div>
        )}
        <div>
          <dt className="font-semibold text-ais-navy mb-1.5">Investors</dt>
          <dd className="flex flex-wrap gap-1.5">
            {r.investors.length === 0 && <span className="text-ais-gray">Not disclosed</span>}
            {shown.map((inv) => <span key={inv} className="px-2 py-0.5 rounded bg-ais-ice/70 text-ais-navy text-xs">{inv}</span>)}
            {r.investors.length > 4 && (
              <button type="button" onClick={() => setOpen(!open)} className="px-2 py-0.5 text-xs text-ais-navy underline">
                {open ? "Show fewer" : `+${r.investors.length - 4} more`}
              </button>
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function Snapshot({ data, country, setCountry }) {
  const max = Math.max(...data.byCountry.map((c) => c.amount));
  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
      <div>
        <p className="text-2xl md:text-3xl leading-snug text-ais-navy">{data.headline}</p>
        <p className="text-sm text-ais-gray mt-4">Select a country to filter the funding rounds below.</p>
      </div>
      <figure>
        <figcaption className="sr-only">Capital raised by ESCP alumni startups in Q3 2026, by country</figcaption>
        <ul className="space-y-2">
          {data.byCountry.map((c) => (
            <li key={c.country}>
              <a
                href="#rounds"
                onClick={() => setCountry(c.country)}
                aria-current={country === c.country ? "true" : undefined}
                className={`grid grid-cols-[90px_1fr_70px] items-center gap-3 rounded px-2 py-1.5 hover:bg-ais-ice/60 ${country === c.country ? "bg-ais-ice" : ""}`}
              >
                <span className="text-sm text-ais-navy">{c.country}</span>
                <span className="h-6 bg-ais-ice rounded-sm overflow-hidden">
                  <span className="block h-full bg-ais-navy rounded-sm" style={{ width: `${Math.max(1.5, (c.amount / max) * 100)}%` }} />
                </span>
                <span className="text-sm font-semibold text-ais-navy text-right">
                  {money(c.amount)}
                  <span className="block text-[11px] font-normal text-ais-gray">{c.rounds} {c.rounds === 1 ? "round" : "rounds"}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}

function Rounds({ rounds, country, setCountry }) {
  const [stage, setStage] = useState("All");
  const [sort, setSort] = useState("amount");
  const stages = ["All", "Pre-Seed", "Seed", "Series A", "Venture Round"];
  const countries = ["All", ...Array.from(new Set(rounds.map((r) => r.country)))];
  const list = useMemo(() => rounds
    .filter((r) => country === "All" || r.country === country)
    .filter((r) => stage === "All" || r.stage.startsWith(stage))
    .sort((a, b) => (sort === "amount" ? b.amount - a.amount : a.n - b.n)), [rounds, country, stage, sort]);
  const total = list.reduce((s, r) => s + r.amount, 0);
  return (
    <>
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-ais-gray w-20">Country</span>
          {countries.map((c) => <Chip key={c} active={country === c} onClick={() => setCountry(c)}>{c}</Chip>)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-ais-gray w-20">Stage</span>
          {stages.map((s) => <Chip key={s} active={stage === s} onClick={() => setStage(s)}>{s}</Chip>)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-ais-gray w-20">Sort</span>
          <Chip active={sort === "amount"} onClick={() => setSort("amount")}>Largest first</Chip>
          <Chip active={sort === "report"} onClick={() => setSort("report")}>Report order</Chip>
        </div>
      </div>
      <p className="text-sm text-ais-gray mb-4" aria-live="polite">
        {list.length} {list.length === 1 ? "round" : "rounds"}, {money(total)} in total
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {list.map((r) => <RoundCard key={r.company} r={r} />)}
      </div>
    </>
  );
}

function Spotlight({ s }) {
  const max = Math.max(...s.valuation.map((v) => v[1]));
  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <div>
          <p className="text-xl text-ais-navy leading-relaxed mb-6">{s.intro}</p>
          {s.what.map((p) => <p key={p.slice(0, 20)} className="text-ais-navy/80 leading-relaxed mb-4">{p}</p>)}
        </div>
        <div className="bg-ais-navy text-white rounded-lg p-6 self-start">
          <dl className="grid grid-cols-3 gap-4 mb-6">
            {s.facts.map(([k, v]) => (
              <div key={k}><dt className="text-xs uppercase tracking-wider text-ais-periwinkle">{k}</dt><dd className="text-xl font-bold mt-1">{v}</dd></div>
            ))}
          </dl>
          <p className="text-xs uppercase tracking-wider text-ais-periwinkle mb-2">Why is Hugging Face worth nearly $13bn?</p>
          <dl className="grid grid-cols-2 gap-4 mb-6">
            {s.scale.map(([v, k]) => <div key={k}><dd className="text-2xl font-bold">{v}</dd><dt className="text-sm text-ais-silver">{k}</dt></div>)}
          </dl>
          <p className="text-xs uppercase tracking-wider text-ais-periwinkle mb-2">Series D investors</p>
          <p className="text-sm text-ais-silver">{s.seriesDInvestors.join(", ")}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-ais-navy mb-2">The pivot</h3>
        <p className="text-ais-navy/80 leading-relaxed max-w-3xl mb-8">{s.pivot}</p>
        <ol className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {s.timeline.map(([year, title, text]) => (
            <li key={year} className="border-t-4 border-ais-navy pt-3">
              <p className="text-2xl font-bold text-ais-navy">{year}</p>
              <p className="font-semibold text-ais-navy">{title}</p>
              <p className="text-sm text-ais-gray">{text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <figure>
          <h3 className="text-xl font-bold text-ais-navy mb-4">From $4.5B to $12.9B</h3>
          <div className="flex items-end gap-8 h-56">
            {s.valuation.map(([label, v]) => (
              <div key={label} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="font-bold text-ais-navy mb-1">${v}B</span>
                <span className="w-full bg-ais-navy rounded-t" style={{ height: `${(v / max) * 100}%` }} />
                <span className="text-sm text-ais-gray mt-2 text-center">{label}</span>
              </div>
            ))}
          </div>
          <figcaption className="text-sm text-ais-gray mt-3">{s.multiple} from the Series D valuation to the NVIDIA deal.</figcaption>
        </figure>
        <div>
          <h3 className="text-xl font-bold text-ais-navy mb-4">The business model</h3>
          <div className="grid grid-cols-2 gap-4">
            {[["Open & free", s.model.open], ["Paid", s.model.paid]].map(([title, items]) => (
              <div key={title} className="border border-ais-silver/70 rounded-lg p-4">
                <p className="font-semibold text-ais-navy mb-2">{title}</p>
                <ul className="text-sm text-ais-navy/80 space-y-1">{items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-ais-navy mb-4">Why would NVIDIA want Hugging Face?</h3>
        <ol className="grid md:grid-cols-3 gap-4">
          {s.why.map(([t, d], i) => (
            <li key={t} className="bg-white border border-ais-silver/70 rounded-lg p-5">
              <p className="text-sm font-bold text-ais-slate">{i + 1}</p>
              <p className="font-semibold text-ais-navy mb-1">{t}</p>
              <p className="text-sm text-ais-navy/80">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 border-l-4 border-ais-navy pl-4 text-ais-navy italic max-w-3xl"><strong className="not-italic">The open question:</strong> {s.question}</p>
      </div>
    </div>
  );
}

function QA({ item }) {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-ais-navy mb-3 leading-snug">{item.q}</h4>
      {item.a.map((p) => <p key={p.slice(0, 24)} className="text-ais-navy/85 leading-relaxed mb-3">{p}</p>)}
    </div>
  );
}

function Interview({ iv }) {
  const [first, ...rest] = iv.qa;
  return (
    <article id={iv.id} className="scroll-mt-32 bg-white border border-ais-silver/70 rounded-lg overflow-hidden">
      <header className="flex flex-col sm:flex-row gap-5 p-6 md:p-8 bg-ais-navy text-white">
        <img src={iv.photo} alt={iv.name} width="96" height="96" loading="lazy" className="w-24 h-24 rounded-lg object-cover shrink-0" />
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ais-periwinkle mb-1">{iv.label}</p>
          <h3 className="text-2xl font-bold">Interview with {iv.name}</h3>
          <p className="text-ais-silver">{iv.role} ({iv.escp})</p>
          <blockquote className="mt-4 text-lg italic text-white/95">“{iv.quote}”</blockquote>
        </div>
      </header>
      <div className="p-6 md:p-8 max-w-3xl">
        <QA item={first} />
        <details className="group">
          <summary className="cursor-pointer list-none inline-flex items-center gap-2 px-4 py-2 border border-ais-navy text-ais-navy text-sm font-semibold rounded hover:bg-ais-navy hover:text-white transition-colors [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Read the full interview ({rest.length} more questions)</span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>
          <div className="mt-8">
            {rest.map((item) => <QA key={item.q} item={item} />)}
            {iv.quickfire.length > 0 && (
              <div className="bg-ais-ice/50 rounded-lg p-5">
                <p className="font-bold text-ais-navy mb-3">Quick-fire round</p>
                <dl className="space-y-3">
                  {iv.quickfire.map((item) => (
                    <div key={item.q}>
                      <dt className="font-semibold text-ais-navy">{item.q}</dt>
                      <dd className="text-ais-navy/85">{item.a.join(" ")}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {iv.closing && <p className="mt-6 italic text-ais-gray">{iv.closing}</p>}
          </div>
        </details>
      </div>
    </article>
  );
}

function Unicorns({ rows }) {
  const [sort, setSort] = useState("rank");
  const list = useMemo(() => rows.map((r, i) => ({ r, rank: i + 1 })).sort((a, b) => (sort === "year" ? a.r[4] - b.r[4] : a.rank - b.rank)), [rows, sort]);
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Chip active={sort === "rank"} onClick={() => setSort("rank")}>Report order</Chip>
        <Chip active={sort === "year"} onClick={() => setSort("year")}>By ESCP graduation year</Chip>
      </div>
      <div className="overflow-x-auto border border-ais-silver/70 rounded-lg bg-white">
        <table className="w-full text-sm">
          <caption className="sr-only">ESCP-linked unicorns, with headquarters and ESCP founder</caption>
          <thead className="bg-ais-ice/60 text-left text-ais-navy">
            <tr><th className="p-3">#</th><th className="p-3">Company</th><th className="p-3">HQ</th><th className="p-3">ESCP founder</th><th className="p-3">Programme</th></tr>
          </thead>
          <tbody>
            {list.map(({ r, rank }) => (
              <tr key={r[0]} className="border-t border-ais-silver/50">
                <td className="p-3 text-ais-gray">{rank}</td>
                <th scope="row" className="p-3 text-left font-semibold text-ais-navy">{r[0]}</th>
                <td className="p-3 text-ais-navy/80">{r[1]}</td>
                <td className="p-3 text-ais-navy/80">{r[2]}</td>
                <td className="p-3 text-ais-navy/80">{r[3]}, {r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function InteractiveReport({ item, data, library, more }) {
  const [country, setCountry] = useState("All");
  const total = data.rounds.reduce((s, r) => s + r.amount, 0);
  const largest = data.rounds.reduce((a, b) => (b.amount > a.amount ? b : a));
  const download = () => trackGoal("publication_download", { publication_type: library.goalType, publication_id: item.id });
  const investors = data.interviews.filter((i) => i.section === "investor");
  const operators = data.interviews.filter((i) => i.section === "operator");

  return (
    <article className="bg-white min-h-screen">
      <header className="bg-ais-navy text-white pt-12 md:pt-28 pb-14">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-ais-periwinkle mb-6">
              <ol className="flex flex-wrap gap-2">
                <li><Link to="/" className="hover:text-white">Home</Link> /</li>
                <li><Link to={library.route} className="hover:text-white">{library.listLabel}</Link> /</li>
                <li aria-current="page" className="text-white">{data.edition}</li>
              </ol>
            </nav>
            <p className="text-xs uppercase tracking-[0.18em] text-ais-periwinkle mb-3">
              Founder Report &middot; <time dateTime={item.date}>{item.date}</time> &middot; {item.pageCount} pages
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">ESCP Founder Report {data.edition}</h1>
            <p className="text-base md:text-lg text-ais-silver leading-relaxed mb-3">
              Funding raised by ESCP alumni startups this quarter, Hugging Face's exit to NVIDIA, and interviews with investors at Redstone and Project A, the co-founder of IMPACT Drones and ESCP professor Gunnar Graef.
            </p>
            <p className="text-sm text-ais-periwinkle mb-8">By the ESCP Alternative Investment Society, with institutional support from ESCP Blue Factory and ESCP Business School</p>
            <div className="flex flex-wrap gap-3">
              <a href={item.pdfPath} className="px-5 py-2.5 bg-white text-ais-navy text-sm font-semibold rounded hover:bg-ais-ice transition-colors">Read the PDF</a>
              <a href={item.downloadPath || item.pdfPath} download onClick={download} className="px-5 py-2.5 border border-white text-white text-sm font-semibold rounded hover:bg-white hover:text-ais-navy transition-colors">Download</a>
            </div>
          </div>
          <a href={item.pdfPath} className="hidden lg:block justify-self-center">
            <img src="/founder-reports/q3-2026/cover.webp" alt={`Cover of the ESCP Founder Report ${data.edition}`} width="360" height="540" className="w-72 rounded shadow-2xl rotate-1 hover:rotate-0 transition-transform" />
          </a>
        </div>
        <dl className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/15 pt-8">
          {[
            [`$${Math.floor(total)}M+`, "raised by ESCP alumni startups"],
            [String(data.rounds.length), "funding rounds"],
            [String(data.byCountry.length), "countries"],
            [money(largest.amount), `largest round (${largest.company})`],
          ].map(([v, k]) => (
            <div key={k}><dd className="text-3xl md:text-4xl font-bold">{v}</dd><dt className="text-sm text-ais-periwinkle mt-1">{k}</dt></div>
          ))}
        </dl>
      </header>

      <SectionNav />

      <Section id="snapshot" eyebrow="Q3 2026 snapshot" title="Where ESCP alumni raised this quarter">
        <Snapshot data={data} country={country} setCountry={setCountry} />
        <div className="mt-14">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ais-slate mb-4">The ESCP startup ecosystem</h3>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {data.ecosystem.map(([v, k]) => <div key={k}><dd className="text-2xl font-bold text-ais-navy">{v}</dd><dt className="text-sm text-ais-gray">{k}</dt></div>)}
          </dl>
        </div>
      </Section>

      <Section id="rounds" eyebrow="Funding in Q3 2026" title="13 rounds raised by ESCP alumni founders" tint
        intro="Every round closed by a startup with at least one ESCP founder this quarter, from pre-seed to Series A.">
        <Rounds rounds={data.rounds} country={country} setCountry={setCountry} />
      </Section>

      <Section id="exit" eyebrow="Alumni exit spotlight" title={data.spotlight.title}>
        <Spotlight s={data.spotlight} />
      </Section>

      <Section id="interviews" eyebrow="Investor and operator insights" title="Interviews" tint
        intro="Two early stage investors, a founder fresh out of Y Combinator and an ESCP professor who has built companies for 25 years.">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {data.interviews.map((iv) => (
            <li key={iv.id}>
              <a href={`#${iv.id}`} className="block h-full bg-white border border-ais-silver/70 rounded-lg p-4 hover:border-ais-navy transition-colors">
                <img src={iv.photo} alt="" width="56" height="56" loading="lazy" className="w-14 h-14 rounded-lg object-cover mb-3" />
                <p className="font-bold text-ais-navy">{iv.name}</p>
                <p className="text-sm text-ais-gray">{iv.role}</p>
              </a>
            </li>
          ))}
        </ul>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ais-slate mb-4">Investor insights</h3>
        <div className="space-y-8 mb-14">{investors.map((iv) => <Interview key={iv.id} iv={iv} />)}</div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ais-slate mb-4">Operator insights</h3>
        <div className="space-y-8">{operators.map((iv) => <Interview key={iv.id} iv={iv} />)}</div>
      </Section>

      <Section id="y-combinator" eyebrow="Accelerators" title="ESCP startups that got into Y Combinator" intro={data.yc.intro}>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.yc.startups.map(([name, founder, hq, batch, sector]) => (
            <li key={name} className="border border-ais-silver/70 rounded-lg p-4">
              <p className="text-xs font-semibold text-ais-slate">{batch} &middot; {sector}</p>
              <p className="text-lg font-bold text-ais-navy">{name}</p>
              <p className="text-sm text-ais-navy/80">{founder}</p>
              <p className="text-sm text-ais-gray">{hq}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="unicorns" eyebrow="ESCP unicorns" title="14 unicorns with an ESCP founder" tint>
        <Unicorns rows={data.unicorns} />
      </Section>

      <Section id="methodology" eyebrow="About this report" title="Methodology">
        <div className="max-w-3xl space-y-4 text-ais-navy/80 leading-relaxed">
          {data.methodology.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <div>
            <h3 className="font-bold text-ais-navy mb-3">Authors</h3>
            <ul className="space-y-1 text-sm">{data.authors.map(([n, r]) => <li key={n}><span className="font-semibold text-ais-navy">{n}</span> <span className="text-ais-gray">&middot; {r}</span></li>)}</ul>
          </div>
          <div>
            <h3 className="font-bold text-ais-navy mb-3">With ESCP Blue Factory</h3>
            <ul className="space-y-1 text-sm">{data.partners.map(([n, r]) => <li key={n}><span className="font-semibold text-ais-navy">{n}</span> <span className="text-ais-gray">&middot; {r}</span></li>)}</ul>
          </div>
        </div>
      </Section>

      <section className="bg-ais-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-2xl font-bold">Read the full report</p>
            <p className="text-ais-silver">{item.pageCount} pages, with every chart and table as designed.</p>
          </div>
          <div className="flex gap-3">
            <a href={item.pdfPath} className="px-5 py-2.5 bg-white text-ais-navy text-sm font-semibold rounded hover:bg-ais-ice">Read the PDF</a>
            <a href={item.downloadPath || item.pdfPath} download onClick={download} className="px-5 py-2.5 border border-white text-sm font-semibold rounded hover:bg-white hover:text-ais-navy">Download</a>
          </div>
        </div>
        {more.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 mt-10 pt-8 border-t border-white/15">
            <p className="text-sm uppercase tracking-[0.18em] text-ais-periwinkle mb-3">More Founder Reports</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {more.map((o) => <li key={o.id}><Link to={publicationPath("founderReports", o.id)} className="hover:underline font-semibold">{o.title}</Link> <span className="text-ais-silver text-sm">&middot; {o.date}</span></li>)}
            </ul>
          </div>
        )}
      </section>
    </article>
  );
}
