/** Public origin of the site: `SITE_URL` when it is set (another domain, a test), otherwise the real address. */
export function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  return 'https://parkingandfly.ba';
}
