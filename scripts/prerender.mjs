// Draws every page of the site into its own HTML file (run by `npm run build`, after the two Vite builds).
//
// Phones get the finished page in the first response: text, photograph and layout are there before any JavaScript has
// been downloaded, and React attaches to the markup afterwards (src/main.tsx). The same files give search engines and
// link previews the right title, description and language versions for every address.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolveSiteUrl } from './siteUrl.ts';

// The production build of React: faster, and the markup is the one the browser's React expects
process.env.NODE_ENV = 'production';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const origin = resolveSiteUrl();
const builtAt = new Date();

const { pagesToRender, render } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

/** Replace exactly one thing in the template, or stop: a changed index.html must not quietly lose a feature. */
function swap(html, pattern, replacement, what) {
  const found = html.match(pattern);
  if (!found) throw new Error(`prerender: ${what} not found in dist/index.html`);
  return html.replace(pattern, () => replacement);
}

const escape = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// The stylesheet goes into every page: the first paint then waits for nothing but the HTML itself
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!cssLink) throw new Error('prerender: stylesheet link not found in dist/index.html');
const css = (await readFile(path.join(dist, cssLink[1]), 'utf8')).trim();

// The scripts leave the <head>: while the page is being painted nothing but the page itself may use the connection (a
// phone on a slow network would otherwise spend its first seconds on code it does not need yet). A few lines at the end
// of the body fetch the code as soon as the first paint is done, and React then attaches to the finished markup.
const entry = template.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
if (!entry) throw new Error('prerender: main script not found in dist/index.html');
const mainImports = [...template.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">/g)].map((m) => m[1]);

const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'));

/** The URLs of a chunk and of everything it imports. */
function chunkUrls(key, seen = new Set()) {
  const chunk = manifest[key];
  if (!chunk) throw new Error(`prerender: ${key} is not in the build manifest`);
  if (!seen.has(key)) {
    seen.add(key);
    chunk.imports?.forEach((imported) => chunkUrls(imported, seen));
  }
  return [...seen].map((k) => `/${manifest[k].file}`);
}

/**
 * The code a page needs, listed so that it is fetched all at once (instead of one chunk after the other as each one
 * reveals what it imports): the main script's own imports, the page's chunk and the footer.
 */
function loaderFor(page) {
  const urls = new Set([
    ...mainImports,
    ...(page.chunk ? chunkUrls(page.chunk) : []),
    ...chunkUrls('src/components/layout/Footer.tsx'),
  ]);
  urls.delete(entry);
  const list = JSON.stringify([...urls]);
  return `<script>(function(){var d,m=${list},s=${JSON.stringify(entry)};function go(){if(d)return;d=1;m.forEach(function(h){var l=document.createElement("link");l.rel="modulepreload";l.crossOrigin="";l.href=h;document.head.appendChild(l)});import(s)}try{new PerformanceObserver(function(l,o){if(l.getEntriesByName("first-contentful-paint").length){o.disconnect();setTimeout(go)}}).observe({type:"paint",buffered:true})}catch(e){}addEventListener("load",function(){setTimeout(go,3e3)})})()</script>`;
}

let count = 0;
for (const page of pagesToRender()) {
  const { html, head, heroPreload } = await render(page, origin, builtAt);

  const tags = [
    `<meta name="description" content="${escape(head.description)}">`,
    `<meta property="og:locale" content="${head.ogLocale}">`,
    `<meta property="og:site_name" content="${escape(head.siteName)}">`,
    `<meta property="og:title" content="${escape(head.title)}">`,
    `<meta property="og:description" content="${escape(head.description)}">`,
    head.canonical ? `<meta property="og:url" content="${head.canonical}">` : '',
    head.noindex ? '<meta name="robots" content="noindex">' : '',
    head.canonical ? `<link rel="canonical" href="${head.canonical}">` : '',
    ...head.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`),
    ...heroPreload.map(
      (p) =>
        `<link rel="preload" as="image" type="image/avif" fetchpriority="high" media="${p.media}" imagesizes="100vw" imagesrcset="${p.srcset}">`,
    ),
    `<style>${css}</style>`,
  ].filter(Boolean);

  let out = template;
  out = swap(
    out,
    /<html lang="[^"]*">/,
    `<html lang="${head.lang}" data-built="${builtAt.toISOString()}">`,
    'html tag',
  );
  out = swap(
    out,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escape(head.title)}</title>\n    ${tags.join('\n    ')}`,
    'title',
  );
  out = swap(out, /<link rel="stylesheet"[^>]*>\s*/, '', 'stylesheet link');
  out = swap(out, /<div id="root"><\/div>/, `<div id="root">${html}</div>`, 'root element');
  out = swap(out, /<script type="module" crossorigin src="[^"]+"><\/script>\s*/, '', 'main script');
  out = swap(out, /(<link rel="modulepreload"[^>]*>\s*)+/, '', 'module preloads');
  out = swap(out, /<\/body>/, `${loaderFor(page)}\n  </body>`, 'end of body');

  const file = path.join(dist, page.file);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, out);
  count += 1;
}

// The manifest was only for this script, it is not part of the site
await rm(path.join(dist, '.vite'), { recursive: true, force: true });

console.log(`prerendered ${count} pages for ${origin}`);
