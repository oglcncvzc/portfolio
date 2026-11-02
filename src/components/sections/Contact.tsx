import type { Locale } from "@/content/projects";
import { copy, person, t } from "@/content/site";
import Split from "./Split";

export default function Contact({ locale }: { locale: Locale }) {
  const href = person.email ? `mailto:${person.email}` : person.linkedin || person.github;
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Split as="h2" text={t(copy.contact.title, locale)} className="contact__title" />
      <p className="contact__body reveal">{t(copy.contact.body, locale)}</p>
      <a className="contact__btn" href={href} data-magnetic="0.45" target={person.email ? undefined : "_blank"} rel="noreferrer">
        <span>{t(copy.cta.talk, locale)}</span>
      </a>
      <ul className="contact__links reveal">
        {person.email && <li><a href={`mailto:${person.email}`}>{person.email}</a></li>}
        {person.linkedin && <li><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}
        <li><a href={person.github} target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
      <footer className="foot">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span>{t(copy.footer, locale)}</span>
        <span><a href="/tr" hrefLang="tr">TR</a> / <a href="/en" hrefLang="en">EN</a></span>
      </footer>
    </section>
  );
}
