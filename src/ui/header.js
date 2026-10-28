import { t, getLang, setLang, onLangChange } from '../i18n/index.js';

/** Sticky header state, mobile menu, language switcher and active-section highlighting. */
export function initHeader() {
  const header = document.querySelector('.site-header');
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  // Header shadow once the page has scrolled — a sentinel avoids a scroll listener.
  const sentinel = document.createElement('div');
  sentinel.className = 'scroll-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);

  /* ---- Mobile menu ---- */
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', t(open ? 'menuClose' : 'menuOpen'));
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    mobileNav.hidden = !open;
    header.classList.toggle('menu-open', open);
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  mobileNav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });
  onLangChange(() => setMenu(menuBtn.getAttribute('aria-expanded') === 'true'));

  /* ---- Language switcher ---- */
  const langBtns = [...document.querySelectorAll('.lang-btn')];
  const syncLang = () => langBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === getLang())));
  langBtns.forEach((b) =>
    b.addEventListener('click', () => {
      if (b.dataset.lang === getLang()) return;
      // Keep the reader's place: anchor to the element at the top of the viewport.
      const anchor = document.elementFromPoint(window.innerWidth / 2, 90)?.closest('section, footer');
      const before = anchor?.getBoundingClientRect().top;
      setLang(b.dataset.lang);
      if (anchor && before != null) window.scrollBy(0, anchor.getBoundingClientRect().top - before);
    })
  );
  onLangChange(syncLang);
  syncLang();

  /* ---- Active nav link ---- */
  const links = [...document.querySelectorAll('.primary-nav a, .mobile-nav a')];
  const ids = [...new Set(links.map((a) => a.getAttribute('href').slice(1)))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => {
          const on = a.getAttribute('href') === `#${e.target.id}`;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}
