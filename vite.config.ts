import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { LANGS, pathFor, ROUTE_IDS } from './src/router/routes.ts';

/** Public origin used for the sitemap. Set `SITE_URL` for a custom domain; Vercel's production URL is used otherwise. */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel}` : 'https://sky-parking-and-fly.vercel.app';
}

/**
 * Emits `sitemap.xml` (every page in every language, with hreflang alternates) and `robots.txt` from the route table,
 * and writes the public origin into the absolute URLs that social cards and structured data need (`__SITE_URL__`).
 */
function seoFiles(): Plugin {
  return {
    name: 'spf-seo-files',
    transformIndexHtml(html, ctx) {
      return html.replaceAll('__SITE_URL__', ctx.server ? '' : resolveSiteUrl());
    },
    generateBundle() {
      const site = resolveSiteUrl();
      const loc = (lang: (typeof LANGS)[number], route: (typeof ROUTE_IDS)[number]) => `${site}${pathFor(lang, route)}`;

      const entries = ROUTE_IDS.flatMap((route) =>
        LANGS.map((lang) => {
          const alternates = [
            ...LANGS.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${loc(code, route)}"/>`),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('bs', route)}"/>`,
          ].join('\n');
          return `  <url>\n    <loc>${loc(lang, route)}</loc>\n${alternates}\n  </url>`;
        }),
      );

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 220,
    rollupOptions: {
      output: {
        // Keep React in a long-lived vendor chunk; everything else (incl. Framer Motion's lazily loaded
        // feature bundle and every page) is split by the bundler along dynamic-import boundaries.
        manualChunks(id: string) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
          return undefined;
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
