import { HUBS } from '../data/site.js';
import { t, pick, onLangChange } from '../i18n/index.js';
import { h, s, clear, icon } from './dom.js';
import { videoById } from './stories.js';
import { openVideo } from './modal.js';

/**
 * Equirectangular projection centred on Maharashtra (~19°N). Longitude is
 * scaled by cos(19°) so distances keep their real proportions. This plots
 * relative positions only — there is deliberately no state outline, because
 * we do not ship a verified boundary dataset.
 */
const W = 640, H = 440, K = 55, LAT0 = 15.8, LON0 = 72.4, X0 = 130, Y0 = 390;
const COS = Math.cos((19 * Math.PI) / 180);
export const project = ({ lat, lon }) => ({ x: X0 + (lon - LON0) * K * COS, y: Y0 - (lat - LAT0) * K });

// Label placement chosen to avoid overlaps between the closely spaced western hubs.
const LABEL = {
  mumbai: { dx: -12, dy: 4, anchor: 'end' },
  pune: { dx: -12, dy: 18, anchor: 'end' },
  baramati: { dx: 12, dy: 14, anchor: 'start' },
  nashik: { dx: 12, dy: -6, anchor: 'start' },
  nagpur: { dx: 0, dy: -18, anchor: 'middle' },
  kolhapur: { dx: 12, dy: 6, anchor: 'start' }
};

function diagram() {
  const base = HUBS.find((x) => x.base);
  const b = project(base);
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': t('coverageFigure'), class: 'coverage-svg' });

  // Graticule every 2° as faint reference lines (true lat/long positions).
  const grid = s('g', { class: 'cv-grid' });
  for (let lat = 16; lat <= 22; lat += 2) {
    const y = project({ lat, lon: LON0 }).y;
    grid.append(s('line', { x1: 40, x2: W - 30, y1: y, y2: y }), s('text', { x: 36, y: y + 4, 'text-anchor': 'end', text: `${lat}°N` }));
  }
  for (let lon = 73; lon <= 80; lon += 2) {
    const x = project({ lat: LAT0, lon }).x;
    grid.append(s('line', { x1: x, x2: x, y1: 30, y2: H - 30 }), s('text', { x, y: H - 14, 'text-anchor': 'middle', text: `${lon}°E` }));
  }
  svg.append(grid);

  const links = s('g', { class: 'cv-links' });
  const nodes = s('g', { class: 'cv-nodes' });
  for (const hub of HUBS) {
    const p = project(hub);
    if (!hub.base) {
      const mx = (p.x + b.x) / 2, my = Math.min(p.y, b.y) - Math.hypot(p.x - b.x, p.y - b.y) * 0.25;
      links.append(s('path', { d: `M${b.x} ${b.y} Q${mx} ${my} ${p.x} ${p.y}` }));
    }
    const l = LABEL[hub.id] || { dx: 10, dy: 4, anchor: 'start' };
    nodes.append(
      s('g', { class: `cv-node${hub.base ? ' is-base' : ''}`, transform: `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})` },
        hub.base ? s('circle', { class: 'cv-halo', r: 16 }) : null,
        s('circle', { r: hub.base ? 7 : 5 }),
        s('text', { x: l.dx, y: l.dy, 'text-anchor': l.anchor, text: pick(hub.name) })
      )
    );
  }
  svg.append(links, nodes);
  return svg;
}

function hubList() {
  return HUBS.map((hub) => {
    const story = hub.storyId && videoById(hub.storyId);
    return h(
      'li',
      { class: `hub${hub.base ? ' is-base' : ''}` },
      icon('pin'),
      h('div', {},
        h('p', { class: 'hub-name' }, pick(hub.name), hub.base ? h('span', { class: 'hub-tag', text: t('coverageBase') }) : null),
        h('p', { class: 'hub-region', text: pick(hub.region) }),
        story
          ? h('button', { type: 'button', class: 'hub-story', onclick: (e) => openVideo(story, e.currentTarget) },
              icon('play'), h('span', { text: t('coverageStory') }))
          : null
      )
    );
  });
}

function render() {
  const d = document.getElementById('coverage-diagram');
  const list = document.getElementById('hub-list');
  if (d) clear(d).append(diagram());
  if (list) clear(list).append(...hubList());
}

export function initCoverage() {
  render();
  onLangChange(render);
}
