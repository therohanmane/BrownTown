import { STRINGS } from './strings.js';

export const LANGS = ['mr', 'hi', 'en'];
const STORAGE_KEY = 'inb_brand_lang'; // same key as the previous site, so saved choices survive
const listeners = new Set();

const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

let current = LANGS.includes(safeGet(STORAGE_KEY)) ? safeGet(STORAGE_KEY) : 'mr';

export const getLang = () => current;

/** Looks up a UI string, falling back to English, then to the key itself. */
export function t(key, vars) {
  let s = STRINGS[current]?.[key] ?? STRINGS.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

/** Picks the current-language value from a { mr, hi, en } object. */
export function pick(obj) {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  return obj[current] ?? obj.en ?? obj.mr ?? '';
}

/** Formats a number with Devanagari digits for Marathi/Hindi. */
export function num(n) {
  const locale = current === 'en' ? 'en-IN' : `${current}-IN-u-nu-deva`;
  return new Intl.NumberFormat(locale).format(n);
}

/** Applies translations to every [data-i18n] / [data-i18n-attr] node under root. */
export function applyStatic(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    for (const pair of el.dataset.i18nAttr.split(';')) {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    }
  });
  root.querySelectorAll('[data-i18n-num]').forEach((el) => {
    el.textContent = num(Number(el.dataset.i18nNum));
  });
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setLang(lang, { persist = true } = {}) {
  if (!LANGS.includes(lang)) return;
  current = lang;
  if (persist) safeSet(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  document.title = t('docTitle');
  applyStatic();
  listeners.forEach((fn) => fn(lang));
}
