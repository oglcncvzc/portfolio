"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Entrance: the name rises out of the ink. Scroll: the ring lens swallows the screen and the name parts. */
export default function HeroMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (s: string) => document.querySelector<HTMLElement>(s);
    const hero = q(".hero");
    if (!hero || reduce) { hero?.classList.add("is-in"); return; }

    const ctx = gsap.context(() => {
      const names = [".hero__name--gulcan", ".hero__name--cevizci"];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero__ring, .hero__screen", { scale: 0.35, rotate: -120, opacity: 0, duration: 1.8, transformOrigin: "50% 50%" }, 0.1)
        .from(names, { clipPath: "inset(100% 0% 0% 0%)", yPercent: 28, filter: "blur(14px)", duration: 1.6, stagger: 0.14 }, 0.25)
        .from(".hero__nav", { y: -80, opacity: 0, duration: 1.2 }, 0.5)
        .from(".hero__tagline, .hero__caption--01", { y: 30, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.9)
        .from(".hero__cta", { scale: 0.4, opacity: 0, duration: 1.1, ease: "back.out(2)", stagger: 0.08 }, 1.15)
        .from(".hero__caption--02, .hero__framely", { y: 90, opacity: 0, duration: 1.4, stagger: 0.1 }, 1.2);

      // depth parallax on the name
      const depth = [
        [".hero__name--gulcan", 18], [".hero__name--cevizci", 30], [".hero__ring", -14], [".hero__screen", -14], [".hero__tagline", 8],
      ] as const;
      const movers = depth.map(([sel, d]) => ({ x: gsap.quickTo(sel, "x", { duration: 1.2, ease: "power3" }), y: gsap.quickTo(sel, "y", { duration: 1.2, ease: "power3" }), d }));
      const onMove = (e: PointerEvent) => {
        if (window.scrollY > window.innerHeight * 0.3) return;
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => { m.x(nx * m.d); m.y(ny * m.d * 0.6); });
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // scroll: pin and dive into the lens. Built after the entrance so it records the settled state.
      const buildScroll = () => {
        const st = gsap.timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "+=110%", scrub: 0.8, pin: true, anticipatePin: 1 },
          defaults: { ease: "none" },
        });
        st.fromTo(".hero__name--gulcan", { xPercent: 0, opacity: 1, filter: "blur(0px)" }, { xPercent: 38, opacity: 0, filter: "blur(10px)" }, 0)
          .fromTo(".hero__name--cevizci", { xPercent: 0, opacity: 1, filter: "blur(0px)" }, { xPercent: 60, opacity: 0, filter: "blur(10px)" }, 0)
          .fromTo(".hero__tagline, .hero__caption--01, .hero__ctas", { yPercent: 0, opacity: 1 }, { yPercent: -120, opacity: 0 }, 0)
          .fromTo(".hero__caption--02, .hero__framely", { y: 0, opacity: 1 }, { y: () => -window.innerHeight * 0.25, opacity: 0 }, 0)
          .fromTo(".hero__vein", { opacity: 1 }, { opacity: 0 }, 0)
          .fromTo(".hero__ring, .hero__screen", { x: 0, y: 0, scale: 1, rotate: 0 }, {
            x: () => window.innerWidth * 0.29, y: () => window.innerHeight * 0.08, scale: 2.9, ease: "power2.in",
          }, 0)
          .fromTo(".hero__ring", { opacity: 1 }, { opacity: 0, ease: "power2.in" }, 0.55)
          .fromTo(".hero__screen", { opacity: 1 }, { opacity: 0, ease: "power1.in" }, 0.8);
        ScrollTrigger.refresh();
      };
      tl.eventCallback("onComplete", () => { hero.classList.add("is-in"); buildScroll(); });

      return () => window.removeEventListener("pointermove", onMove);
    }, hero);
    return () => ctx.revert();
  }, []);
  return null;
}
