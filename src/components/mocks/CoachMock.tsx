import "./mocks.css";

/** Coach Panel live-match screen, rebuilt in HTML from the product's real layout. Demo data. */
export default function CoachMock({ className = "" }: { className?: string }) {
  const bars = [62, 78, 45, 88, 54, 70, 38, 82];
  const bars2 = [40, 55, 70, 35, 60, 48, 66, 52];
  const players = [
    [22, 30], [22, 68], [40, 22], [40, 50], [40, 78], [60, 30], [60, 68], [75, 22], [75, 50], [75, 78], [88, 40], [88, 62],
  ];
  return (
    <div className={`coach ${className}`} role="img" aria-label="Coach Panel: live match dashboard with score 12–10, court rotation and player charts (demo data)">
      <div className="coach__bar">
        <span className="coach__logo" />
        <b>Coach Panel</b>
        <span className="coach__dot" />
      </div>
      <div className="coach__grid">
        <div className="coach__score">
          <span className="coach__team"><i className="coach__crest" />Team A</span>
          <span className="coach__pts tabular">12</span>
          <span className="coach__set">Set 3<br /><small>25'e kadar</small></span>
          <span className="coach__pts tabular">10</span>
          <span className="coach__team coach__team--r">Team B<i className="coach__crest coach__crest--b" /></span>
        </div>
        <div className="coach__side">
          <b>Sıradaki</b>
          {["Servis", "Karşılama", "Hücum"].map((k, i) => (
            <span key={k} className="coach__row"><i style={{ background: ["#1f6fd1", "#2a9ba7", "#e5322b"][i] }} />{k}<em className="tabular">{[18, 12, 9][i]}</em></span>
          ))}
          <b className="coach__mt">Oyuncu</b>
          {[72, 54, 38].map((v, i) => (<span key={i} className="coach__meter"><i style={{ width: `${v}%` }} /></span>))}
        </div>
        <div className="coach__court">
          <div className="coach__floor">
            <span className="coach__net" />
            {players.map(([x, y], i) => (
              <span key={i} className={`coach__p ${i > 5 ? "coach__p--b" : ""}`} style={{ left: `${x}%`, top: `${y}%` }} />
            ))}
          </div>
        </div>
        <div className="coach__card">
          <b>Player Performance</b>
          <div className="coach__bars">{bars.map((h, i) => (<span key={i}><i style={{ height: `${h}%` }} /><i style={{ height: `${bars2[i]}%` }} /></span>))}</div>
        </div>
        <div className="coach__card">
          <b>Set Success Rates</b>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="coach__line">
            <path d="M0 34 L14 30 L28 26 L42 28 L56 18 L70 20 L84 10 L100 6" />
            <path d="M0 38 L14 36 L28 33 L42 34 L56 27 L70 28 L84 22 L100 18 L100 40 L0 40 Z" className="coach__area" />
          </svg>
        </div>
        <div className="coach__card coach__video">
          <b>Video</b>
          <span className="coach__play" />
        </div>
      </div>
    </div>
  );
}
