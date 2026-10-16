import { CURRENCY_LABEL } from '../data/pricing.ts';
import type { Lang } from '../router/routes.ts';

/** Thousands and decimal separators per language. */
const SEPARATORS: Record<Lang, { group: string; decimal: string }> = {
  bs: { group: '.', decimal: ',' },
  de: { group: '.', decimal: ',' },
  en: { group: ',', decimal: '.' },
};

/** `52.000` (bs/de) or `52,000` (en); `decimals` fixes the number of fraction digits. */
export function formatNumber(value: number, lang: Lang, decimals = 0): string {
  const { group, decimal } = SEPARATORS[lang];
  const safe = Number.isFinite(value) ? value : 0;
  const [whole = '0', fraction] = Math.abs(safe).toFixed(decimals).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, group);
  const negative = safe < 0 && Number(Math.abs(safe).toFixed(decimals)) !== 0;
  return `${negative ? '-' : ''}${grouped}${fraction ? `${decimal}${fraction}` : ''}`;
}

/** Format a KM amount: `1.250 KM`, `12,50 KM` (bs/de) or `1,250 KM`, `12.50 KM` (en). Whole amounts drop the cents. */
export function formatKM(amount: number, lang: Lang, options: { withCurrency?: boolean } = {}): string {
  const { withCurrency = true } = options;
  const rounded = Math.round((Number.isFinite(amount) ? amount : 0) * 100) / 100;
  const hasCents = Math.round(Math.abs(rounded) * 100) % 100 !== 0;
  const body = formatNumber(rounded, lang, hasCents ? 2 : 0);
  return withCurrency ? `${body} ${CURRENCY_LABEL}` : body;
}
