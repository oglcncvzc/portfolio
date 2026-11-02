import Image from "next/image";
import type { Locale } from "@/content/projects";
import { projects } from "@/content/projects";
import { copy, mailto, person, t } from "@/content/site";
import RingLens from "@/components/ink/RingLens";
import Vein from "@/components/ink/Vein";
import CoachMock from "@/components/mocks/CoachMock";
import FramelyMock from "@/components/mocks/FramelyMock";
import HeroMotion from "./HeroMotion";
import "./hero.css";

export default function Hero({ locale }: { locale: Locale }) {
  const [p1, p2] = projects;
  const other: Locale = locale === "tr" ? "en" : "tr";
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="hero__marble" aria-hidden="true">
        <Image src="/plates/bg-marble.png" alt="" fill priority sizes="100vw" />
      </div>

      <nav className="hero__nav r" aria-label={locale === "tr" ? "Ana menü" : "Main menu"}>
        <a href="#work">{t(copy.nav.work, locale)}</a><span aria-hidden="true">·</span>
        <a href="#about">{t(copy.nav.about, locale)}</a><span aria-hidden="true">·</span>
        <a href="#cv">{t(copy.nav.cv, locale)}</a><span aria-hidden="true">·</span>
        <a href="#contact">{t(copy.nav.contact, locale)}</a>
        <span className="hero__nav-rule" aria-hidden="true" />
        <span className="hero__lang">
          <a href="/tr" aria-current={locale === "tr" ? "true" : undefined} hrefLang="tr" lang="tr">TR</a>
          <span aria-hidden="true"> / </span>
          <a href="/en" aria-current={locale === "en" ? "true" : undefined} hrefLang="en" lang="en">EN</a>
          <span className="sr-only">{other === "en" ? "Switch to English" : "Türkçeye geç"}</span>
        </span>
      </nav>

      <h1 id="hero-name" className="sr-only">{person.name} — {t(person.title, locale)}</h1>

      <div className="hero__screen r" aria-hidden="false">
        <CoachMock />
      </div>
      <RingLens className="hero__ring r" />

      <div className="hero__name hero__name--gulcan r" aria-hidden="true">
        <Image src="/plates/name-gulcan.png" alt="" width={3168} height={774} priority />
      </div>
      <div className="hero__name hero__name--cevizci r" aria-hidden="true">
        <Image src="/plates/name-cevizci.png" alt="" width={3168} height={766} priority />
      </div>

      <Vein className="hero__vein r" />

      <p className="hero__caption hero__caption--01 r">
        {p1.index} — {p1.title} — {t(p1.tagline, locale).toLowerCase()}
      </p>
      <p className="hero__tagline r" aria-hidden="true">{t(person.title, locale)}</p>

      <div className="hero__ctas r">
        <a className="hero__cta hero__cta--talk" href={mailto(locale)} data-magnetic="0.3">{t(copy.cta.talk, locale)}</a>
        <a className="hero__cta hero__cta--cv" href="#cv" data-magnetic="0.3">{t(copy.cta.cv, locale)}</a>
      </div>

      <p className="hero__caption hero__caption--02 r">
        {p2.index} — {p2.title} — {t(p2.tagline, locale)}
      </p>
      <div className="hero__framely r">
        <FramelyMock label={`${p2.title}: ${t(p2.tagline, locale)} (demo)`} />
      </div>
      <HeroMotion />
    </section>
  );
}
