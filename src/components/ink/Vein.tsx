"use client";

import { useEffect, useRef } from "react";

/** Centre-line of the vermilion vein, measured from the approved comp (1376x768 frame), relative to its box (x 250, y 410, w 936, h 196). */
const PTS: [number, number][] = [
  [262, 424], [280, 446], [306, 465], [340, 474], [380, 469], [420, 456], [452, 448], [478, 451],
  [494, 466], [503, 497], [512, 540], [526, 576], [552, 588], [600, 597], [650, 601], [700, 599],
  [745, 593], [792, 581], [840, 563], [888, 541], [934, 529], [982, 535], [1030, 556], [1076, 578],
  [1104, 584], [1130, 582], [1152, 572], [1166, 556],
];
const BOX = { x: 250, y: 410, w: 936, h: 196 };

function catmull(points: [number, number][], steps = 10) {
  const out: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

export default function Vein({ className, progress }: { className?: string; progress?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const prog = useRef(progress ?? 0);

  useEffect(() => { if (progress !== undefined) prog.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const curve = catmull(PTS.map(([x, y]) => [(x - BOX.x) / BOX.w, (y - BOX.y) / BOX.h]));
    let raf = 0;
    let drawn = reduce ? 1 : 0;
    const start = performance.now() + 450;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      ctx.clearRect(0, 0, W, H);
      const unit = r.width / BOX.w * dpr; // comp px -> canvas px
      const n = Math.max(2, Math.floor(curve.length * Math.min(drawn, prog.current || drawn)));
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      // body: tapering stroke, 12 comp px at the ring, 4 at the action
      for (let i = 1; i < n; i++) {
        const k = i / (curve.length - 1);
        const w = (12 - 8 * Math.pow(k, 0.55)) * unit;
        const [x0, y0] = curve[i - 1], [x1, y1] = curve[i];
        ctx.strokeStyle = "#e5322b"; ctx.lineWidth = w;
        ctx.beginPath(); ctx.moveTo(x0 * W, y0 * H); ctx.lineTo(x1 * W, y1 * H); ctx.stroke();
      }
      // wet sheen along the upper edge
      ctx.globalAlpha = 0.45; ctx.strokeStyle = "#ff8a7a";
      for (let i = 1; i < n; i++) {
        const k = i / (curve.length - 1);
        const w = (12 - 8 * Math.pow(k, 0.55)) * unit;
        const [x0, y0] = curve[i - 1], [x1, y1] = curve[i];
        ctx.lineWidth = Math.max(1, w * 0.22);
        ctx.beginPath(); ctx.moveTo(x0 * W, y0 * H - w * 0.22); ctx.lineTo(x1 * W, y1 * H - w * 0.22); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      if (!reduce && drawn < 1) drawn = Math.min(1, Math.max(0, (now - start) / 1600));
      // ease-out
      const target = drawn;
      drawn = target;
      draw();
      if (drawn < 1 || progress !== undefined) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => draw()); ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [progress]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
