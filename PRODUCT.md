# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript, deployed on Vercel. Bilingual routes `/tr` and `/en`. Repo: https://github.com/oglcncvzc/portfolio

## Users

1. **Consulting clients (primary):** founders, small businesses and agencies looking for someone to build a web product or an AI feature end to end. They arrive from a shared link or LinkedIn, skim on a phone or laptop, and decide whether to start a conversation.
2. **Recruiters and hiring engineers (secondary):** scan in under a minute for role, stack, depth and a CV; engineers may open repos and live demos.

Turkish and international audiences both; every page exists in Turkish and English.

## Product Purpose

Personal portfolio of Oğulcan Cevizci, a full-stack engineer who does a lot of AI development. It introduces him, shows shipped work as case studies, demonstrates frontend craft through the site itself, and turns visitors into consulting conversations or interview invitations. Success = a visitor contacts him or downloads the CV.

## Positioning

A single engineer who ships the whole thing: real-time product UI, backend/integrations, and AI pipelines (LLM orchestration, image/video generation, live voice agents), including work in production for real clubs and businesses. The site itself is the proof of frontend skill.

## Operating Context

- Visitors come from links in DMs, LinkedIn, GitHub profile and CV.
- Projects are pulled from GitHub (github.com/oglcncvzc). Private repositories are shown as projects without code links (labelled "Private"); a live demo or a faithful mock screen rebuilt from the code stands in.
- The CV section ships with a placeholder; the owner uploads and updates the PDF later.

## Capabilities and Constraints

- Identity on the site: name + title ("Full-Stack & AI Engineer"). Do **not** name the current employer.
- Selected projects (scored for interest; older 2022–2023 school/test repos excluded). Labels: **Personal**, **Corporate work** (has a live link), **Corporate / internal** (no link) (no link; never name the employer or its clients).
  - Corporate / internal: Hotel Review AI (shown name; internally GAI Hotel / TurQualist + HotelPriceScope) (hotel review intelligence and price tracking; owner built the first prototypes and worked on the frontend, most TurQualist commits are a teammate's; real hotel/client names must be anonymised), Framely (AI product image & video studio on fal.ai: Nano Banana, Seedream, FLUX Kontext, Kling, Topaz; owner led the frontend), Falaxy (AI fortune-telling "fal" app, Expo + FastAPI + OpenAI), AI Influencer Automation Platform (SanalInfluencer; frontend), Decor paint calculator (colour clustering, Pantone matching).
  - Personal / live: Coach-Panel (flagship, first project), cassette players (metallicasette, manifest-bmo).
  - PhiTalk (Gemini Live voice assistant) is corporate/internal; PhiAI (the Spline 3D company site, live at https://phitech.ai/) is corporate work. They are separate projects.
  - Corporate / internal (owner rule: any project without a live link is labelled corporate/internal): QR Menu System (rule-based mood recommendations, not an LLM).
  - Corporate work (live): PhiAI, Black Books & Coffee QR menu (built for a family member's café), live at https://blackbookscoffee.netlify.app/.
- Only live links are shown on project cards; no code links.
- Excluded by owner: glass colour prediction.
- Corporate projects have no real screenshots that can be shown; mocks are rebuilt from code descriptions with anonymised data. Do not reuse competitor screenshots, stock module images, or any image that shows client names or network paths.
- Capabilities section must describe what he can build: web products end to end, real-time apps, AI image/video generation pipelines, LLM features, voice agents, mobile apps (Expo/React Native), and data/ML tools.
- Open: contact channels (email, LinkedIn, phone), city, years of experience, experience timeline — to be supplied by the owner; do not invent.

## Brand Commitments

- Name: Oğulcan Cevizci. Title: Full-Stack & AI Engineer.
- Owner asked for a very high-end, highly animated site that shows off frontend skills.

## Evidence on Hand

- Case-study data: scratchpad `projects.json` (GitHub) and `local-projects.json` (local projects) from the research pass; to be copied into the site's content files.
- Falaxy imagery: `~/FortuneTeller/FAL/assets/hero.png`, `assets/tarot.png`, `~/Downloads/FAL.jpeg` (logo).
- Live: Coach-Panel (https://www.kocpaneli.online/), PhiAI (https://phitech.ai/), Black Books & Coffee (https://blackbookscoffee.netlify.app/), Metallica cassette (https://oglcncvzc.github.io/metallicasette/).
- Source code for every selected project in GitHub.
- Absent: testimonials, client logos, metrics, CV file. Never fabricate these.

## Product Principles

1. Show the work running; every project gets a real or faithfully rebuilt screen, not a stock thumbnail.
2. Consulting first, hiring close behind: the path to "let's talk" is never more than one scroll away, and the CV is one click away.
3. The site is a frontend case study in itself: motion and interaction are deliberate and performant, never decoration for its own sake.
4. Bilingual parity: Turkish and English carry the same content and quality.
5. Only true claims; private work is described, not exposed.

## Accessibility & Inclusion

WCAG 2.2 AA; `prefers-reduced-motion` must get a calm, complete version of every animated section.
