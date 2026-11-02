export type Locale = "tr" | "en";
export type L10n = Record<Locale, string>;
export type ProjectKind = "personal" | "client" | "corporate";

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: ProjectKind;
  year: number;
  live?: string;
  repo?: string;
  /** Private repo: shown without a code link. */
  privateRepo?: boolean;
  tagline: L10n;
  summary: L10n;
  highlights: Record<Locale, string[]>;
  stack: string[];
  ai?: string[];
};

export const kindLabel: Record<ProjectKind, L10n> = {
  personal: { tr: "Kişisel proje", en: "Personal project" },
  client: { tr: "Müşteri işi", en: "Client work" },
  corporate: { tr: "Kurumsal · internal", en: "Corporate · internal" },
};

export const projects: Project[] = [
  {
    id: "coach-panel",
    index: "01",
    title: "Coach Panel",
    kind: "personal",
    year: 2026,
    live: "https://coach-panel-oqpf.vercel.app",
    privateRepo: true,
    tagline: { tr: "Canlı voleybol maç istatistikleri", en: "Live volleyball match stats" },
    summary: {
      tr: "Bir kadın voleybol takımı için mobil öncelikli yönetim paneli. Koç her ralliyi maç sırasında telefondan girer; skor, rotasyon, side-out ve oyuncu istatistikleri kendiliğinden hesaplanır. Fikstür ve puan durumu her gün TVF'den otomatik çekilir.",
      en: "A mobile-first team panel for a women's volleyball team. The coach logs every rally live from a phone while score, rotation, side-outs and per-player stats compute themselves. Fixtures and standings sync from the federation's site every day.",
    },
    highlights: {
      tr: [
        "Setin olay kaydını baştan oynatarak skoru, rotasyonu ve servisi yeniden kuran 522 satırlık istatistik motoru; geri alma yalnızca bir yeniden oynatma.",
        "İki TVF kazıyıcı (cheerio + Livewire) ve günlük Vercel cron; sonuçlar yetkisi sınırlı SQL fonksiyonlarıyla yazılır.",
        "16 tablo, 21 RLS kuralı ve 4 rol: yönetim kurulu her şeyi görür, hiçbir şeyi düzenleyemez.",
        "Google Sheets içe aktarma, haftalık GitHub Actions yedeği, demo modu ve 312 satırlık kendi tasarım sistemi.",
      ],
      en: [
        "A 522-line stats engine that replays each set's event log to rebuild score, rotation and server, so undo is just a replay.",
        "Two federation scrapers (cheerio + Livewire) on a daily Vercel cron, writing through narrowly scoped SQL functions.",
        "16 tables, 21 RLS policies and 4 roles, including a board role that sees everything and edits nothing.",
        "Google Sheets import, weekly GitHub Actions backups, a demo mode and its own 312-line design system.",
      ],
    },
    stack: ["React", "Vite", "Supabase", "Postgres RLS", "Vercel Cron", "cheerio", "GitHub Actions"],
  },
  {
    id: "framely",
    index: "02",
    title: "Framely",
    kind: "corporate",
    year: 2026,
    tagline: { tr: "AI ürün görseli ve video stüdyosu", en: "AI product image & video studio" },
    summary: {
      tr: "Ürün SKU'larını fal.ai modelleriyle kataloğa hazır görsel ve videoya dönüştüren kurumsal platform. Her üretim çalışmadan önce token olarak fiyatlanır ve havuz → departman → kullanıcı kotasından onay ve denetim kaydıyla düşülür. Ürün arayüzünü ve frontend'i yönettim.",
      en: "An enterprise platform that turns product SKUs into catalogue-ready images and videos with fal.ai models. Every job is priced in tokens before it runs and charged against a pool → department → user quota with approvals and an audit trail. I led the product UI and frontend.",
    },
    highlights: {
      tr: [
        "Yaratıcı stüdyo ve yönetişim yüzeylerinde yaklaşık 97 ekran.",
        "fal.ai OpenAPI şemalarından dinamik parametre formları üreten model kaydı; model değişince uyumlu değerler korunur.",
        "Maliyet kapısı: yarış korumalı fiyat önizleme, onay, idempotent gönderim ve 202 → iş takibi.",
        "Nano Banana, Seedream, FLUX Kontext, Kling v3 ve Topaz ile görsel düzenleme, metin/görselden video, ilk-son kare ve upscale.",
      ],
      en: [
        "Around 97 screens across creative studio and governance surfaces.",
        "A model registry that turns fal.ai OpenAPI schemas into dynamic forms and keeps compatible values across model switches.",
        "A cost gate: race-safe price preview, approval, idempotent submit and 202 → job polling.",
        "Image edits, text/image-to-video, first-last-frame and upscaling with Nano Banana, Seedream, FLUX Kontext, Kling v3 and Topaz.",
      ],
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Ant Design", "FastAPI", "RabbitMQ", "Redis"],
    ai: ["fal.ai", "Nano Banana", "Kling", "OpenAI"],
  },
  {
    id: "falaxy",
    index: "03",
    title: "Falaxy",
    kind: "corporate",
    year: 2026,
    tagline: { tr: "AI fal uygulaması", en: "AI fortune-telling app" },
    summary: {
      tr: "Tarot, astroloji, Çin burcu, numeroloji, yüz okuma ve uyumluluk falları ile bağlama duyarlı bir AI sohbet asistanı sunan mobil uygulama. FastAPI backend falları OpenAI ile JSON modunda üretir, token ekonomisini yönetir ve eski falları hatırlayıp sonrasını sorar.",
      en: "A mobile app for tarot, astrology, Chinese zodiac, numerology, face-reading and compatibility readings, with a context-aware AI chat assistant. A FastAPI backend generates readings with OpenAI in JSON mode, runs a token economy and remembers past readings to follow up on them.",
    },
    highlights: {
      tr: [
        "Kart çevirme ve Kelt Haçı açılımıyla 12 animasyonlu ekran (Expo + Reanimated).",
        "41 REST operasyonlu FastAPI backend, akışlı sohbet ve hafıza tetikleyicileri.",
        "Gizlilik öncelikli yüz okuma: özellikler cihazda sınıflanır, fotoğraf sunucuya hiç gitmez.",
        "Fal kitaplarını veri setine çeviren LLM tabanlı ETL ve CI için mock LLM.",
      ],
      en: [
        "12 animated screens with card flips and a Celtic Cross spread (Expo + Reanimated).",
        "A FastAPI backend with 41 REST operations, streamed chat and memory triggers.",
        "Privacy-first face reading: features are classified on the device, and the photo never reaches the server.",
        "An LLM-driven ETL that turns reference books into lookup data, plus a mock LLM for CI.",
      ],
    },
    stack: ["React Native", "Expo", "Reanimated", "FastAPI", "SQLAlchemy", "Docker"],
    ai: ["OpenAI", "JSON mode", "Streaming chat"],
  },
  {
    id: "phitalk",
    index: "04",
    title: "PhiTalk",
    kind: "personal",
    year: 2025,
    repo: "https://github.com/oglcncvzc/Vertex-API",
    tagline: { tr: "Gemini Live ile gerçek zamanlı sesli asistan", en: "Real-time voice assistant on Gemini Live" },
    summary: {
      tr: "Google Gemini Live API üzerinde Türkçe konuşan, gerçek zamanlı sesli ve görüntülü asistan. Google'ın örnek kodundan yola çıkıp Cloud Run üzerindeki bir Vertex AI WebSocket proxy'sine taşıdım; Türkçe ses, araç çağırma ve hafıza ekledim.",
      en: "A Turkish-speaking, real-time voice and vision assistant on Google's Gemini Live API. Starting from Google's samples, I moved it to a Vertex AI WebSocket proxy on Cloud Run and added Turkish voice, tool calling and memory.",
    },
    highlights: {
      tr: [
        "Service account ile sunucuda kimlik doğrulayan çift yönlü Python WebSocket proxy.",
        "AudioWorklet hattı: 16 kHz mikrofon akışı, 24 kHz kesilebilir model sesi, kamera ve ekran paylaşımı.",
        "Hava durumu için fonksiyon çağırma ve canlı fonksiyon çağrısı paneli.",
        "Proxy ve frontend için Cloud Run'a ayrı konteyner dağıtımı.",
      ],
      en: [
        "A bidirectional Python WebSocket proxy that authenticates server-side with a service account.",
        "An AudioWorklet pipeline: 16 kHz mic streaming, interruptible 24 kHz model audio, camera and screen share.",
        "Function calling for weather lookups, with a live function-call panel.",
        "Separate Cloud Run containers for the proxy and the frontend.",
      ],
    },
    stack: ["Gemini Live API", "Vertex AI", "Python", "WebSocket", "AudioWorklet", "Cloud Run"],
    ai: ["Gemini Live", "Function calling"],
  },
  {
    id: "black-books",
    index: "05",
    title: "Black Books & Coffee",
    kind: "client",
    year: 2026,
    repo: "https://github.com/oglcncvzc/BlackBooksCoffee",
    tagline: { tr: "Sahaf-kafe için QR menü", en: "QR menu for a bookshop café" },
    summary: {
      tr: "Kadıköy Moda'daki sahaf-kafe Black Books & Coffee için koyu, ahşap ve altın tonlu QR menü. Loş ışıkta barista'nın uzaktan okuyabileceği 'siparişini göster' modu, tek dokunuşla Wi-Fi şifresi ve yayınevine dosya başvurusu içerir.",
      en: "A dark wood-and-gold QR menu for Black Books & Coffee, a bookshop café in Moda, Kadıköy. It adds a 'show my order' mode a barista can read across a dim room, one-tap Wi-Fi copy and a manuscript submission flow for the shop's publisher.",
    },
    highlights: {
      tr: [
        "5 kategoride 19 içecek, seçenekler ve fotoğraflar; rozetli kategori gezinmesi.",
        "clamp() ile ölçeklenen dev yazılı tam ekran 'Masa Siparişi'.",
        "Fotoğraflı ve fotoğrafsız A4 baskı menüleri.",
      ],
      en: [
        "19 drinks in 5 categories with variants and photos, plus badge-led category navigation.",
        "A full-screen 'table order' view with clamp()-scaled type.",
        "Print-ready A4 menus with and without photos.",
      ],
    },
    stack: ["Next.js 14", "TypeScript", "CSS tokens"],
  },
  {
    id: "ai-influencer",
    index: "06",
    title: "AI Influencer Platform",
    kind: "corporate",
    year: 2025,
    tagline: { tr: "AI marka influencer'ı ve sosyal analiz", en: "AI brand influencers & social intelligence" },
    summary: {
      tr: "Ürününüzü tutan ya da logonuzu sergileyen AI influencer'ları görsel ve video olarak üreten, bunu TikTok, YouTube ve LinkedIn analiziyle birleştiren platformun ön yüzü. İş ilerlemesi gRPC mikroservislerini yöneten FastAPI orkestratöründen WebSocket ile canlı akar.",
      en: "The frontend of a platform that generates AI influencers holding your product or showing your logo as images and video, paired with TikTok, YouTube and LinkedIn intelligence. Job progress streams live over WebSocket from a FastAPI orchestrator driving gRPC microservices.",
    },
    highlights: {
      tr: [
        "Polling yedekli, otomatik yeniden bağlanan WebSocket ilerleme akışı.",
        "4 API istemcisi ve 53 tipli servis fonksiyonu; JWT yenilemede istek kuyruğu.",
        "Görünüm, sahne, ürün ve marka adımlı avatar sihirbazı.",
        "TikTok performans tahmini, YouTube duygu analizi ve LinkedIn içgörüleri.",
      ],
      en: [
        "WebSocket-first progress streaming with auto-reconnect and a polling fallback.",
        "4 API clients and 53 typed service functions, with request queueing during JWT refresh.",
        "An avatar wizard covering appearance, scene, product and brand.",
        "TikTok performance prediction, YouTube sentiment and LinkedIn insights.",
      ],
    },
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "WebSocket", "FastAPI", "gRPC"],
    ai: ["OpenAI", "fal.ai FLUX", "Video generation"],
  },
  {
    id: "paint-calculator",
    index: "07",
    title: "Decor Paint Calculator",
    kind: "corporate",
    year: 2025,
    tagline: { tr: "Pantone eşleştirme ve boya hesabı", en: "Pantone matching & ink estimation" },
    summary: {
      tr: "Dekorlu baskılarda her rengin kaç gram boya gerektirdiğini hesaplayan web aracı. Çizimden renkleri çıkarır, CIEDE2000 ile Pantone'a eşler, renk başına alanı ve boya ağırlığını hesaplar; PDF rapor ve halftone ayrım çıktısı verir.",
      en: "A web tool that estimates how many grams of paint each colour of a decorated print needs. It extracts colours from artwork, matches them to Pantone with CIEDE2000, computes per-colour area and ink weight, and exports PDF reports and halftone separations.",
    },
    highlights: {
      tr: [
        "Pantone PDF'inden çıkarılmış 1.874 renklik veritabanı.",
        "KMeans renk çıkarımı ve Delta E 2000 eşleşmesi; renk birleştirme ve geri alma.",
        "Photoshop eşdeğeri bitmap halftone dönüşümü ve ZIP ayrım çıktısı.",
      ],
      en: [
        "A 1,874-colour Pantone database extracted from the Pantone PDF.",
        "KMeans colour extraction with Delta E 2000 matching, colour merging and undo.",
        "Photoshop-equivalent bitmap halftone conversion with ZIP separation export.",
      ],
    },
    stack: ["Next.js", "React 19", "Canvas", "Python", "scikit-learn", "OpenCV"],
  },
  {
    id: "qr-menu",
    index: "08",
    title: "QR Menu System",
    kind: "personal",
    year: 2026,
    privateRepo: true,
    tagline: { tr: "Restoran QR menüsü ve yönetim paneli", en: "Restaurant QR menu & admin" },
    summary: {
      tr: "Restoranlar için mobil QR menü ve yönetim paneli. Sipariş, garsonun okutacağı bir QR koda dönüşür; ruh haline göre öneri yapan bir asistan ve 6 hazır temalı canlı tema düzenleyicisi vardır.",
      en: "A mobile QR menu and admin panel for restaurants. The order becomes a QR code for the waiter to scan, with a mood-based recommendation assistant and a live theme editor with 6 presets.",
    },
    highlights: {
      tr: [
        "Sepet, not ve toplamı QR'a çeviren sipariş özeti.",
        "Türkçe ruh hali kelimelerini fiyat ve içerik filtrelerine eşleyen öneri asistanı.",
        "Renk, font, köşe ve başlık stilini canlı değiştiren tema editörü.",
      ],
      en: [
        "An order summary that turns cart, note and total into a QR code.",
        "A recommendation assistant that maps Turkish mood words to price and content filters.",
        "A theme editor that live-edits colours, fonts, radius and header style.",
      ],
    },
    stack: ["Next.js 16", "React 19", "Tailwind 4", "framer-motion"],
  },
  {
    id: "cassettes",
    index: "09",
    title: "Cassette Players",
    kind: "personal",
    year: 2026,
    live: "https://oglcncvzc.github.io/metallicasette/",
    repo: "https://github.com/oglcncvzc/metallicasette",
    tagline: { tr: "Sürükle-bırak kaset rafı", en: "Drag-and-drop cassette rack" },
    summary: {
      tr: "CSS ile çizilmiş kasetlerden oluşan bir raf: kaseti retro çalara sürükleyince şarkının klibi çaların ekranında oynar. Metallica temalı boombox ve BMO şeklinde pastel iki sürümü var; BMO sürümü daha sonra Coach Panel'e taşındı.",
      en: "A shelf of CSS-drawn cassettes: drag one into the retro player and the song's video plays on its screen. There are two versions, a Metallica boombox and a pastel BMO, and the BMO one later moved into Coach Panel.",
    },
    highlights: {
      tr: [
        "Yerel HTML5 sürükle-bırak ve oynatıcı üzerinde CSS durum makinesi.",
        "Dönen makaralar, VU metre, D-pad ve klavye kısayolları.",
        "Tek dosya, framework yok.",
      ],
      en: [
        "Native HTML5 drag and drop with a CSS state machine on the player.",
        "Spinning reels, VU meters, a D-pad and keyboard shortcuts.",
        "One file, no framework.",
      ],
    },
    stack: ["HTML", "CSS", "JavaScript", "YouTube IFrame API", "Web Audio"],
  },
  {
    id: "phiweb",
    index: "10",
    title: "PhiWeb",
    kind: "personal",
    year: 2025,
    live: "https://phiai.netlify.app",
    repo: "https://github.com/oglcncvzc/PhiWeb",
    tagline: { tr: "Spline 3D konsept sitesi", en: "Spline 3D concept site" },
    summary: {
      tr: "İnsansı robotlara akıl yürütme katmanı öneren bir konsept için iki dilli tanıtım sitesi. Spline 3D hero, scroll'a bağlı yatay mimari şeridi ve EmailJS iletişim formu içerir.",
      en: "A bilingual landing site for a concept that adds a reasoning layer to humanoid robots. It has a Spline 3D hero, a scroll-driven horizontal architecture track and an EmailJS contact form.",
    },
    highlights: {
      tr: ["Spline 3D sahne ve yükleme durumu.", "requestAnimationFrame ile dikey scroll'u yatay şeride çeviren bölüm.", "TR/EN dil bağlamı."],
      en: ["A Spline 3D scene with a loading state.", "A section that maps vertical scroll to a horizontal track with requestAnimationFrame.", "TR/EN language context."],
    },
    stack: ["React 19", "Spline", "framer-motion", "EmailJS"],
  },
];
