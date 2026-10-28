import { prefersReducedMotion } from '../ui/dom.js';

/**
 * Decides whether the hero gets the Three.js scene, and loads it lazily.
 *
 * The static SVG composition in index.html is always rendered first and stays
 * as the visible layer when any of these apply:
 *   - prefers-reduced-motion: reduce
 *   - viewport narrower than 768px (phones get the lightweight composition)
 *   - Save-Data, ≤2 GB device memory or ≤2 CPU cores
 *   - WebGL unavailable, the module fails to load, or the context is lost
 * Three.js is code-split into its own chunk and fetched only when the hero is
 * on screen and the browser is idle, so it never blocks first render or LCP.
 */
const MIN_WIDTH = '(min-width: 768px)';

function capable() {
  if (prefersReducedMotion()) return false;
  if (!matchMedia(MIN_WIDTH).matches) return false;
  const nav = navigator;
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory && nav.deviceMemory <= 2) return false;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) return false;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    return false;
  }
  return true;
}

const whenIdle = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 400));

export function initHero() {
  const host = document.getElementById('hero-visual');
  if (!host) return;
  let instance = null;
  let loading = false;

  const fallback = () => {
    instance?.dispose();
    instance = null;
    host.classList.remove('has-3d');
  };

  const start = () => {
    if (instance || loading || !capable()) return;
    loading = true;
    whenIdle(async () => {
      try {
        const { createHeroScene } = await import('./scene.js');
        if (!capable()) return; // conditions changed while loading
        instance = createHeroScene(host, { onContextLost: fallback });
        host.classList.add('has-3d');
      } catch (err) {
        console.warn('[hero] 3D scene unavailable, using static composition.', err);
        fallback();
      } finally {
        loading = false;
      }
    });
  };

  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      start();
    }
  }, { rootMargin: '200px' });
  io.observe(host);

  // Respect changes made while the page is open.
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (m) => (m.matches ? fallback() : start()));
  matchMedia(MIN_WIDTH).addEventListener('change', (m) => (m.matches ? start() : fallback()));
}
