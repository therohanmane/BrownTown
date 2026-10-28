# Client approvals and owner-supplied items

Everything here is **blocking for public launch** unless marked optional. Each item
names the file to change once it is confirmed.

## 1. Credentials and deployment (owner-supplied)

| Item | Why | Where |
| --- | --- | --- |
| Enquiry delivery provider — **either** a Resend account with a verified sending domain (`RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL`) **or** an HTTPS webhook (`ENQUIRY_WEBHOOK_URL`, optional `ENQUIRY_WEBHOOK_SECRET`) | Without one, `/api/enquiry` answers 503 and visitors see "service not available". Live delivery through Resend has **not** been tested (no key). The webhook path was tested end-to-end against a local receiver. | Vercel → Project → Environment Variables |
| Production domain | `inbrowntown.com` did not resolve in DNS on 24 Oct 2026. | `VITE_SITE_URL` (build-time) |
| `ALLOWED_ORIGINS` (recommended) | Restricts who can POST to the enquiry endpoint. | Vercel env |
| Vercel Firewall rate-limit rule on `/api/enquiry` (recommended) | The built-in limiter is per-instance and best-effort. | Vercel dashboard |
| YouTube Data API key (optional) | Enables real durations, publish dates and the "Newest first" sort. | `.env` → `node scripts/sync-youtube-meta.mjs` |

## 2. Facts to confirm

| Item | Current state | Where |
| --- | --- | --- |
| **Official logo file** (SVG preferred) | Not in the repo. Site uses a text wordmark + the existing "IN" monogram. A field photo shows a "BROWN TOWN · WORD TO WORD" badge — is that the official mark? | `public/`, header/footer in `index.html`, JSON-LD in `vite.config.js` |
| **Brand name** | Site says "INBrownTown"; the YouTube channel is titled "Brown Town" (handle `@INBrownTown`). Confirm the public-facing name. | copy in `src/i18n/strings.js` |
| Channel statistics (1.8k / 4.8k / 381 / 200+) | Hidden (`verified: null`). | `src/data/site.js` → `STATS` |
| Instagram `@inbrowntown` and `@ayesha.sayyad` | Shown (client-supplied) but not independently verified. | `src/data/site.js` → `SOCIAL` |
| Facebook / X accounts | Hidden. | `src/data/site.js` → `SOCIAL` |
| Public email / phone | Hidden; footer points to the form. | `src/data/site.js` → `CONTACT` |
| "Pune, Maharashtra" as home base | Shown, from the previous README ("Pune HQ"). | `CONTACT.city`, `HUBS` |
| Six coverage hubs | From the previous README. | `src/data/site.js` → `HUBS` |
| Founder biography — **"previously worked with ABP Majha and TV9 Marathi"** | Shown as supplied in the previous site. Please confirm wording. | `src/data/site.js` → `FOUNDER.bio` |
| Founder quote | Carried over (English lightly edited for tone). | `FOUNDER.quote` |
| Higher-resolution founder portrait | Current file is 320×320 px — soft on high-DPI screens. | `public/media/` |
| Permission to show the field photos (guests are identifiable) | Used in "From the field". | `FOUNDER.gallery` |
| English/Hindi glosses of the five featured titles | Written for this rebuild; please review. | `src/data/videos.js` → `gloss` |
| Video categories | Carried over; some "explainers" are speeches / political analysis, now labelled "Public affairs". | `src/data/videos.js` |

## 3. Services and policies to confirm

| Item | Current state |
| --- | --- |
| Sponsored interviews / video features | Listed as **"On request"**. Remove if not offered. |
| Formal PR services (press releases, media relations, reputation management) | **Not advertised**, per brief. |
| Budget bands in the enquiry form (under ₹10k … above ₹50k) | Placeholder ranges; optional field. Adjust or remove. |
| Editorial principles (5) | Phrased as aims ("how we aim to work"); no formal fact-check or corrections policy is claimed. Approve wording. |
| Privacy notice (`/privacy`) | Draft describing what the code actually does; English only; needs legal/owner review and a privacy contact. |
| Terms of service, formal editorial standards / corrections policy | Not created — no links shown. |
| Case studies | None published. Supply work with client permission (see the `CASE_STUDIES` schema in `src/data/site.js`). |
| News-tip channel | Editorial suggestions are pointed to Instagram DMs. Confirm, or provide a dedicated address. |
