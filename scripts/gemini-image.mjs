#!/usr/bin/env node
// Dev-only: generate an image with Gemini. Usage:
// node scripts/gemini-image.mjs --prompt-file p.txt --out out.png [--ref ref.png] [--aspect 16:9] [--model name]
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith("--") ? [...acc, [a.slice(2), arr[i + 1]]] : acc), [])
);
for (const f of [".env.local", ".env"]) {
  if (!fs.existsSync(f)) continue;
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]] && m[2]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const key = process.env.GEMINI_API_KEY;
if (!key) { console.error("GEMINI_API_KEY missing (.env.local)"); process.exit(2); }
const prompt = args["prompt-file"] ? fs.readFileSync(args["prompt-file"], "utf8") : args.prompt;
if (!prompt || !args.out) { console.error("need --prompt/--prompt-file and --out"); process.exit(1); }

const models = [args.model, process.env.GEMINI_IMAGE_MODEL, "gemini-3-pro-image-preview", "gemini-2.5-flash-image"].filter(Boolean);
const parts = [{ text: prompt }];
for (const ref of (args.ref || "").split(",").filter(Boolean)) {
  const ext = path.extname(ref).slice(1).replace("jpg", "jpeg");
  parts.push({ inline_data: { mime_type: `image/${ext}`, data: fs.readFileSync(ref).toString("base64") } });
}
const body = { contents: [{ parts }], generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: args.aspect || "16:9", ...(args["image-size"] ? { imageSize: args["image-size"] } : {}) } } };

for (const model of [...new Set(models)]) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) { console.error(`${model}: HTTP ${res.status} ${json.error?.message ?? ""}`.slice(0, 300)); continue; }
  const img = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData || p.inline_data);
  if (!img) { console.error(`${model}: no image in response`); continue; }
  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, Buffer.from((img.inlineData || img.inline_data).data, "base64"));
  fs.writeFileSync(args.out + ".json", JSON.stringify({ model, prompt, ref: args.ref ?? null, aspect: args.aspect || "16:9", createdAt: new Date().toISOString() }, null, 2));
  console.log(`OK ${model} -> ${args.out}`);
  process.exit(0);
}
process.exit(3);
