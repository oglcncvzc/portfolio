"use client";

import { useEffect, useRef } from "react";

/**
 * The page's ground: a live ebru bath. The marble plate is loaded into a colour state that is advected
 * by a velocity field. The pointer combs it (permanently, like real marbling), scrolling turns the bath,
 * and the pattern slowly relaxes back toward the plate.
 */
const VERT = `#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }`;

const COPY = `#version 300 es
precision highp float; in vec2 uv; out vec4 o;
uniform sampler2D src; uniform vec2 coverScale; uniform vec2 coverOffset;
void main(){ vec2 s = vec2(uv.x, 1.0-uv.y) * coverScale + coverOffset; o = texture(src, s); }`;

const VEL = `#version 300 es
precision highp float; in vec2 uv; out vec4 o;
uniform sampler2D vel; uniform vec2 texel; uniform float dt;
uniform vec2 pt; uniform vec2 pv; uniform float radius; uniform float aspect;
uniform vec2 swirlC; uniform float swirl;
void main(){
  vec2 v = texture(vel, uv).xy;
  vec2 back = uv - v * dt * texel * 60.0;
  vec2 nv = texture(vel, back).xy * 0.965;
  vec2 d = uv - pt; d.x *= aspect;
  nv += pv * exp(-dot(d,d) / radius);
  vec2 c = uv - swirlC; c.x *= aspect;
  float fall = exp(-dot(c,c) * 2.2);
  nv += vec2(-c.y, c.x) * swirl * fall;
  o = vec4(nv, 0.0, 1.0);
}`;

const ADVECT = `#version 300 es
precision highp float; in vec2 uv; out vec4 o;
uniform sampler2D col; uniform sampler2D vel; uniform sampler2D base;
uniform vec2 texel; uniform float dt; uniform float relax;
uniform vec2 coverScale; uniform vec2 coverOffset;
void main(){
  vec2 v = texture(vel, uv).xy;
  vec2 back = uv - v * dt * texel * 60.0;
  vec4 c = texture(col, back);
  vec4 b = texture(base, vec2(uv.x, 1.0-uv.y) * coverScale + coverOffset);
  o = mix(c, b, relax);
}`;

const SHOW = `#version 300 es
precision highp float; in vec2 uv; out vec4 o;
uniform sampler2D col; uniform float dim; uniform float t; uniform float still;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main(){
  vec4 c = texture(col, uv);
  vec3 g = c.rgb * (1.0 - dim);
  vec2 q = uv - 0.5; g *= 1.0 - dot(q,q) * 0.55 * dim;
  g += (h(uv * 900.0 + floor(t*12.0) * (1.0-still)) - 0.5) * 0.025;
  o = vec4(g, 1.0);
}`;

