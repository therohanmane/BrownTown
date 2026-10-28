# Prototypes — not part of the website

These files were in the original repository but were never loaded by the
site. They are kept for reference only. Nothing in this folder is bundled or
deployed: Vite builds only what `index.html` / `privacy.html` import, plus
`public/`.

| File | What it was | Why it is not live |
| --- | --- | --- |
| `js/adminCMS.js`, `css/admin.css` | Newsroom "CMS" with article editor, moderation, help queue and ads tabs | No authentication or server — all "admin" state lived in `localStorage`, which anyone can edit. Must never be exposed on a public route. |
| `js/citizenDesk.js` | "Report an issue" wizard and an emergency help board | No backend, moderation, privacy controls or owner. Publishing it would imply urgent requests reach someone. |
| `js/aiAssistant.js` | Reader Q&A chat | Canned responses only; no model, no grounding. |
| `js/liveMap.js`, `css/modules.css` | Leaflet map | Leaflet was never loaded; depends on the store below. |
| `js/store.js`, `js/router.js`, `js/ui.js` | localStorage state store, hash router, renderer for the above | Only used by the prototypes. Several renderers interpolate stored data into `innerHTML`. |

Before any of these become real features they need: server-side
authentication/authorisation (for anything editorial), a database, moderation,
a privacy notice covering the data collected, and a named owner who responds.
