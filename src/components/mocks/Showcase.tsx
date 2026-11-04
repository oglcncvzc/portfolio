"use client";

import { useState } from "react";
import "./showcase.css";

type Screen = { key: string; label: string; node: React.ReactNode };

/** Three phones side by side; the tabs choose which screen sits in the centre. */
function Phones({ screens, theme, label }: { screens: Screen[]; theme: string; label: string }) {
  const [active, setActive] = useState(0);
  const n = screens.length;
  const order = [(active - 1 + n) % n, active, (active + 1) % n];
  return (
    <div className={`sc sc--${theme}`} role="group" aria-label={label}>
      <div className="sc__tabs" role="tablist">
        {screens.map((s, i) => (
          <button key={s.key} role="tab" aria-selected={i === active} className={i === active ? "on" : ""} onClick={() => setActive(i)} data-cursor="">
            {s.label}
          </button>
        ))}
      </div>
      <div className="sc__stage">
        {order.map((idx, slot) => (
          <div key={screens[idx].key} className={`sc__phone sc__phone--${["l", "c", "r"][slot]}`} aria-hidden={slot !== 1} onClick={() => setActive(idx)}>
            <div className="sc__screen">{screens[idx].node}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Coach Panel ("Flaş Anı" design system) ---------- */
const Dash = () => (
  <div className="cp">
    <p className="cp__hi">Selam Koç <span className="cp__spark" /></p>
    <div className="cp__stage">
      <small>SIRADAKİ MAÇ</small>
      <b className="cp__chrome">Ankara Barosu</b>
      <span className="cp__vs">vs PTT</span>
      <div className="cp__meta"><span>Cmt 14:00</span><span>Spor Salonu</span></div>
      <div className="cp__polaroid"><b>3</b><small>GÜN</small></div>
    </div>
    <div className="cp__row2">
      <div className="cp__tile"><small>Yoklama</small><b>14/16</b></div>
      <div className="cp__tile cp__tile--pink"><small>Puan durumu</small><b>2.</b></div>
    </div>
    <div className="cp__list">
      {["Antrenman · Salı 19:00", "Antrenman · Perş 19:00", "Maç · Cmt 14:00"].map((x) => (<span key={x}>{x}</span>))}
    </div>
  </div>
);
const Live = () => (
  <div className="cp cp--dark">
    <div className="cp__board">
      <span><small>BİZ</small><b className="tabular">18</b></span>
      <span className="cp__set">Set 3<br /><small>25'e kadar</small></span>
      <span><small>RAKİP</small><b className="tabular">15</b></span>
      <i className="cp__serve">Servis</i>
    </div>
    <div className="cp__quick"><span>+1 Rakip hatası</span><span>Ace</span><span>Hata</span></div>
    <div className="cp__players">
      {[7, 9, 11, 3, 14, 5].map((n, i) => (
        <div key={n} className={`cp__pl ${i === 1 ? "on" : ""}`}><b>{n}</b><small>{["Pasör", "Smaçör", "Orta", "Libero", "Smaçör", "Pasör"][i]}</small></div>
      ))}
    </div>
    <div className="cp__actions">{["Servis", "Karşılama", "Hücum", "Blok"].map((a, i) => (<span key={a} className={i === 2 ? "on" : ""}>{a}</span>))}</div>
    <div className="cp__grades">{["#", "+", "!", "-", "/", "="].map((g) => (<span key={g}>{g}</span>))}</div>
  </div>
);
const Leaders = () => (
  <div className="cp">
    <p className="cp__hi">Liderler · Sayı</p>
    <div className="cp__booth">
      {[["2", "Deniz", "68"], ["1", "Elif", "84"], ["3", "Zeynep", "61"]].map(([r, n, v]) => (
        <div key={r} className={`cp__shot cp__shot--${r}`}><i /><span className="cp__rank">{r}</span><b>{v}</b><small>{n}</small></div>
      ))}
    </div>
    <div className="cp__list cp__list--rank">
      {[["4", "Selin", "55"], ["5", "Ayşe", "49"], ["6", "Ceren", "41"]].map(([r, n, v]) => (<span key={r}><em>{r}</em>{n}<b className="tabular">{v}</b></span>))}
    </div>
  </div>
);
const Detail = () => (
  <div className="cp">
    <div className="cp__stage cp__stage--score">
      <small>MAÇ SONUCU</small>
      <b className="cp__chrome tabular">3 – 1</b>
      <span className="cp__badge">G 3-1</span>
    </div>
    <div className="cp__film">{["25-21", "23-25", "25-19", "25-22"].map((s, i) => (<span key={s} className={i === 1 ? "" : "won"}>{s}</span>))}</div>
    <div className="cp__table">
      <span className="h"><em>#</em>Oyuncu<b>Sayı</b><b>Ace</b><b>Blok</b></span>
      {[["7", "Elif", "21", "3", "2"], ["9", "Deniz", "17", "1", "4"], ["11", "Zeynep", "14", "2", "1"], ["3", "Selin", "9", "0", "3"]].map((r) => (
        <span key={r[0]}><em>{r[0]}</em>{r[1]}<b>{r[2]}</b><b>{r[3]}</b><b>{r[4]}</b></span>
      ))}
    </div>
  </div>
);

export function CoachShowcase({ label }: { label: string }) {
  return (
    <Phones theme="coach" label={label} screens={[
      { key: "dash", label: "Panel", node: <Dash /> },
      { key: "live", label: "Canlı takip", node: <Live /> },
      { key: "lead", label: "Liderler", node: <Leaders /> },
      { key: "detail", label: "Maç detayı", node: <Detail /> },
    ]} />
  );
}

/* ---------- QR Menu ---------- */
const QR_FINDER = (r: number, c: number) => {
  const inF = (r0: number, c0: number) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
  for (const [r0, c0] of [[0, 0], [0, 18], [18, 0]]) {
    if (inF(r0, c0)) { const y = r - r0, x = c - c0; return y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4); }
  }
  return null;
};
const QrCode = () => (
  <div className="qr__matrix" aria-hidden="true">
    {Array.from({ length: 625 }, (_, i) => {
      const r = Math.floor(i / 25), c = i % 25;
      const f = QR_FINDER(r, c);
      const on = f ?? (((r * 31 + c * 17 + r * c * 7) % 11) < 5);
      return <i key={i} className={on ? "on" : ""} />;
    })}
  </div>
);
const Menu = () => (
  <div className="qm">
    <div className="qm__head"><b>Lezzet Durağı</b><small>Masa 7</small></div>
    <div className="qm__slide"><small>KAMPANYA</small><b>2. kahve %50</b></div>
    <div className="qm__tabs">{["Kahvaltı", "Ana yemek", "Tatlı", "İçecek"].map((t, i) => (<span key={t} className={i === 1 ? "on" : ""}>{t}</span>))}</div>
    {[["Izgara Köfte", "Közlenmiş biber, pilav", "₺320"], ["Mantı", "Yoğurt, tereyağlı sos", "₺260"], ["Fırın Makarna", "Kaşarlı, kremalı", "₺210"]].map(([n, d, p]) => (
      <div className="qm__item" key={n}><i /><span><b>{n}</b><small>{d}</small></span><em>{p}</em></div>
    ))}
    <div className="qm__fab">Sipariş · 3</div>
  </div>
);
const Assistant = () => (
  <div className="qm">
    <div className="qm__head"><b>Asistan</b><small>Ruh haline göre öneri</small></div>
    <div className="qm__bubble qm__bubble--me">Biraz yorgunum, enerji lazım ⚡</div>
    <div className="qm__bubble">Enerjini toplaman için şunları önerebilirim:</div>
    {[["Türk Kahvesi", "₺90"], ["Granola Kase", "₺180"]].map(([n, p]) => (<div className="qm__item qm__item--s" key={n}><i /><span><b>{n}</b></span><em>{p}</em></div>))}
    <div className="qm__chips">{["Bugün çok mutluyum! 🎉", "Sağlıklı bir şeyler 🥗", "Bütçe dostu 💸"].map((c) => (<span key={c}>{c}</span>))}</div>
    <div className="qm__input">Nasıl hissediyorsunuz?</div>
  </div>
);
const Order = () => (
  <div className="qm">
    <div className="qm__head"><b>Siparişim</b><small>Masa 7</small></div>
    {[["Izgara Köfte", "1", "₺320"], ["Mantı", "2", "₺520"]].map(([n, q, p]) => (<div className="qm__line" key={n}><span>{n}</span><span className="qm__qty">− {q} +</span><b>{p}</b></div>))}
    <div className="qm__total"><span>Toplam</span><b>₺840</b></div>
    <QrCode />
    <p className="qm__cap">Bu QR kodu garsona göstererek siparişinizi masanıza iletebilirsiniz.</p>
  </div>
);
const Theme = () => (
  <div className="qm qm--admin">
    <div className="qm__head"><b>Tema</b><small>Admin</small></div>
    <div className="qm__presets">{[["default", "#ea580c"], ["ocean", "#0284c7"], ["forest", "#15803d"], ["sunset", "#e11d48"], ["dark", "#18181b"], ["coffee", "#7c4a2d"]].map(([n, c], i) => (
      <span key={n} className={i === 5 ? "on" : ""}><i style={{ background: c }} />{n}</span>
    ))}</div>
    {[["Ana renk", "#7c4a2d"], ["Vurgu", "#d4a373"], ["Zemin", "#fffbf5"]].map(([k, v]) => (<div className="qm__line" key={k}><span>{k}</span><i className="qm__sw" style={{ background: v }} /><b>{v}</b></div>))}
    <div className="qm__line"><span>Köşe</span><span className="qm__range"><i /></span></div>
    <div className="qm__stats">{[["Görüntülenme", "1.234"], ["Sipariş", "156"]].map(([k, v]) => (<span key={k}><small>{k}</small><b>{v}</b></span>))}</div>
  </div>
);

export function QrShowcase({ label }: { label: string }) {
  return (
    <Phones theme="qr" label={label} screens={[
      { key: "menu", label: "Menü", node: <Menu /> },
      { key: "ai", label: "Asistan", node: <Assistant /> },
      { key: "order", label: "Sipariş QR", node: <Order /> },
      { key: "theme", label: "Tema editörü", node: <Theme /> },
    ]} />
  );
}

/* ---------- Hotel Review AI (desktop panel, anonymised hotels) ---------- */
const HSide = ({ on }: { on: number }) => (
  <aside className="gh__side">
    <b className="gh__brand"><i />Review AI</b>
    {["Dashboard", "Yorum Analizi", "Fiyat Takibi", "Raporlar", "Otel Kurulumu"].map((k, i) => (<span key={k} className={i === on ? "on" : ""}>{k}</span>))}
  </aside>
);
const Kpi = ({ k, v, d }: { k: string; v: string; d?: string }) => (<div className="gh__kpi"><small>{k}</small><b className="tabular">{v}</b>{d && <em>{d}</em>}</div>);
const HDash = () => (
  <div className="gh"><HSide on={0} />
    <div className="gh__main">
      <div className="gh__top"><b>Koy Resort</b><span className="gh__chip">Son 30 gün</span></div>
      <div className="gh__kpis"><Kpi k="Toplam Yorum Sayısı" v="2.418" d="+12%" /><Kpi k="Genel Puan Ort." v="8,9" /><Kpi k="Hizmet Puan Ort." v="9,1" /><Kpi k="Yemek Puan Ort." v="8,4" /></div>
      <div className="gh__row">
        <div className="gh__card gh__card--wide"><small>Puan trendi</small>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="gh__line"><path d="M0 42 L25 38 L50 40 L75 30 L100 32 L125 22 L150 24 L175 14 L200 12" /><path className="b" d="M0 50 L25 48 L50 44 L75 46 L100 40 L125 38 L150 34 L175 36 L200 30" /></svg>
        </div>
        <div className="gh__card"><small>Global Dağılım</small>
          {[["Almanya", 34], ["Türkiye", 27], ["İngiltere", 18], ["Rusya", 12]].map(([c, v]) => (<span className="gh__bar" key={c as string}><em>{c}</em><i style={{ width: `${(v as number) * 2.4}%` }} /><b>{v}%</b></span>))}
        </div>
      </div>
    </div>
  </div>
);
const HReview = () => (
  <div className="gh"><HSide on={1} />
    <div className="gh__main">
      <div className="gh__top"><b>Yorum Analizi</b><span className="gh__chip">Booking.com</span><span className="gh__chip">Google</span></div>
      <div className="gh__row">
        <div className="gh__card"><small>Sentiment Skorları</small>
          <div className="gh__senti"><i style={{ flex: 71 }} /><i style={{ flex: 18 }} /><i style={{ flex: 11 }} /></div>
          <div className="gh__legend"><span>Pozitif 71%</span><span>Nötr 18%</span><span>Negatif 11%</span></div>
          <small className="gh__mt">Kategori Bazlı Puanlar</small>
          {[["Temizlik", 9.3], ["Personel", 9.1], ["Konum", 8.8], ["Fiyat/Değer", 7.6]].map(([k, v]) => (<span className="gh__bar" key={k as string}><em>{k}</em><i style={{ width: `${(v as number) * 9}%` }} /><b className="tabular">{String(v).replace(".", ",")}</b></span>))}
        </div>
        <div className="gh__card gh__card--wide gh__review">
          <small>Yorum · 9,0 · Almanya</small>
          <p>“Personel çok ilgiliydi, <mark className="pos">plaj tertemizdi</mark>. Ancak <mark className="neg">akşam yemeğinde çeşit azdı</mark> ve odada wifi yavaştı.”</p>
          <div className="gh__tags"><span className="pos">Personel</span><span className="pos">Plaj</span><span className="neg">Yemek çeşidi</span><span className="neg">Wifi</span></div>
          <div className="gh__ai"><small>AI cevap taslağı</small><p>Değerli misafirimiz, güzel yorumunuz için teşekkür ederiz. Akşam menümüzü ve oda internetimizi geri bildiriminiz doğrultusunda iyileştiriyoruz…</p><span className="gh__btn">Otel cevabı olarak gönder</span></div>
        </div>
      </div>
    </div>
  </div>
);
const HPrice = () => (
  <div className="gh"><HSide on={2} />
    <div className="gh__main">
      <div className="gh__top"><b>Fiyat Takibi</b><span className="gh__chip">Oda Tipine Göre</span><span className="gh__chip">Fiyata Göre</span></div>
      <div className="gh__grid">
        <span className="h">Otel</span>{["12 Haz", "13 Haz", "14 Haz", "15 Haz", "16 Haz"].map((d) => (<span key={d} className="h">{d}</span>))}
        {[["Koy Resort", [210, 218, 236, 240, 225], true], ["Sahil Otel", [198, 205, 229, 251, 230], false], ["Mavi Bay", [225, 224, 219, 262, 248], false], ["Çam Koru", [176, 180, 195, 205, 190], false]].map(([n, ps, me]) => (
          <span key={n as string} className={`gh__gr ${me ? "me" : ""}`}><span>{n as string}</span>{(ps as number[]).map((p, i) => (<b key={i} className={`tabular ${p > 240 ? "hi" : p < 200 ? "lo" : ""}`}>€{p}</b>))}</span>
        ))}
      </div>
      <div className="gh__card gh__card--wide"><small>Kaynaklar</small><div className="gh__tags"><span>Booking.com</span><span>ETS</span><span>Trivago</span><span className="pos">Link ile otel çekme</span><span>Filtre ile otel çekme</span></div></div>
    </div>
  </div>
);
const HReport = () => (
  <div className="gh"><HSide on={3} />
    <div className="gh__main">
      <div className="gh__top"><b>AI Analiz Raporu</b><span className="gh__chip">Ayda bir</span></div>
      <div className="gh__steps">{["Rapor Türü Seç", "Rapor Adı", "Zamanlama", "Özet"].map((k, i) => (<span key={k} className={i < 3 ? "done" : "on"}>{k}</span>))}</div>
      <div className="gh__row">
        <div className="gh__card"><small>Güçlü Yönler</small><ul><li>Personel ilgisi ve karşılama</li><li>Plaj ve havuz temizliği</li><li>Konum ve manzara</li></ul></div>
        <div className="gh__card"><small>İyileştirme Alanları</small><ul className="neg"><li>Akşam yemeği çeşitliliği</li><li>Oda içi internet hızı</li><li>Check-in bekleme süresi</li></ul></div>
      </div>
      <div className="gh__card gh__card--wide"><small>Veri Stratejisi</small><p className="gh__p">Son 90 günde 1.214 yorum, 6 platform, 9 dil. Negatif temaların %62'si yemek ve internet kaynaklı.</p></div>
    </div>
  </div>
);

export function HotelShowcase({ label }: { label: string }) {
  const tabs = [
    { key: "review", label: "Yorum Analizi", node: <HReview /> },
    { key: "dash", label: "Dashboard", node: <HDash /> },
    { key: "price", label: "Fiyat Takibi", node: <HPrice /> },
    { key: "report", label: "AI Raporu", node: <HReport /> },
  ];
  const [a, setA] = useState(0);
  return (
    <div className="sc sc--hotel" role="group" aria-label={label}>
      <div className="sc__tabs" role="tablist">
        {tabs.map((t, i) => (<button key={t.key} role="tab" aria-selected={i === a} className={i === a ? "on" : ""} onClick={() => setA(i)} data-cursor="">{t.label}</button>))}
      </div>
      <div className="sc__desk"><div className="sc__browser" key={tabs[a].key}>{tabs[a].node}</div></div>
    </div>
  );
}

/* ---------- Falaxy (AI fortune-telling, Expo app) ---------- */
const AiTag = ({ children }: { children: React.ReactNode }) => (<span className="fx__ai"><i />{children}</span>);
const FxHead = () => (<div className="fx__head"><b>Falaxy</b><span className="fx__tok">🔥 120</span></div>);
const FxHome = () => (
  <div className="fx">
    <FxHead />
    <div className="fx__hero"><img src="/work/falaxy/hero.webp" alt="" /><span>GELECEK SENİ<br />ŞAŞIRTMASIN!</span><i>✨ FAL BAKTIR</i></div>
    <div className="fx__zodiac"><b>马</b><span><small>2026 · Çin burcu</small>Ateş Atı</span><AiTag>Günlük yorum</AiTag></div>
    <div className="fx__mods">{["Tarot", "Astroloji", "Numeroloji", "Yüz okuma", "Uyumluluk", "Melek kartı"].map((m) => (<span key={m}>{m}</span>))}</div>
  </div>
);
const FxTarot = () => (
  <div className="fx">
    <FxHead />
    <p className="fx__title">Geleceğin Kapılarını Arala</p>
    <div className="fx__spreads"><span>1 Kart · 🔥5</span><span className="on">3 Kart · 🔥10</span><span>Kelt Haçı · 🔥25</span></div>
    <div className="fx__cards">
      {[["Geçmiş", "The Moon"], ["Şimdi", "The Star"], ["Gelecek", "Wheel"]].map(([k, n], i) => (
        <div key={k} className={`fx__card ${i === 1 ? "is-up" : ""}`}><img src="/work/falaxy/tarot.webp" alt="" /><small>{k}</small><b>{n}</b></div>
      ))}
    </div>
    <div className="fx__reading"><AiTag>AI yorumu</AiTag><p>Yıldız kartı, uzun süredir beklediğin bir haberin yaklaştığını gösteriyor. Geçmişteki Ay, belirsizliğin artık geride kaldığına işaret ediyor<em className="fx__caret" /></p></div>
  </div>
);
const FxChat = () => (
  <div className="fx fx--chat">
    <FxHead />
    <div className="fx__memory"><AiTag>Hafıza</AiTag><p>Geçen hafta iş görüşmesini sormuştun. Nasıl geçti?</p></div>
    <div className="fx__msg fx__msg--me">Burcum bu hafta ne diyor?</div>
    <div className="fx__msg">Doğum tarihine göre Akrep burcusun ♏. Bu hafta Venüs etkisiyle ilişkilerde netlik var; cuma günü önemli bir konuşma seni bekliyor.</div>
    <div className="fx__acts"><span>Tarot'a bak →</span><span>Uyumluluk →</span></div>
    <div className="fx__input"><span>Yıldızlara sor…</span><i /></div>
  </div>
);
const FxFace = () => (
  <div className="fx">
    <FxHead />
    <div className="fx__cam">
      <img src="/work/falaxy/mascot.webp" alt="" />
      <svg viewBox="0 0 100 100" className="fx__mesh" aria-hidden="true">
        {[[50, 22], [36, 34], [64, 34], [42, 40], [58, 40], [50, 52], [40, 64], [60, 64], [50, 70], [30, 48], [70, 48], [50, 82]].map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="1.6" />))}
        <path d="M36 34 L50 22 L64 34 M42 40 L50 52 L58 40 M40 64 L50 70 L60 64 M30 48 L40 64 M70 48 L60 64 M50 70 L50 82" />
      </svg>
      <span className="fx__ondevice">Cihazda analiz · fotoğraf sunucuya gitmez</span>
    </div>
    <div className="fx__traits">{["Alın · geniş", "Kaş · kavisli", "Göz · badem", "Burun · düz", "Dudak · dolgun", "Çene · oval", "Yüz · kalp", "Kulak · küçük"].map((t) => (<span key={t}>{t}</span>))}</div>
    <div className="fx__reading"><AiTag>LLM sentezi</AiTag><p>Geniş alın ve badem gözler, sezgisel ve planlı bir karaktere işaret ediyor…</p></div>
  </div>
);

export function FalaxyShowcase({ label }: { label: string }) {
  return (
    <Phones theme="falaxy" label={label} screens={[
      { key: "home", label: "Ana sayfa", node: <FxHome /> },
      { key: "tarot", label: "Tarot · AI yorum", node: <FxTarot /> },
      { key: "chat", label: "AI asistan", node: <FxChat /> },
      { key: "face", label: "Yüz okuma", node: <FxFace /> },
    ]} />
  );
}


/* ---------- Real screenshots in a browser frame (projects with a live site) ---------- */
export function ShotsShowcase({ label, url, shots, mobile }: { label: string; url: string; shots: { key: string; label: string; src: string }[]; mobile?: string }) {
  const [a, setA] = useState(0);
  return (
    <div className="sc sc--shots" role="group" aria-label={label}>
      <div className="sc__tabs" role="tablist">
        {shots.map((s, i) => (<button key={s.key} role="tab" aria-selected={i === a} className={i === a ? "on" : ""} onClick={() => setA(i)} data-cursor="">{s.label}</button>))}
      </div>
      <div className="sc__desk">
        <div className="shots__browser">
          <div className="shots__bar"><i /><i /><i /><span>{url}</span></div>
          <div className="shots__view" key={shots[a].key}><img src={shots[a].src} alt={`${label} — ${shots[a].label}`} /></div>
        </div>
        {mobile && (<div className="shots__phone"><img src={mobile} alt="" /></div>)}
      </div>
    </div>
  );
}
