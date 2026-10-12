import { CURRENCY_LABEL } from '@/data/pricing';

const GROUP = new Intl.NumberFormat('en-US', { useGrouping: true, maximumFractionDigits: 0 });

/** Format a KM amount the way it is written locally: `1.250 KM`, `12,50 KM`. */
export function formatKM(amount: number, options: { withCurrency?: boolean } = {}): string {
  const { withCurrency = true } = options;
  const rounded = Math.round((Number.isFinite(amount) ? amount : 0) * 100) / 100;
  const negative = rounded < 0;
  const abs = Math.abs(rounded);
  const whole = Math.trunc(abs);
  const cents = Math.round((abs - whole) * 100);
  const integer = GROUP.format(whole).replace(/,/g, '.');
  const body = cents === 0 ? integer : `${integer},${String(cents).padStart(2, '0')}`;
  return `${negative ? '−' : ''}${body}${withCurrency ? ` ${CURRENCY_LABEL}` : ''}`;
}

/** Bosnian plural: 1 dan / 2–4 dana / 5+ dana (21 dan, 22 dana, 11 dana). */
export function pluralBs(count: number, forms: readonly [one: string, few: string, many: string]): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

/** `7 dana`, `1 dan`, `22 dana` */
export function formatDays(count: number): string {
  return `${count} ${pluralBs(count, ['dan', 'dana', 'dana'])}`;
}

export function formatServices(count: number): string {
  return `${count} ${pluralBs(count, ['usluga', 'usluge', 'usluga'])}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/** Local number format: `52.000`, `4,9`. */
export function formatNumberBs(value: number, decimals = 0): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole = '0', fraction] = fixed.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${value < 0 ? '−' : ''}${grouped}${fraction ? `,${fraction}` : ''}`;
}
