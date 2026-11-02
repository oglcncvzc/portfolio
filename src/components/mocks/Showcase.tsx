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
