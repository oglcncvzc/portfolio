"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/** Appears after the first screen; its ring fills with the page's scroll progress. */
export default function BackToTop({ label }: { label: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.9);
      el.style.setProperty("--off", String(182 * (1 - p)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = () => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <button ref={ref} className="to-top" onClick={go} aria-label={label} data-magnetic="0.4">
      <svg className="to-top__ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" /></svg>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
}
