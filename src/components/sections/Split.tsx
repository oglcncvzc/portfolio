/** Renders text as per-character spans for motion, while assistive tech reads the whole string once. */
export default function Split({ text, as: Tag = "span", className = "" }: { text: string; as?: "span" | "h2" | "h3" | "p"; className?: string }) {
  const words = text.split(" ");
  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="split__w">
            {Array.from(w).map((c, ci) => (<span className="split__c" key={ci}>{c}</span>))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
