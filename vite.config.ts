import type { IncomingMessage, ServerResponse } from 'node:http';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { loadEnv, type Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { resolveSiteUrl } from './scripts/siteUrl.ts';
import { LANGS, pathFor, ROUTE_IDS } from './src/router/routes.ts';

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

      const entries = ROUTE_IDS.filter((route) => route !== 'confirmed').flatMap((route) =>
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

/**
 * Serves api/reservation.ts (the mail function) while developing and in `vite preview`, the way Vercel serves it in
 * production. Its settings (SMTP_*, RESERVATION_EMAIL, MAIL_DRY_RUN) are read from .env.local into process.env.
 */
function mailApi(): Plugin {
  type Handler = { fetch: (request: Request) => Promise<Response> };

  const serve =
    (load: () => Promise<Handler>) =>
    async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const headers = new Headers();
        for (const [name, value] of Object.entries(req.headers)) {
          if (typeof value === 'string') headers.set(name, value);
        }
        const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
        const request = new Request(`http://${req.headers.host ?? 'localhost'}/api/reservation`, {
          method: req.method,
          headers,
          body: hasBody ? Buffer.concat(chunks) : undefined,
        });
        const response = await (await load()).fetch(request);
        res.statusCode = response.status;
        response.headers.forEach((value, name) => res.setHeader(name, value));
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch (error) {
        console.error('[api/reservation]', error);
        res.statusCode = 500;
        res.end();
      }
    };

  return {
    name: 'spf-mail-api',
    config(_config, { mode }) {
      for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), ''))) process.env[key] ??= value;
    },
    configureServer(server) {
      server.middlewares.use(
        '/api/reservation',
        serve(async () => (await server.ssrLoadModule('/api/reservation.ts')).default as Handler),
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use(
        '/api/reservation',
        serve(async () => ((await import(pathToFileURL('api/reservation.ts').href)) as { default: Handler }).default),
      );
    },
  };
}

/**
 * Three ways in: `vite` (development), `vite build` (the browser bundle in dist/) and `vite build --ssr` (the same
 * pages, which `scripts/prerender.mjs` draws into the HTML files of dist/; see `npm run build`).
 */
export default defineConfig(({ command, isSsrBuild, isPreview }) => ({
  // `vite preview` serves the prerendered pages (/cijene is cijene.html), as the host does; in development every address is the app
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [react(), tailwindcss(), ...(isSsrBuild ? [] : [seoFiles()]), mailApi()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    __SITE_URL__: JSON.stringify(command === 'build' ? resolveSiteUrl() : ''),
  },
  build: {
    target: 'es2022',
    // The two small font files go into the stylesheet itself (the other assets keep Vite's default limit)
    assetsInlineLimit: (file) => (file.endsWith('.woff2') ? true : undefined),
    // Lists the file behind every chunk; scripts/prerender.mjs uses it to have the browser fetch a page's code early
    manifest: !isSsrBuild,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 220,
    rollupOptions: {
      output: {
        // Keep React in a long-lived vendor chunk; everything else (incl. Framer Motion's lazily loaded
        // feature bundle and every page) is split by the bundler along dynamic-import boundaries.
        manualChunks: isSsrBuild
          ? undefined
          : (id: string) => (/node_modules\/(react|react-dom|scheduler)\//.test(id) ? 'react' : undefined),
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}));
