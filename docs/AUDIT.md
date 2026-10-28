# Repository audit — 24 October 2026

Audit of the site as it stood at commit `ec26a67`, before the v2 rebuild. Written
first, then acted on; the "Outcome" column says what the rebuild did about each item.

## Architecture found

| Item | Finding |
| --- | --- |
| Entry point | `index.html` loaded four classic scripts: `config.js` → `data.js` → `channel.js` → `app.js`. Every section was an empty `<section>` filled by `innerHTML` at runtime, so the page had no real content without JS. |
| Rendering | `channel.js` (74 KB) rebuilt the **entire page** on every language change (`renderAll`), and each rebuild re-registered the scroll listener and the REC-timer `setInterval` — listeners and intervals accumulated with every switch. |
| Styles | `main.css`, `components.css`, `showcase.css` (63 KB) loaded; `admin.css` and `modules.css` unused. Google Fonts via CSS `@import` (render-blocking). |
| Build / deploy | No package manager or build. `vercel.json` served the repo root statically. `server.ps1` was a local static server with no real path-traversal guard (`Join-Path` with `..` segments). |
| Unused modules | `adminCMS.js`, `aiAssistant.js`, `citizenDesk.js`, `liveMap.js`, `router.js`, `store.js`, `ui.js` were **not loaded** by `index.html` but were deployed as public files. They depend on `INB_STORE` (localStorage state) and Leaflet, which are never loaded. |

## Bugs and risks

| # | Finding | Outcome |
| --- | --- | --- |
| 1 | **Two `handleInquirySubmit()` methods** in `channel.js`; the second overrode the first. The active one replaced the form with "✅ Inquiry Successfully Received! Our team will contact you within 24 hours" **without sending anything anywhere**. The dead first version wrote enquiries (name, phone, email) to `localStorage`. | Replaced by one workflow: client validation → `POST /api/enquiry` (Vercel function) → server validation, spam checks, rate limit → delivery via Resend or webhook. Success shown only on HTTP 200. Nothing stored in the browser. 18 server tests. |
| 2 | Success card echoed user input through `innerHTML` (self-XSS). Video titles were injected into inline `onclick="...('${title}')"` handlers. | All dynamic rendering uses a DOM builder (`textContent` / `setAttribute`); no `innerHTML` with data anywhere. |
| 3 | `filterVideos()` defined twice; `filterAndScrollVideos()` called but never defined ("View all" buttons threw). `renderTestimonials()` read a non-existent `testimonials` array. | Rewritten catalogue; filters/"show more" tested. |
| 4 | Video modal used `youtube.com/embed`, had no focus management, no dialog semantics, no Escape handling of its own beyond a global listener. | Native `<dialog>`, `youtube-nocookie.com`, iframe created on play and destroyed on close, focus returned to the trigger, scroll locked and restored. |
| 5 | Structured data pointed at `https://inbrowntown.com/assets/logo.png`; **no logo file exists** in the repo, and README-listed `logo.svg` / `favicon.svg` were missing. | JSON-LD generated at build time without a logo until the official file is supplied. Favicon made from the site's existing "IN" monogram. |
| 6 | **`inbrowntown.com` does not resolve in DNS** (checked 24 Oct 2026). Canonical/JSON-LD URL and `partner@inbrowntown.com` therefore point at a non-existent domain. | Canonical, `og:url`, absolute OG image and sitemap are emitted only when `VITE_SITE_URL` is set. Email not displayed. |
| 7 | OG image was an Unsplash stock photo. | Replaced with `public/media/og-card.jpg` built from the founder photo and brand colours. |
| 8 | Hero showed "● ON AIR • LIVE REPORTING", a running REC timecode and an "audio waveform" — implying a live broadcast/audio that does not exist. | Removed. The hero now has a static brand eyebrow and a Three.js scene with no audio imagery. |
| 9 | Maharashtra "vector map" in the hero was an invented path. | Replaced with a lat/long-projected diagram explicitly captioned as *not* a boundary map. |

## Content-integrity findings

* **Unverifiable claims removed or hidden:** "connect you with **lakhs/millions of customers**" (`लाखो ग्राहकांशी`), "thousands of **high-intent** customers", "**100% Verified Community Reach**", "**Measurable ROI** … transparent, trackable", "direct foot traffic", "Ad posters ready in 24–48 hrs • Free quote within 24 hours", "issues get solved by the administration", "premier/leading platform" (`अग्रगण्य`), "fact-checked explainers" (README).
* **Statistics** (1.8k YouTube subscribers, 4.8k Instagram followers, 381 videos, 200+ interviews, 5+ years) could not be checked against the live channels. Kept in `src/data/site.js` with `verified: null`; not rendered.
* **Video metadata:** all 30 YouTube IDs verified via YouTube oEmbed as belonging to channel *Brown Town* (`@INBrownTown`). The previous Hindi/English "titles" were translations presented as titles; originals are now shown. Durations, view counts, "popular" flags and relative dates ("4 weeks ago") could not be verified and were removed. Several per-video summaries described content the titles do not support, so they were removed; faithful title glosses were written for the five featured stories only.
* **Contact details** (FC Road address, `+91 98230 99887`, `partner@inbrowntown.com`) unverified — not displayed.
* **Facebook / X** links unverified — not displayed.
* **Privacy / Terms / Editorial Standards** footer links all scrolled to "Who we are" — no such pages existed.

## Deployment & Three.js feasibility

The classic-script setup had no way to pull a versioned Three.js without a CDN
script tag. A minimal Vite setup (one dev dependency) gives a locked
`three@0.186.1`, code-splitting so Three.js loads only when needed, hashed assets,
and is zero-config on Vercel. The page logic was moved to ES modules; no UI
framework was introduced.
