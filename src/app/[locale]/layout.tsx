import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { locales } from "@/content/site";
import type { Locale } from "@/content/projects";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const meta: Record<Locale, { title: string; description: string }> = {
  tr: {
    title: "Oğulcan Cevizci — Full-Stack & AI Engineer",
    description: "Web ürünlerini ve yapay zekâ sistemlerini uçtan uca inşa eden full-stack ve AI mühendisi. Seçili işler, yetenekler ve iletişim.",
  },
  en: {
    title: "Oğulcan Cevizci — Full-Stack & AI Engineer",
    description: "Full-stack and AI engineer building web products and AI systems end to end. Selected work, capabilities and contact.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[(locale as Locale) in meta ? (locale as Locale) : "tr"];
  return {
    title: m.title,
    description: m.description,
    alternates: { languages: { tr: "/tr", en: "/en" } },
    openGraph: { title: m.title, description: m.description, type: "website" },
    icons: { icon: "/favicon.svg" },
  };
}

export const viewport: Viewport = { themeColor: "#0b0b0b", width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
