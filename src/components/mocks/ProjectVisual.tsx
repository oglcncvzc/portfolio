import FramelyMock from "./FramelyMock";
import { CoachShowcase, HotelShowcase, QrShowcase } from "./Showcase";
import "./visuals.css";

/** Each project's own screen, rebuilt in HTML from its codebase. Corporate screens use anonymised demo data. */
export default function ProjectVisual({ id, label }: { id: string; label: string }) {
  switch (id) {
    case "coach-panel":
      return <div className="pv"><CoachShowcase label={label} /></div>;
    case "framely":
      return <div className="pv pv--framely"><FramelyMock label={label} /></div>;
    case "hotel-ai":
      return <div className="pv"><HotelShowcase label={label} /></div>;
    case "falaxy":
      return (
        <div className="pv pv--falaxy" role="img" aria-label={label}>
          <div className="phone">
            <div className="phone__bar"><b>Falaxy</b><span className="fal__tok">🔥 120</span></div>
            <div className="fal__hero"><img src="/work/falaxy/hero.webp" alt="" /><span>GELECEK SENİ<br />ŞAŞIRTMASIN!</span><i>✨ FAL BAKTIR</i></div>
            <div className="fal__grid">
              {["Tarot", "Kahve", "Burç", "Yüz"].map((k) => (<span key={k}>{k}</span>))}
            </div>
          </div>
          <div className="fal__cards">
            <img src="/work/falaxy/tarot.webp" alt="" />
            <img src="/work/falaxy/mascot.webp" alt="" className="fal__mascot" />
          </div>
        </div>
      );
    case "phitalk":
      return (
        <div className="pv pv--voice" role="img" aria-label={label}>
          <div className="voice__orb" />
          <div className="voice__wave">{Array.from({ length: 48 }, (_, i) => (<i key={i} style={{ animationDelay: `${(i % 12) * -0.09}s`, ["--h" as string]: `${20 + ((i * 37) % 70)}%` }} />))}</div>
          <p className="voice__line voice__line--u">“İstanbul'da hava nasıl?”</p>
          <div className="voice__fn"><b>get_weather</b> city: İstanbul → 18°C · parçalı bulutlu · nem %64</div>
          <p className="voice__line">Merhaba, ben PhiTalk. İstanbul'da şu an 18 derece ve parçalı bulutlu.</p>
          <div className="voice__ctl">{["mic", "stop", "cam", "screen"].map((k) => (<span key={k} />))}</div>
        </div>
      );
    case "black-books":
      return (
        <div className="pv pv--books" role="img" aria-label={label}>
          <div className="phone phone--books">
            <div className="books__mark">BLACK BOOKS<br /><small>&amp; COFFEE</small></div>
            <p className="books__motto">“Kitap kokusu ve kahve buğusunun kesiştiği yer.”</p>
            <div className="books__chips"><span className="on">Sıcak Kahveler · 10</span><span>Soğuk</span><span>Çaylar</span></div>
            {[["Espresso", "Single / Double", "₺85"], ["Flat White", "Taze çekim", "₺120"], ["Türk Kahvesi", "Közde", "₺90"], ["Espresso Tonic", "Ferahlatıcı", "₺135"]].map(([n, d, p]) => (
              <div className="books__item" key={n}><i /><span><b>{n}</b><small>{d}</small></span><em>{p}</em></div>
            ))}
          </div>
          <div className="books__order"><small>MASA SİPARİŞİ</small><b>2 × Flat White</b><b>1 × Türk Kahvesi</b></div>
        </div>
      );
    case "ai-influencer":
      return (
        <div className="pv pv--influencer" role="img" aria-label={label}>
          <div className="inf">
            <aside className="inf__side"><b>SanalInfluencer</b>{["Avatar Oluştur", "Görsel & Video", "TikTok Analiz", "YouTube Analiz", "LinkedIn Analiz"].map((k, i) => (<span key={k} className={i === 0 ? "on" : ""}>{k}</span>))}</aside>
            <div className="inf__main">
              <div className="inf__steps">{["Görünüm", "Arka Plan", "Ürün", "Marka"].map((k, i) => (<span key={k} className={i < 2 ? "done" : i === 2 ? "on" : ""}>{k}</span>))}</div>
              <div className="inf__row"><label>Kamera mesafesi</label><div className="inf__seg"><span>Yakın</span><span className="on">Orta</span><span>Geniş</span></div></div>
              <div className="inf__row"><label>Atmosfer</label><div className="inf__field">Gün batımı, sıcak ışık, şehir terası</div></div>
              <div className="inf__progress"><span>prompt</span><span>görsel</span><span className="on">video</span><span>tamam</span><i /></div>
            </div>
          </div>
        </div>
      );
    case "paint-calculator":
      return (
        <div className="pv pv--paint" role="img" aria-label={label}>
          <div className="paint">
            <div className="paint__art">{Array.from({ length: 9 }, (_, i) => (<i key={i} />))}</div>
            <div className="paint__rows">
              {[["PMS 186 C", "#c8102e", "38.4%", "12.6 gr"], ["PMS 7546 C", "#253746", "27.1%", "8.9 gr"], ["PMS 7406 C", "#f1c400", "19.8%", "6.5 gr"], ["PMS 3415 C", "#007749", "14.7%", "4.8 gr"]].map(([c, h, a, g]) => (
                <div className="paint__row" key={c}><i style={{ background: h }} /><b>{c}</b><span>{a}</span><em>{g}</em></div>
              ))}
              <div className="paint__total"><small>Toplam boya ihtiyacı</small><b>32.8 gr</b></div>
            </div>
          </div>
        </div>
      );
    case "qr-menu":
      return <div className="pv"><QrShowcase label={label} /></div>;
    case "cassettes":
      return (
        <div className="pv pv--tape" role="img" aria-label={label}>
          <div className="tape"><div className="tape__label"><b>METALLICA</b><small>SIDE A · Master of Puppets</small></div><div className="tape__win"><i /><i /></div></div>
          <div className="tape tape--b"><div className="tape__label"><b>MANIFEST</b><small>SIDE B</small></div><div className="tape__win"><i /><i /></div></div>
        </div>
      );
    case "phiweb":
    default:
      return (
        <div className="pv pv--phi" role="img" aria-label={label}>
          <div className="phi__sphere" />
          <p className="phi__h">Words to action:</p>
          <p className="phi__s">Introducing the new form of AI</p>
          <div className="phi__track">{["Perception", "World Model", "Cognitive", "Action"].map((k) => (<span key={k}>{k}</span>))}</div>
        </div>
      );
  }
}
