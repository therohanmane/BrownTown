# INBrownTown — website

**Real stories from Maharashtra. Real reach for brands.**
*Where every story has a voice.*

Official website for INBrownTown, the Maharashtra community media network founded by
journalist Ayesha Sayyad. Built by PaviqLabs.

> **Status: ready for client review, not launched.** The site has not been deployed
> to a production domain, and enquiry delivery needs owner-supplied credentials.
> See [docs/CLIENT-APPROVALS.md](docs/CLIENT-APPROVALS.md) before going live.

The site serves two audiences and keeps them visibly separate:

* **Journalism and community** — ground interviews, community stories, civic
  explainers and leadership conversations from the YouTube channel.
* **Business promotion** — digital campaigns, creatives, local business
  spotlights and media partnerships. Paid work is always labelled
  *Paid partnership* and never presented as reporting.

---

## Stack

| | Version |
| --- | --- |
| Node.js | ≥ 20.19 (developed on 24.18) |
| Vite | 8.3.5 (dev server + build; the only dev dependency) |
| three | 0.186.1 (hero scene; lazily loaded) |
| Fonts | Self-hosted via Fontsource: Inter, Noto Sans Devanagari, Source Serif 4, Noto Serif Devanagari (variable) |
| Runtime | Plain HTML, CSS and ES modules — no UI framework |
| Backend | One Vercel serverless function: `api/enquiry.js` |

## Commands

```bash
npm ci                 # install exact locked versions
npm run dev            # http://localhost:5173 — includes /api/enquiry
npm test               # server-side enquiry tests (node:test, no extra deps)
npm run build          # production build → dist/
npm run preview        # serve dist/ at http://localhost:4173 with the production
                       # security headers from vercel.json, plus /api/enquiry
npm run check          # test + build
```

Optional, with a YouTube Data API key in `.env`:

```bash
node scripts/sync-youtube-meta.mjs   # writes real durations + publish dates to src/data/video-meta.json
```

## Project layout

```
index.html                 Home page. All core copy and CTAs are real HTML (Marathi by
                           default) with data-i18n keys; JS swaps the language in place.
privacy.html               Privacy notice (draft, English).
api/enquiry.js             Vercel function → server/enquiry-core.js
server/enquiry-core.js     Validation, spam checks, rate limit, delivery (Resend / webhook)
src/main.js                Entry: fonts, styles, module init
src/i18n/strings.js        UI strings — mr, hi, en
src/i18n/index.js          t(), pick(), Devanagari numerals, setLang()
src/data/videos.js         30 verified videos (IDs + original titles), featured list
src/data/video-meta.json   Durations / dates from the sync script (empty until run)
src/data/site.js           Social links, contact, stats, hubs, services, principles,
                           founder, case studies — each with a verification flag
src/ui/*.js                header, theme, stories, modal, coverage, content, enquiry, reveal
src/hero/index.js          Capability gate + lazy loader for the 3D scene
src/hero/scene.js          Three.js scene
src/styles/main.css        Design system and all section styles
public/                    Static files copied as-is (favicon, media/)
scripts/                   sync-youtube-meta.mjs
tests/                     enquiry.test.js
prototypes/                Old, never-loaded modules — not built or deployed (see its README)
docs/AUDIT.md              Audit of the previous code and what changed
docs/CLIENT-APPROVALS.md   Everything that still needs client confirmation
```

## Page structure

1. **Hero** — eyebrow, two-line headline, brand line, summary, *Watch our stories* /
   *Promote your business*, and a proof strip that only states facts the site itself
   shows (30 stories, 6 hubs, 3 languages, platforms). Audience statistics appear
   automatically once marked verified in `src/data/site.js`.
2. **Stories from the ground** — one lead story + four featured, then the full
   catalogue with topic filters and "show more" (8 at a time).
3. **Where we report** — six hubs and a diagram projected from real latitude/longitude.
4. **What INBrownTown does** — journalism track and paid-services track side by side.
5. **Featured work** — honest empty state until approved case studies exist.
6. **Founder** — portrait, quote, biography, field photos.
7. **Principles** — five aims, with no claim of formal policies.
8. **Partner with us** — three-step process and the enquiry form.
9. **Footer** — navigation, verified social links, privacy notice.

## Content rules built into the data

* Video titles are the original YouTube titles (verified via oEmbed on 24 Oct 2026).
  Duration and date render only from `video-meta.json`; the "Newest first" sort
  appears only when every video has a date.
* Anything with `verified: false` / `null` in `src/data/site.js` is not rendered.
* Case studies render only when `client.permission === true`; results only if supplied.
* No view counts, popularity rankings, live counters or testimonials are shown.

## Multilingual

* Marathi (default), Hindi, English. Choice is saved in `localStorage`
  (`inb_brand_lang`), applied before first paint by a tiny inline script, and
  updates `<html lang>` and the document title.
* Switching language updates text in place and keeps the reader's scroll position.
* Marathi/Hindi use Devanagari numerals and taller line-heights so matras never clip.
* Original video titles carry `lang="mr"` for correct screen-reader pronunciation.
* Checked for horizontal overflow at 320, 375, 481, 768, 1024, 1280 and 1440 px in all three languages.

