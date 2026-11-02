import "./mocks.css";

/** Framely studio, rebuilt in HTML with anonymised demo content. Product photos are synthetic samples. */
export default function FramelyMock({ className = "", label }: { className?: string; label: string }) {
  return (
    <div className={`framely ${className}`} role="img" aria-label={label}>
      <div className="framely__app">
        <div className="framely__side">
          <span className="framely__brand"><i />Framely</span>
          <span className="framely__item framely__item--on">AI Photos</span>
          <span className="framely__item">AI Videos</span>
          <span className="framely__item">Backgrounds</span>
          <span className="framely__item">Library</span>
        </div>
        <div className="framely__main">
          <div className="framely__head">
            <span>AI powered product image &amp; video studio</span>
            <span className="framely__chip">Nano Banana 2 · 4 tok</span>
          </div>
          <div className="framely__progress"><i /></div>
          <div className="framely__tiles">
            <img src="/work/framely/shot-a.webp" alt="" />
            <img src="/work/framely/shot-b.webp" alt="" />
            <img src="/work/framely/shot-c.webp" alt="" />
          </div>
        </div>
      </div>
      <div className="framely__shots">
        <img src="/work/framely/shot-d.webp" alt="" />
        <img src="/work/framely/shot-b.webp" alt="" />
      </div>
    </div>
  );
}
