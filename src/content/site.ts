import type { L10n, Locale } from "./projects";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

export const person = {
  name: "Oğulcan Cevizci",
  nameUpper: "OĞULCAN CEVİZCİ",
  title: { tr: "Full-Stack & AI Engineer", en: "Full-Stack & AI Engineer" } satisfies L10n,
  github: "https://github.com/oglcncvzc",
  email: "cevizciogulcan@gmail.com",
  linkedin: "https://www.linkedin.com/in/o%C4%9Fulcan-cevizci-937a99214",
  location: { tr: "", en: "" } satisfies L10n,
  /** Owner uploads the PDF later to public/cv/. */
  cv: { tr: "/cv/ogulcan-cevizci-cv-tr.pdf", en: "/cv/ogulcan-cevizci-cv-en.pdf" } satisfies L10n,
};

export const copy = {
  nav: {
    work: { tr: "İşler", en: "Work" },
    about: { tr: "Hakkımda", en: "About" },
    cv: { tr: "CV", en: "CV" },
    contact: { tr: "İletişim", en: "Contact" },
  },
  cta: {
    talk: { tr: "İletişime geç", en: "Let's talk" },
    cv: { tr: "CV", en: "CV" },
  },
  hero: {
    lead: {
      tr: "Web ürünlerini ve yapay zekâ sistemlerini uçtan uca inşa ediyorum: arayüzden backend'e, modelden canlı yayına.",
      en: "I build web products and AI systems end to end: from the interface to the backend, from the model to production.",
    },
    scroll: { tr: "Kaydır", en: "Scroll" },
  },
  marquee: {
    tr: ["Full-stack", "Yapay zekâ", "Gerçek zamanlı", "Ses ajanları", "Görsel & video üretimi", "Mobil", "Tasarım sistemleri"],
    en: ["Full-stack", "AI", "Real-time", "Voice agents", "Image & video generation", "Mobile", "Design systems"],
  },
  work: {
    title: { tr: "Projeler", en: "Projects" },
    sub: { tr: "Yapılan projelerden bazıları", en: "Some of the projects I've built" },
    note: {
      tr: "Kurumsal projeler internal olduğu için link yok; ekranlar anonim verilerle yeniden çizildi.",
      en: "Corporate projects are internal, so there are no links; their screens are redrawn with anonymised data.",
    },
    live: { tr: "Canlı", en: "Live" },
    code: { tr: "Kod", en: "Code" },
    private: { tr: "Private repo", en: "Private repo" },
    internal: { tr: "Internal", en: "Internal" },
  },
  capabilities: {
    title: { tr: "Neler yapabiliriz", en: "What we can build" },
    items: [
      {
        k: { tr: "Web ürünleri", en: "Web products" },
        v: {
          tr: "Next.js / React ile uçtan uca ürünler: tasarım sistemi, panel, rol ve yetki, ödeme, yönetim ekranları.",
          en: "End-to-end products in Next.js / React: design systems, dashboards, roles and permissions, admin surfaces.",
        },
      },
      {
        k: { tr: "AI görsel & video", en: "AI image & video" },
        v: {
          tr: "fal.ai, Nano Banana, FLUX, Kling ile ürün görseli, sahne ve video üretim hatları; maliyet ve kota kontrolüyle.",
          en: "Product imagery, scenes and video pipelines on fal.ai, Nano Banana, FLUX and Kling, with cost and quota control.",
        },
      },
      {
        k: { tr: "LLM özellikleri", en: "LLM features" },
        v: {
          tr: "OpenAI ve Gemini ile yapılandırılmış çıktı, akışlı sohbet, hafıza, araç çağırma ve değerlendirme.",
          en: "Structured output, streaming chat, memory, tool calling and evals with OpenAI and Gemini.",
        },
      },
      {
        k: { tr: "Ses ajanları", en: "Voice agents" },
        v: {
          tr: "Gemini Live ile gerçek zamanlı, kesilebilir, Türkçe konuşan sesli ve görüntülü asistanlar.",
          en: "Real-time, interruptible, Turkish-speaking voice and vision assistants on Gemini Live.",
        },
      },
      {
        k: { tr: "Gerçek zamanlı sistemler", en: "Real-time systems" },
        v: {
          tr: "WebSocket akışları, cron ve kazıyıcılar, Supabase / Postgres, RLS ve otomatik yedekleme.",
          en: "WebSocket streams, crons and scrapers, Supabase / Postgres, RLS and automated backups.",
        },
      },
      {
        k: { tr: "Mobil", en: "Mobile" },
        v: {
          tr: "Expo / React Native ile animasyonlu, AI destekli mobil uygulamalar.",
          en: "Animated, AI-powered mobile apps with Expo / React Native.",
        },
      },
    ],
  },
  about: {
    title: { tr: "Hakkımda", en: "About" },
    body: {
      tr: "Arayüzün ilk pikselinden modelin son token'ına kadar işi tek başına götürebilen bir mühendisim. Kurumsal AI platformlarının frontend'ini yönetiyor, kendi ürünlerimi canlıya alıyor ve küçük işletmeler için gerçekten kullanılan araçlar yapıyorum.",
      en: "I'm an engineer who can carry the work from the first pixel of the interface to the last token of the model. I lead frontends for enterprise AI platforms, ship my own products to production, and build tools that small businesses actually use.",
    },
  },
  contact: {
    title: { tr: "Bir sonraki proje seninki olsun.", en: "Let the next project be yours." },
    body: {
      tr: "Danışmanlık, ürün geliştirme ya da ekibine katılmam için yaz.",
      en: "Write for consulting, product development, or to have me join your team.",
    },
  },
  cv: {
    title: { tr: "CV", en: "CV" },
    body: { tr: "Güncel özgeçmişimi indir.", en: "Download my current résumé." },
    soon: { tr: "CV yakında burada.", en: "CV coming soon." },
  },
  toTop: { tr: "En yukarı çık", en: "Back to top" },
  footer: { tr: "Kodla, mürekkeple ve biraz da yapay zekâyla yapıldı.", en: "Made with code, ink and a little AI." },
} as const;

export const t = (v: L10n, l: Locale) => v[l];
