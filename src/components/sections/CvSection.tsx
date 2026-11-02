import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/content/projects";
import { copy, person, t } from "@/content/site";

export default function CvSection({ locale }: { locale: Locale }) {
  const href = t(person.cv, locale);
  const exists = fs.existsSync(path.join(process.cwd(), "public", href));
  return (
    <section className="cv" id="cv" aria-labelledby="cv-title">
      <div className="cv__ring" aria-hidden="true" />
      <h2 id="cv-title" className="cv__title reveal">{t(copy.cv.title, locale)}</h2>
      {exists ? (
        <>
          <p className="cv__body reveal">{t(copy.cv.body, locale)}</p>
          <a className="cv__btn" href={href} download data-magnetic="0.35" data-cursor="PDF">{locale === "tr" ? "CV indir" : "Download CV"}</a>
        </>
      ) : (
        <p className="cv__body reveal">{t(copy.cv.soon, locale)}</p>
      )}
    </section>
  );
}
