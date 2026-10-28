import { t, onLangChange } from '../i18n/index.js';

const KEY = 'inb_brand_theme'; // same key as the previous site

const isDark = () => {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit === 'dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
};

export function initTheme() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;

  const sync = () => {
    const dark = isDark();
    btn.setAttribute('aria-label', t(dark ? 'themeToLight' : 'themeToDark'));
    btn.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b111d' : '#101827');
  };

  btn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
    sync();
  });

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);
  onLangChange(sync);
  sync();
}
