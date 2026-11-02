import type { Locale } from "@/content/projects";
import { copy } from "@/content/site";

const Drop = () => (
  <svg className="marquee__drop" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="9" /><circle cx="20" cy="20" r="16" fill="none" strokeWidth="2.5" /></svg>
);

export default function Marquee({ locale }: { locale: Locale }) {
  const words = copy.marquee[locale];
  const row = (k: string) => (
    <div className="marquee__track" key={k}>
      {[0, 1].map((n) => (
        <span className="marquee__set" key={n} aria-hidden={n === 1 ? "true" : undefined}>
          {words.map((w) => (<span className="marquee__item" key={w}>{w}<Drop /></span>))}
        </span>
      ))}
    </div>
  );
  return (
    <section className="marquee" aria-label={words.join(", ")}>
      <div className="marquee__row" data-dir="-1">{row("a")}</div>
      <div className="marquee__row marquee__row--outline" data-dir="1">{row("b")}</div>
    </section>
  );
}
