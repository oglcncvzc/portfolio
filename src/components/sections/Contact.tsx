import type { Locale } from "@/content/projects";
import { copy, mailto, person, t } from "@/content/site";
import Split from "./Split";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/Social";

export default function Contact({ locale }: { locale: Locale }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Split as="h2" text={t(copy.contact.title, locale)} className="contact__title" />
      <p className="contact__body reveal">{t(copy.contact.body, locale)}</p>
      <a className="contact__btn" href={mailto(locale)} data-magnetic="0.45">
        <span>{t(copy.cta.talk, locale)}</span>
      </a>
      <ul className="social reveal" aria-label={locale === "tr" ? "Bağlantılar" : "Links"}>
        <li>
          <a href={mailto(locale)} className="social__item" data-magnetic="0.15">
            <span className="social__ico"><MailIcon /></span>
            <span className="social__txt"><small>{locale === "tr" ? "E-posta" : "Email"}</small><b>{person.email}</b></span>
            <ArrowUpRight />
          </a>
        </li>
        <li>
          <a href={person.linkedin} target="_blank" rel="noreferrer" className="social__item" data-magnetic="0.15">
            <span className="social__ico"><LinkedInIcon /></span>
            <span className="social__txt"><small>LinkedIn</small><b>Oğulcan Cevizci</b></span>
            <ArrowUpRight />
          </a>
        </li>
        <li>
          <a href={person.github} target="_blank" rel="noreferrer" className="social__item" data-magnetic="0.15">
            <span className="social__ico"><GitHubIcon /></span>
            <span className="social__txt"><small>GitHub</small><b>oglcncvzc</b></span>
            <ArrowUpRight />
          </a>
        </li>
      </ul>
      <footer className="foot">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span>{t(copy.footer, locale)}</span>
        <span><a href="/tr" hrefLang="tr">TR</a> / <a href="/en" hrefLang="en">EN</a></span>
      </footer>
    </section>
  );
}
