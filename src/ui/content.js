import { JOURNALISM, BUSINESS, CASE_STUDIES, PRINCIPLES, FOUNDER, SOCIAL, CONTACT, STATS } from '../data/site.js';
import { t, pick, num, onLangChange } from '../i18n/index.js';
import { h, clear, icon, safeUrl } from './dom.js';

/* ---------- Services ---------- */
function renderServices() {
  const item = (s, paid) =>
    h('li', { class: 'service' },
      h('span', { class: 'service-icon' }, icon(s.icon)),
      h('div', {},
        h('h4', {}, pick(s.title), s.onRequest ? h('span', { class: 'tag', text: t('onRequest') }) : null),
        h('p', { text: pick(s.desc) })
      )
    );
  const j = document.getElementById('journalism-list');
  const b = document.getElementById('business-list');
  if (j) clear(j).append(...JOURNALISM.map((s) => item(s)));
  if (b) clear(b).append(...BUSINESS.map((s) => item(s, true)));
}

/* ---------- Work / case studies ---------- */
function renderWork() {
  const root = document.getElementById('work-body');
  if (!root) return;
  const approved = CASE_STUDIES.filter((c) => c.client?.permission === true);

  if (!approved.length) {
    clear(root).append(
      h('div', { class: 'work-empty' },
        h('div', { class: 'work-empty-copy' },
          h('h3', { text: t('workEmptyTitle') }),
          h('p', { text: t('workEmptyBody') }),
          h('a', { class: 'btn btn-primary', href: '#partner' }, h('span', { text: t('workCta') }), icon('arrow'))
        ),
        h('div', { class: 'work-spec' },
          h('p', { class: 'paid-badge', text: t('paidLabel') }),
          h('h4', { text: t('workIncludesTitle') }),
          h('ol', {}, ['workIncl1', 'workIncl2', 'workIncl3', 'workIncl4', 'workIncl5'].map((k) => h('li', { text: t(k) })))
        )
      )
    );
    return;
  }

  clear(root).append(
    h('ul', { class: 'case-grid' },
      approved.map((c) =>
        h('li', { class: 'case' },
          c.image ? h('img', { src: c.image, alt: pick(c.imageAlt), loading: 'lazy', decoding: 'async', width: 800, height: 600 }) : null,
          h('div', { class: 'case-body' },
            h('p', { class: 'paid-badge', text: t('paidLabel') }),
            h('h3', { text: c.client.name }),
            h('dl', {},
              h('dt', { text: t('workObjective') }), h('dd', { text: pick(c.objective) }),
              h('dt', { text: t('workServices') }), h('dd', { text: c.services.map((s) => t(`svc_${s}`)).join(', ') }),
              h('dt', { text: t('workApproach') }), h('dd', { text: pick(c.approach) }),
              c.results ? [h('dt', { text: t('workResults') }), h('dd', { text: pick(c.results) })] : null
            )
          )
        )
      )
    )
  );
}

/* ---------- Founder ---------- */
function renderFounder() {
  document.getElementById('founder-name').textContent = pick(FOUNDER.name);
  document.getElementById('founder-role').textContent = pick(FOUNDER.role);
  document.getElementById('founder-quote').textContent = pick(FOUNDER.quote);
  document.getElementById('founder-bio').textContent = pick(FOUNDER.bio);
  document.getElementById('founder-photo').alt = pick(FOUNDER.name);
  const g = document.getElementById('founder-gallery');
  if (g) {
    clear(g).append(
      ...FOUNDER.gallery.map((img) =>
        h('li', {}, h('img', { src: img.src, width: img.w, height: img.h, alt: pick(img.alt), loading: 'lazy', decoding: 'async' }))
      )
    );
  }
}

/* ---------- Principles ---------- */
function renderPrinciples() {
  const list = document.getElementById('principle-list');
  if (list) {
    clear(list).append(
      ...PRINCIPLES.map((p, i) =>
        h('li', { class: 'principle' },
          h('span', { class: 'principle-num', 'aria-hidden': 'true', text: num(i + 1).padStart(2, num(0)) }),
          h('h3', { text: pick(p.title) }),
          h('p', { text: pick(p.desc) })
        )
      )
    );
  }
  const note = document.getElementById('principles-note');
  if (note) note.replaceChildren(...handleText('trustNote'));
  const ed = document.getElementById('editorial-note');
  if (ed) ed.replaceChildren(...handleText('editorialNote'));
}

/** Renders a string containing {handle} with the Instagram handle as a real link. */
function handleText(key) {
  const [before, after = ''] = t(key).split('{handle}');
  return [
    before,
    h('a', { href: safeUrl(SOCIAL.instagram.url), target: '_blank', rel: 'noopener', text: SOCIAL.instagram.handle }),
    after
  ];
}

/* ---------- Proof strip: verified channel stats only ---------- */
function renderProof() {
  const strip = document.getElementById('proof-strip');
  if (!strip) return;
  strip.querySelectorAll('[data-stat]').forEach((n) => n.remove());
  for (const s of STATS.filter((x) => x.verified)) {
    strip.prepend(h('div', { dataset: { stat: s.id } }, h('dt', { text: s.value }), h('dd', { text: pick(s.label) })));
  }
}

/* ---------- Footer ---------- */
function renderFooter() {
  const list = document.getElementById('social-list');
  const links = [
    ['youtube', 'YouTube', SOCIAL.youtube],
    ['instagram', 'Instagram', SOCIAL.instagram]
  ].filter(([, , s]) => s.verified);
  if (list) {
    clear(list).append(
      ...links.map(([ic, label, s]) =>
        h('li', {},
          h('a', { href: safeUrl(s.url), target: '_blank', rel: 'noopener' },
            icon(ic), h('span', { text: `${label} ${s.handle}` }), h('span', { class: 'visually-hidden', text: ` ${t('newTab')}` })))
      )
    );
  }
  const c = document.getElementById('footer-contact');
  if (c) {
    const bits = [pick(CONTACT.city.value)];
    if (CONTACT.email.verified && CONTACT.email.value) bits.push(h('a', { href: `mailto:${CONTACT.email.value}`, text: CONTACT.email.value }));
    if (CONTACT.phone.verified && CONTACT.phone.value) bits.push(h('a', { href: `tel:${CONTACT.phone.value.replace(/\s/g, '')}`, text: CONTACT.phone.value }));
    bits.push(t('footerContactBody'));
    c.replaceChildren(...bits.flatMap((b, i) => (i ? [h('br'), b] : [b])));
  }
  const cr = document.getElementById('footer-copyright');
  if (cr) cr.textContent = t('footerCopyright', { year: new Date().getFullYear() });
}

function renderAll() {
  renderServices();
  renderWork();
  renderFounder();
  renderPrinciples();
  renderProof();
  renderFooter();
}

export function initContent() {
  renderAll();
  onLangChange(renderAll);
}