export default function InkStage({ src = "/textures/marble.webp" }: { src?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) return;
    const half = gl.getExtension("EXT_color_buffer_float");
    if (!half) return;
    gl.getExtension("OES_texture_float_linear");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (fs: string) => {
      const p = gl.createProgram()!;
      const mk = (type: number, s: string) => { const x = gl.createShader(type)!; gl.shaderSource(x, s); gl.compileShader(x); gl.attachShader(p, x); };
      mk(gl.VERTEX_SHADER, VERT); mk(gl.FRAGMENT_SHADER, fs); gl.bindAttribLocation(p, 0, "p"); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link");
      const u: Record<string, WebGLUniformLocation | null> = {};
      return { p, u: (n: string) => (u[n] ??= gl.getUniformLocation(p, n)) };
    };
    let progs: Record<string, ReturnType<typeof compile>>;
    try { progs = { copy: compile(COPY), vel: compile(VEL), adv: compile(ADVECT), show: compile(SHOW) }; } catch { return; }

    const quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const tex = (w: number, h: number, internal: number, format: number, type: number) => {
      const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fb = gl.createFramebuffer()!; gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return { t, fb };
    };
    type Target = { t: WebGLTexture; fb: WebGLFramebuffer };
    let W = 0, H = 0, VW = 0, VH = 0;
    let col: Target[] = [], vel: Target[] = [];
    let base: WebGLTexture | null = null;
    let imgW = 1, imgH = 1;
    const cover = { s: [1, 1], o: [0, 0] };

    const draw = (target: Target | null, w: number, h: number) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fb : null);
      gl.viewport(0, 0, w, h);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const bind = (unit: number, t: WebGLTexture) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); };

    const computeCover = () => {
      const ca = VW / VH, ia = imgW / imgH;
      if (ca > ia) { cover.s = [1, ia / ca]; cover.o = [0, (1 - ia / ca) / 2]; }
      else { cover.s = [ca / ia, 1]; cover.o = [(1 - ca / ia) / 2, 0]; }
    };

    const seed = () => {
      if (!base) return;
      const p = progs.copy; gl.useProgram(p.p);
      bind(0, base); gl.uniform1i(p.u("src"), 0);
      gl.uniform2fv(p.u("coverScale"), cover.s); gl.uniform2fv(p.u("coverOffset"), cover.o);
      draw(col[0], W, H); draw(col[1], W, H);
      for (const v of vel) { gl.bindFramebuffer(gl.FRAMEBUFFER, v.fb); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT); }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      VW = window.innerWidth; VH = window.innerHeight;
      canvas.width = Math.round(VW * dpr); canvas.height = Math.round(VH * dpr);
      const q = Math.min(1, 1400 / Math.max(VW, VH));
      W = Math.round(VW * q); H = Math.round(VH * q);
      col = [tex(W, H, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE), tex(W, H, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE)];
      const vw = Math.round(W / 4), vh = Math.round(H / 4);
      vel = [tex(vw, vh, gl.RG16F, gl.RG, gl.HALF_FLOAT), tex(vw, vh, gl.RG16F, gl.RG, gl.HALF_FLOAT)];
      computeCover(); seed();
    };

    const img = new window.Image(); img.decoding = "async"; img.src = src;
    img.onload = () => {
      imgW = img.naturalWidth; imgH = img.naturalHeight;
      base = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, base);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resize();
      canvas.dataset.ready = "1";
      document.documentElement.dataset.ink = "live";
    };
    let resizeT = 0;
    const onResize = () => { clearTimeout(resizeT); resizeT = window.setTimeout(resize, 150); };
    window.addEventListener("resize", onResize);

    const ptr = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, active: false };
    const onMove = (e: PointerEvent) => {
      ptr.x = e.clientX / window.innerWidth; ptr.y = 1 - e.clientY / window.innerHeight; ptr.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let lastScroll = window.scrollY, swirl = 0;
    let raf = 0, t0 = performance.now(), visible = true;
    const onVis = () => { visible = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", onVis);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!base || !visible || !W) return;
      const sy = window.scrollY; const ds = sy - lastScroll; lastScroll = sy;
      swirl += ((still ? 0 : Math.max(-60, Math.min(60, ds)) * 0.0009) - swirl) * 0.12;
      const dim = Math.min(0.62, Math.max(0, (sy / Math.max(1, VH) - 0.35) * 0.9));

      let pvx = 0, pvy = 0;
      if (ptr.active && !still) { pvx = (ptr.x - ptr.px) * 9; pvy = (ptr.y - ptr.py) * 9; }
      ptr.px = ptr.x; ptr.py = ptr.y;

      const vw = Math.round(W / 4), vh = Math.round(H / 4);
      let p = progs.vel; gl.useProgram(p.p);
      bind(0, vel[0].t); gl.uniform1i(p.u("vel"), 0);
      gl.uniform2f(p.u("texel"), 1 / vw, 1 / vh); gl.uniform1f(p.u("dt"), 0.016);
      gl.uniform2f(p.u("pt"), ptr.x, ptr.y); gl.uniform2f(p.u("pv"), pvx, pvy);
      gl.uniform1f(p.u("radius"), 0.0035); gl.uniform1f(p.u("aspect"), VW / VH);
      gl.uniform2f(p.u("swirlC"), 0.24, 0.55); gl.uniform1f(p.u("swirl"), swirl);
      draw(vel[1], vw, vh); vel.reverse();

      p = progs.adv; gl.useProgram(p.p);
      bind(0, col[0].t); gl.uniform1i(p.u("col"), 0);
      bind(1, vel[0].t); gl.uniform1i(p.u("vel"), 1);
      bind(2, base); gl.uniform1i(p.u("base"), 2);
      gl.uniform2f(p.u("texel"), 1 / vw, 1 / vh); gl.uniform1f(p.u("dt"), 0.016);
      gl.uniform1f(p.u("relax"), 0.0016);
      gl.uniform2fv(p.u("coverScale"), cover.s); gl.uniform2fv(p.u("coverOffset"), cover.o);
      draw(col[1], W, H); col.reverse();

      p = progs.show; gl.useProgram(p.p);
      bind(0, col[0].t); gl.uniform1i(p.u("col"), 0);
      gl.uniform1f(p.u("dim"), dim); gl.uniform1f(p.u("t"), (now - t0) / 1000); gl.uniform1f(p.u("still"), still ? 1 : 0);
      draw(null, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      delete document.documentElement.dataset.ink;
    };
  }, [src]);

  return <canvas ref={ref} className="ink-stage" aria-hidden="true" />;
}
