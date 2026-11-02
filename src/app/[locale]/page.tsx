import { notFound } from "next/navigation";
import Hero from "@/components/hero/Hero";
import InkStage from "@/components/ink/InkStage";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageMotion from "@/components/motion/PageMotion";
import Cursor from "@/components/motion/Cursor";
import Marquee from "@/components/sections/Marquee";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import About from "@/components/sections/About";
import CvSection from "@/components/sections/CvSection";
import Contact from "@/components/sections/Contact";
import type { Locale } from "@/content/projects";
import { locales } from "@/content/site";
import "@/components/sections/sections.css";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  return (
    <>
      <InkStage />
      <SmoothScroll />
      <main>
        <Hero locale={locale} />
        <Marquee locale={locale} />
        <Work locale={locale} />
        <Capabilities locale={locale} />
        <About locale={locale} />
        <CvSection locale={locale} />
        <Contact locale={locale} />
      </main>
      <div className="progress" aria-hidden="true"><i /></div>
      <Cursor />
      <PageMotion />
    </>
  );
}
