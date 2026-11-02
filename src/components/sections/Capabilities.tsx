import type { Locale } from "@/content/projects";
import { copy, t } from "@/content/site";
import Split from "./Split";

export default function Capabilities({ locale }: { locale: Locale }) {
  return (
    <section className="caps" id="capabilities" aria-labelledby="caps-title">
      <Split as="h2" text={t(copy.capabilities.title, locale)} className="caps__title" />
      <ol className="caps__list">
        {copy.capabilities.items.map((c, i) => (
          <li className="caps__row reveal" key={i} tabIndex={0}>
            <span className="caps__n tabular">{String(i + 1).padStart(2, "0")}</span>
            <span className="caps__k">{t(c.k, locale)}</span>
            <span className="caps__v">{t(c.v, locale)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
