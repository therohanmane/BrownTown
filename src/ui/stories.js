import { VIDEOS, FEATURED_IDS, CATEGORIES } from '../data/videos.js';
import META from '../data/video-meta.json';
import { t, getLang, num, onLangChange } from '../i18n/index.js';
import { h, clear, icon, YT_ID_RE } from './dom.js';
import { openVideo } from './modal.js';

const PAGE = 8;
const state = { category: 'all', sort: 'curated', visible: PAGE };

/** Merge verified metadata (from scripts/sync-youtube-meta.mjs) when present. */
const videos = VIDEOS.filter((v) => YT_ID_RE.test(v.youtubeId)).map((v, order) => {
  const m = META.videos?.[v.youtubeId] || {};
  return { ...v, order, durationSeconds: m.durationSeconds ?? null, publishedAt: m.publishedAt ?? null };
});
const byId = new Map(videos.map((v) => [v.youtubeId, v]));
const hasDates = videos.length > 0 && videos.every((v) => v.publishedAt);

export const videoById = (id) => byId.get(id);

function formatDuration(sec) {
  if (!Number.isFinite(sec) || sec <= 0) return '';
  const hrs = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = String(sec % 60).padStart(2, '0');
  const raw = hrs ? `${hrs}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
  return getLang() === 'en' ? raw : raw.replace(/\d/g, (d) => num(Number(d)));
}

function formatDate(iso) {
  if (!iso) return '';
  const lang = getLang();
  const locale = lang === 'en' ? 'en-IN' : `${lang}-IN-u-nu-deva`;
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

function thumb(v, lead) {
  const base = `https://i.ytimg.com/vi/${v.youtubeId}`;
  const img = h('img', {
    src: `${base}/hqdefault.jpg`,
    srcset: lead
      ? `${base}/mqdefault.jpg 320w, ${base}/hqdefault.jpg 480w, ${base}/sddefault.jpg 640w`
      : `${base}/mqdefault.jpg 320w, ${base}/hqdefault.jpg 480w`,
    sizes: lead ? '(min-width: 1024px) 720px, 100vw' : '(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw',
    width: 480,
    height: 270,
    alt: '',
    loading: lead ? 'eager' : 'lazy',
    decoding: 'async',
    fetchpriority: lead ? 'high' : null
  });
  // sddefault is missing for some uploads; fall back to the always-present hqdefault.
  img.addEventListener('error', () => {
    if (img.srcset) { img.removeAttribute('srcset'); img.src = `${base}/hqdefault.jpg`; }
  }, { once: true });
  return img;
}

function storyCard(v, { lead = false, tag = 'article', heading = 'h4' } = {}) {
  const lang = getLang();
  const duration = formatDuration(v.durationSeconds);
  const date = formatDate(v.publishedAt);
  const gloss = lang !== 'mr' && v.gloss?.[lang];

  const media = h(
    'button',
    {
      type: 'button',
      class: 'story-media',
      'aria-label': t('playLabel', { title: v.title }),
      onclick: (e) => openVideo(v, e.currentTarget)
    },
    thumb(v, lead),
    h('span', { class: 'play-badge', 'aria-hidden': 'true' }, icon('play'), lead ? h('span', { text: t('play') }) : null),
    duration ? h('span', { class: 'duration', 'aria-hidden': 'true', text: duration }) : null
  );

  const metaBits = [
    h('span', { class: 'story-cat', text: t(`cat_${v.category}`) }),
    duration ? h('span', { class: 'visually-hidden', text: duration }) : null,
    date ? h('time', { datetime: v.publishedAt, text: date }) : null
  ];

  return h(
    tag,
    { class: `story-card${lead ? ' story-lead' : ''}` },
    media,
    h(
      'div',
      { class: 'story-body' },
      lead ? h('p', { class: 'story-kicker', text: t('leadStory') }) : null,
      h('p', { class: 'story-meta' }, metaBits),
      h(heading, { class: 'story-title', lang: 'mr', text: v.title }),
      gloss ? h('p', { class: 'story-gloss' }, h('span', { class: 'visually-hidden', text: `${t('translatedTitle')}: ` }), gloss) : null,
      h(
        'a',
        { class: 'story-yt', href: `https://www.youtube.com/watch?v=${v.youtubeId}`, target: '_blank', rel: 'noopener' },
        icon('youtube'),
        h('span', { text: t('onYoutube') }),
        h('span', { class: 'visually-hidden', text: ` ${t('newTab')}` })
      )
    )
  );
}

function renderFeatured() {
  const root = document.getElementById('featured-stories');
  if (!root) return;
  const items = FEATURED_IDS.map((id) => byId.get(id)).filter(Boolean);
  clear(root).append(
    ...items.map((v, i) => storyCard(v, { lead: i === 0, heading: 'h3' }))
  );
}

function renderFilters() {
  const group = document.getElementById('filter-group');
  if (!group) return;
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, videos.filter((v) => v.category === c).length]));
  const make = (id, label, count) =>
    h(
      'button',
      {
        type: 'button',
        class: 'chip',
        'aria-pressed': String(state.category === id),
        onclick: () => {
          state.category = id;
          state.visible = PAGE;
          renderFilters();
          renderGrid();
        }
      },
      h('span', { text: label }),
      h('span', { class: 'chip-count', text: num(count) })
    );
  clear(group).append(
    make('all', t('catAll'), videos.length),
    ...CATEGORIES.filter((c) => counts[c]).map((c) => make(c, t(`cat_${c}`), counts[c]))
  );
}

function currentList() {
  let list = state.category === 'all' ? videos : videos.filter((v) => v.category === state.category);
  if (state.sort === 'latest' && hasDates) list = [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return list;
}

function renderGrid({ focusFrom } = {}) {
  const grid = document.getElementById('video-grid');
  const more = document.getElementById('show-more');
  const count = document.getElementById('catalogue-count');
  if (!grid) return;
  const list = currentList();
  const shown = list.slice(0, state.visible);
  clear(grid).append(
    ...(shown.length
      ? shown.map((v) => h('li', {}, storyCard(v, { tag: 'article' })))
      : [h('li', { class: 'empty', text: t('noResults') })])
  );
  count.textContent = t('showingCount', { shown: num(shown.length), total: num(list.length) });
  more.hidden = shown.length >= list.length;
  if (focusFrom != null) grid.children[focusFrom]?.querySelector('.story-media')?.focus();
}

export function initStories() {
  renderFeatured();
  renderFilters();
  renderGrid();

  document.getElementById('show-more')?.addEventListener('click', () => {
    const from = state.visible;
    state.visible += PAGE;
    renderGrid({ focusFrom: from });
  });

  const sortControl = document.getElementById('sort-control');
  const sortSelect = document.getElementById('sort-select');
  if (hasDates && sortControl && sortSelect) {
    sortControl.hidden = false;
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      renderGrid();
    });
  }

  onLangChange(() => {
    renderFeatured();
    renderFilters();
    renderGrid();
  });
}
