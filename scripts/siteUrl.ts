/** Public origin of the site: `SITE_URL` for a custom domain, else Vercel's production URL, else the default one. */
export function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercel ? `https://${vercel}` : 'https://sky-parking-and-fly.vercel.app';
}
