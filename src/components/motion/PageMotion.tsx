"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One motion grammar for the page: ink rises (chars), the bath drags (marquee), cards stack, the lens opens, words light up. */
export default function PageMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.querySelector<HTMLElement>(".progress i");

    const ctx = gsap.context(() => {
      // scroll progress vein
      if (bar) gsap.to(bar, { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
      if (reduce) return;

      // headings: characters rise out of the ink
      gsap.utils.toArray<HTMLElement>(".work__title, .caps__title, .contact__title, .proj__title").forEach((el) => {
        gsap.from(el.querySelectorAll(".split__c"), {
          yPercent: 115, rotate: 8, opacity: 0, filter: "blur(6px)", duration: 1.1, ease: "expo.out", stagger: 0.022,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      // marquee: base drift plus scroll velocity, skewed by speed
      const rows = gsap.utils.toArray<HTMLElement>(".marquee__row");
      const state = rows.map((row) => ({ row, track: row.querySelector<HTMLElement>(".marquee__track")!, x: 0, dir: Number(row.dataset.dir) || -1 }));
      let vel = 0;
      ScrollTrigger.create({ onUpdate: (s) => { vel = s.getVelocity(); } });
      const tick = () => {
        vel *= 0.92;
        const boost = gsap.utils.clamp(-14, 14, vel / 220);
        state.forEach((s) => {
          const w = s.track.scrollWidth / 2 || 1;
          s.x += (0.9 + Math.abs(boost)) * s.dir * (vel < 0 ? -1 : 1);
          if (s.x <= -w) s.x += w;
          if (s.x > 0) s.x -= w;
          s.track.style.transform = `translate3d(${s.x}px,0,0) skewX(${-boost * 0.9}deg)`;
        });
      };
      gsap.ticker.add(tick);

      // work: cards stack, the one underneath sinks and shades
      const cards = gsap.utils.toArray<HTMLElement>(".proj");
      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>(".proj__card")!;
        const lens = card.querySelector<HTMLElement>(".proj__lens")!;
        const visual = card.querySelector<HTMLElement>(".proj__visual")!;
        gsap.fromTo(lens, { clipPath: "circle(12% at 50% 50%)" }, {
          clipPath: "circle(75% at 50% 50%)", ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 15%", scrub: 0.6 },
        });
        gsap.fromTo(visual, { scale: 1.25, rotate: -4 }, {
          scale: 1, rotate: 0, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 10%", scrub: 0.6 },
        });
        if (i < cards.length - 1) {
          gsap.to(inner, {
            scale: 0.9, yPercent: -2, "--shade": 0.6, ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top 65%", end: "top top", scrub: true },
          });
        }
      });

      // about: words light up as you read
      const words = gsap.utils.toArray<HTMLElement>(".about__w");
      if (words.length) {
        gsap.to(words, {
          opacity: 1, stagger: 0.08, ease: "none",
          scrollTrigger: { trigger: ".about__body", start: "top 80%", end: "bottom 45%", scrub: 0.5 },
        });
      }

      // cv: the ring turns with the scroll
      gsap.fromTo(".cv__ring", { rotate: -60, scale: 0.7 }, { rotate: 40, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".cv", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".cv__title", { yPercent: 40, opacity: 0, scale: 0.9, ease: "expo.out", duration: 1.4, scrollTrigger: { trigger: ".cv", start: "top 70%" } });

      // contact button drops in like ink
      gsap.from(".contact__btn", { scale: 0, rotate: -40, duration: 1.4, ease: "elastic.out(1, 0.55)", scrollTrigger: { trigger: ".contact__btn", start: "top 95%" } });

      return () => gsap.ticker.remove(tick);
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { ctx.revert(); window.removeEventListener("load", refresh); };
  }, []);
  return null;
}
