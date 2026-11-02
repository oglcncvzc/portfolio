import type { Locale } from "@/content/projects";
import { kindLabel, projects } from "@/content/projects";
import { copy, t } from "@/content/site";
import ProjectVisual from "@/components/mocks/ProjectVisual";
import Split from "./Split";

const Arrow = () => (<svg viewBox="0 0 16 16" aria-hidden="true" className="arrow"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>);

export default function Work({ locale }: { locale: Locale }) {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <header className="work__head">
        <div>
          <Split as="h2" text={t(copy.work.title, locale)} className="work__title" />
          <p className="work__sub reveal">{t(copy.work.sub, locale)}</p>
        </div>
        <p className="work__note reveal">{t(copy.work.note, locale)}</p>
      </header>
      <div className="work__stack">
        {projects.map((p) => (
          <article className={`proj proj--${p.kind}`} key={p.id} id={`p-${p.id}`} aria-labelledby={`t-${p.id}`}>
            <div className="proj__card">
              <div className="proj__info">
                <div className="proj__meta">
                  <span className="proj__index tabular">{p.index}</span>
                  <span className={`proj__kind proj__kind--${p.kind}`}>{t(kindLabel[p.kind], locale)}</span>
                  <span className="proj__year tabular">{p.year}</span>
                </div>
                <h3 id={`t-${p.id}`} className="proj__title"><Split text={p.title} /></h3>
                <p className="proj__tag">{t(p.tagline, locale)}</p>
                <p className="proj__sum">{t(p.summary, locale)}</p>
                <ul className="proj__hl">
                  {p.highlights[locale].slice(0, 3).map((h) => (<li key={h}>{h}</li>))}
                </ul>
                <ul className="proj__stack" aria-label="Stack">
                  {[...(p.ai ?? []), ...p.stack].slice(0, 8).map((s) => (<li key={s} className={p.ai?.includes(s) ? "is-ai" : ""}>{s}</li>))}
                </ul>
                {p.live && (
                  <div className="proj__links">
                    <a href={p.live} target="_blank" rel="noreferrer" data-cursor={t(copy.work.live, locale)}>{t(copy.work.live, locale)} <Arrow /></a>
                  </div>
                )}
              </div>
              <div className="proj__lens">
                <div className="proj__visual">
                  <ProjectVisual id={p.id} label={`${p.title} — ${t(p.tagline, locale)}`} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
