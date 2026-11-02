import type { Locale } from "@/content/projects";
import { copy, person, t } from "@/content/site";

export default function About({ locale }: { locale: Locale }) {
  const body = t(copy.about.body, locale);
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="about__title reveal">{t(copy.about.title, locale)}</h2>
      <p className="about__body" aria-label={body}>
        {body.split(" ").map((w, i) => (<span key={i} aria-hidden="true" className="about__w">{w} </span>))}
      </p>
      <a className="about__gh reveal" href={person.github} target="_blank" rel="noreferrer" data-magnetic="0.25">github.com/oglcncvzc</a>
    </section>
  );
}
