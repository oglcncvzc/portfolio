"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** An ink-drop cursor: a dot that follows, a ring that lags, both swell over anything actionable. Magnetic pull on [data-magnetic]. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = dot.current!, r = ring.current!;
    const xd = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" }), yd = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const xr = gsap.quickTo(r, "x", { duration: reduce ? 0.1 : 0.55, ease: "power3" }), yr = gsap.quickTo(r, "y", { duration: reduce ? 0.1 : 0.55, ease: "power3" });

    const move = (e: PointerEvent) => { xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      r.classList.toggle("is-hot", !!el);
      const text = el?.dataset.cursor ?? "";
      label.current!.textContent = text;
      r.classList.toggle("has-label", !!text);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    const down = () => r.classList.add("is-down"), up = () => r.classList.remove("is-down");
    window.addEventListener("pointerdown", down); window.addEventListener("pointerup", up);

    // magnetic
    const mags = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const offs = mags.map((m) => {
      const qx = gsap.quickTo(m, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      const qy = gsap.quickTo(m, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      const mm = (e: PointerEvent) => {
        const b = m.getBoundingClientRect();
        const s = Number(m.dataset.magnetic) || 0.35;
        qx((e.clientX - (b.left + b.width / 2)) * s); qy((e.clientY - (b.top + b.height / 2)) * s);
      };
      const ml = () => { qx(0); qy(0); };
      m.addEventListener("pointermove", mm); m.addEventListener("pointerleave", ml);
      return () => { m.removeEventListener("pointermove", mm); m.removeEventListener("pointerleave", ml); };
    });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up);
      offs.forEach((f) => f());
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={label} /></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
