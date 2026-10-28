import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { handleEnquiryRequest } from './server/enquiry-core.js';

/**
 * Mounts the same enquiry handler Vercel runs at /api/enquiry on the Vite dev
 * and preview servers, so the real form workflow can be exercised locally.
 */
function enquiryApi(env) {
  const mount = (server) => {
    server.middlewares.use('/api/enquiry', (req, res) => handleEnquiryRequest(req, res, env));
  };
  return { name: 'inb-enquiry-api', configureServer: mount, configurePreviewServer: mount };
}

/**
 * Site-URL dependent metadata. The public domain has not been confirmed yet,
 * so canonical / og:url / absolute image URLs / sitemap are emitted only when
 * VITE_SITE_URL is set at build time. Without it the tags are omitted rather
 * than pointing at an unverified domain.
 */
function siteMeta(siteUrl) {
  const base = siteUrl ? siteUrl.replace(/\/+$/, '') : '';
  return {
    name: 'inb-site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const page = ctx.path === '/privacy.html' ? '/privacy' : '/';
        const tags = base
          ? [
              `<link rel="canonical" href="${base}${page}">`,
              `<meta property="og:url" content="${base}${page}">`,
              `<meta property="og:image" content="${base}/media/og-card.jpg">`,
              `<meta name="twitter:image" content="${base}/media/og-card.jpg">`
            ].join('\n    ')
          : '<!-- canonical/og:url omitted: set VITE_SITE_URL once the public domain is confirmed -->';
        // Organization data: only facts confirmed so far. The YouTube channel was
        // verified via YouTube oEmbed; other profiles and the official logo file
        // are added once the client confirms them (see docs/CLIENT-APPROVALS.md).
        const org = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'INBrownTown',
          ...(base ? { url: base + '/' } : {}),
          founder: { '@type': 'Person', name: 'Ayesha Sayyad' },
          areaServed: 'Maharashtra, India',
          sameAs: ['https://www.youtube.com/@INBrownTown']
        };
        const jsonLd = `<script type="application/ld+json">${JSON.stringify(org)}</script>`;
        return html.replace('<!--SITE_META-->', tags).replace('<!--JSON_LD-->', page === '/' ? jsonLd : '');
      }
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/'];
      if (base) robots.push('', `Sitemap: ${base}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });
      if (base) {
        const urls = ['/', '/privacy'].map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
        });
      }
    }
  };
}

/** Global security headers from vercel.json, so `vite preview` behaves like production (CSP included). */
function productionHeaders() {
  const cfg = JSON.parse(readFileSync(resolve(import.meta.dirname, 'vercel.json'), 'utf8'));
  const global = cfg.headers.find((h) => h.source === '/(.*)');
  // upgrade-insecure-requests would rewrite http://localhost requests to https, so drop it locally.
  return Object.fromEntries((global?.headers || []).map((h) => [h.key, h.value.replace(/;\s*upgrade-insecure-requests/, '')]));
}

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  return {
    plugins: [enquiryApi(env), siteMeta(env.VITE_SITE_URL)],
    build: {
      target: 'es2020',
      outDir: 'dist',
      assetsInlineLimit: 2048,
      // three.js is a lazily loaded chunk (~136 kB gzip) that never blocks first render.
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          privacy: resolve(import.meta.dirname, 'privacy.html')
        }
      }
    },
    server: { port: 5173 },
    preview: { port: 4173, headers: productionHeaders() }
  };
});