## Three.js hero

`src/hero/scene.js` draws a **broadcast-signal scene**: a lens (glass disc shader with
faint aperture blades, tick ring, rotating orange arc) above a ground plane with six
light nodes placed at the real relative positions of the coverage hubs. Signal trails
rise from each hub into the lens; occasionally an orange pulse travels up one of them.

* Procedural geometry and small custom shaders — no models, textures, lights,
  shadows or post-processing. ~180 dust particles.
* Pixel ratio capped at 1.75; `low-power` GPU preference.
* Renders only while on screen (IntersectionObserver) and while the tab is visible.
* ResizeObserver keeps the aspect correct; the camera pulls back on tall boxes.
* Subtle pointer parallax only on fine-pointer devices; 1.8 s entrance.
* Canvas is `aria-hidden`, `pointer-events: none`, never focusable.
* All geometries/materials/listeners are disposed; WebGL context loss swaps back
  to the static composition (tested).
* Three.js is a separate chunk (~136 kB gzip) loaded when the hero is visible and
  the browser is idle. It is never loaded when any of these apply — the static SVG
  composition in `index.html` is shown instead:
  `prefers-reduced-motion: reduce` · viewport < 768 px · Save-Data · ≤ 2 GB memory or
  ≤ 2 cores · no WebGL.

## Enquiry form → `/api/enquiry`

```
browser validation ─► POST /api/enquiry (JSON) ─► server validation ─► delivery ─► 200 {ok:true}
                                                   honeypot + min fill time         │
                                                   5 req / 10 min per IP             └─► success message
```

* Success is shown **only** after a 200 from the server. 400 → field errors;
  429 → rate-limit message; 503 → "service not available" (no provider configured);
  network/5xx → retry message. The visitor's input is never cleared on failure.
* Nothing is written to `localStorage`. No secrets in frontend code.
* Delivery is chosen by environment variables (see `.env.example`):
  * **Resend** — `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` (domain verified in Resend),
    `ENQUIRY_TO_EMAIL` (comma-separated allowed). Reply-To is the visitor's email.
  * **Webhook** — `ENQUIRY_WEBHOOK_URL` (+ optional `ENQUIRY_WEBHOOK_SECRET`, sent as
    `X-Enquiry-Secret`). Receives `{ type: "partnership_enquiry", receivedAt, …fields }`.
  * Neither set → 503. The site never pretends an enquiry was received.
* Optional `ALLOWED_ORIGINS` rejects cross-origin posts.
* The in-memory rate limit is per serverless instance. For a hard limit add a Vercel
  Firewall rule on `/api/enquiry`.

## Deploying to Vercel

1. Import the repository. `vercel.json` sets framework `vite`, `npm ci`,
   `npm run build`, output `dist`, and the function config.
2. Add environment variables (Production + Preview): one delivery option, and
   `VITE_SITE_URL` once the domain is confirmed (it is read at **build** time —
   redeploy after changing it). Setting it adds canonical, `og:url`, absolute
   `og:image`, JSON-LD `url` and `sitemap.xml`.
3. Security headers (in `vercel.json`): strict CSP (`script-src 'self'` + the hash of
   the inline theme script; frames only from `youtube-nocookie.com`; images from
   `self` and `i.ytimg.com`), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`,
   `Permissions-Policy`, COOP. **If you edit the inline `<script>` in `index.html` /
   `privacy.html`, recompute its SHA-256 and update the CSP** or theme/language
   restore will be blocked.

## Testing done for this version

| Check | Result |
| --- | --- |
| `npm test` (18 server tests: validation, spam, 405/413/415, 503 when unconfigured, 200 only after provider accepts, 502 on provider failure, HTML escaping, rate limit, origin check) | Pass |
| `npm run build` | Pass, no warnings |
| Enquiry end-to-end on the production build → local test webhook | Received payload; success shown only after 200 |
| Enquiry with no provider | Failure message, input kept, nothing stored |
| Production CSP via `npm run preview` | No violations; 3D chunk, fonts, thumbnails load |
| Overflow at 320/375/481/768/1024/1440 px × mr/hi/en | No overflowing elements |
| Video modal | Opens nocookie embed, focus to Close, Escape closes, iframe removed, focus and scroll restored |
| Mobile menu, filters, show-more, language + theme persistence | Working |
| Heading outline, image alts, control names, duplicate IDs | No issues found |
| CLS (PerformanceObserver) | 0.004 |

**Not verified:** actual YouTube playback inside the embed (the test browser could not
show the cross-origin frame), LCP/INP numbers (the test browser was not producing paint
frames reliably — run Lighthouse on a deployed preview), real Resend delivery (no key),
the reduced-motion and no-WebGL branches in a real browser (logic reviewed; the
context-loss fallback was tested), screen readers, and Safari/Firefox.

## Links

* YouTube: https://www.youtube.com/@INBrownTown (verified)
* Instagram: https://www.instagram.com/inbrowntown/ (client-supplied)
* Founder: https://www.instagram.com/ayesha.sayyad/ (client-supplied)

© INBrownTown. Design & engineering by PaviqLabs.
