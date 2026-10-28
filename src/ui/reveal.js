import { prefersReducedMotion } from './dom.js';

/**
 * Short fade-and-rise as blocks enter the viewport. Uses transform/opacity
 * only (no layout shift). Content is visible by default: the hidden state is
 * applied only once JS confirms motion is allowed, and anything already on
 * screen is revealed immediately.
 */
const TARGETS = [
  '.section-head',
  '.featured-grid > *',
  '.catalogue-head',
  '.coverage-figure',
  '.track',
  '#work-body > *',
  '.founder-portrait',
  '.founder-copy',
  '.founder-gallery',
  '.principle',
  '.partner-copy',
  '.form-card'
].join(',');

export function initReveal() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );
  const vh = window.innerHeight;
  document.querySelectorAll(TARGETS).forEach((el, i) => {
    if (el.getBoundingClientRect().top < vh) return; // already visible: leave as-is
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${(i % 4) * 60}ms`);
    io.observe(el);
  });
}
