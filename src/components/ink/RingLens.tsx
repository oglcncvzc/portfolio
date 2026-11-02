"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p * 0.5 + 0.5; uv.y = 1.0 - uv.y; gl_Position = vec4(p, 0.0, 1.0); }`;

// The ring is the ebru O: its ink keeps flowing along the band, and the pointer combs it.
const FRAG = `#version 300 es
precision highp float;
in vec2 uv; out vec4 o;
uniform sampler2D ring; uniform float t; uniform vec2 m; uniform float mStrength; uniform float still;
vec2 hash(vec2 p){ p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(dot(hash(i),f), dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x), mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)), dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
void main(){
  vec2 c = uv - 0.5;
  float a = atan(c.y, c.x);
  float r = length(c);
  float flow = (1.0 - still) * t * 0.06;
  // ink drifts along the band (tangential), with a slow radial breath
  vec2 tangential = vec2(-sin(a), cos(a));
  float n = noise(vec2(a * 2.0 + flow * 6.0, r * 9.0 - flow * 2.0));
  vec2 d = tangential * n * 0.012 * (1.0 - still) + c * noise(vec2(a*3.0, flow*3.0)) * 0.006 * (1.0 - still);
  // comb: pull the ink toward the pointer
  vec2 toM = m - uv; float fall = exp(-dot(toM,toM) * 40.0);
  d += normalize(toM + 1e-4) * fall * 0.03 * mStrength;
  o = texture(ring, uv + d);
}`;

export default function RingLens({ className, src = "/textures/ring-o.webp" }: { className?: string; src?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false, alpha: true, antialias: true });
    if (!gl) { canvas.dataset.fallback = "1"; return; }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0;

    const sh = (type: number, s: string) => { const x = gl.createShader(type)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.dataset.fallback = "1"; return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uT = U("t"), uM = U("m"), uMS = U("mStrength"), uStill = U("still");
    gl.uniform1f(uStill, still);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const tex = gl.createTexture();
    let ready = false;
    const img = new window.Image(); img.decoding = "async"; img.src = src;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true; canvas.dataset.ready = "1";
    };

    const size = () => {
      const dpr = Math.min((window.devicePixelRatio || 1) * 2.4, 4);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(canvas);

    const mouse = { x: 0.5, y: 0.5, s: 0, ts: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width; mouse.y = (e.clientY - r.top) / r.height; mouse.ts = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const t0 = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!ready || !visible) return;
      mouse.s += (mouse.ts - mouse.s) * 0.08; mouse.ts *= 0.96;
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.uniform1f(uMS, still ? 0 : mouse.s);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, [src]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
