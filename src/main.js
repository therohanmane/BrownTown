/**
 * INBrownTown — application entry.
 * Self-hosted fonts (no third-party font requests): Inter for Latin UI,
 * Noto Sans Devanagari for Marathi/Hindi, Source Serif 4 + Noto Serif
 * Devanagari for editorial headlines. Fontsource splits each family by
 * unicode-range, so browsers download only the scripts a page actually uses.
 */
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-devanagari';
import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/noto-serif-devanagari';
import './styles/main.css';

import { getLang, setLang } from './i18n/index.js';
import { initTheme } from './ui/theme.js';
import { initHeader } from './ui/header.js';
import { initVideoModal } from './ui/modal.js';
import { initStories } from './ui/stories.js';
import { initCoverage } from './ui/coverage.js';
import { initContent } from './ui/content.js';
import { initEnquiry } from './ui/enquiry.js';
import { initReveal } from './ui/reveal.js';
import { initHero } from './hero/index.js';

function boot() {
  // Apply the saved/default language to the static markup before anything renders.
  setLang(getLang(), { persist: false });
  initTheme();
  initHeader();
  initVideoModal();
  initStories();
  initCoverage();
  initContent();
  initEnquiry();
  initReveal();
  initHero();
  document.documentElement.classList.add('js-ready');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
