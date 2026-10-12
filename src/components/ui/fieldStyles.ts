import { cn } from '@/utils/cn';

export type FieldState = 'idle' | 'valid' | 'invalid';

/** Shared chrome for text-like controls: ring states for focus, valid and invalid. */
export function fieldControlClasses(state: FieldState): string {
  return cn(
    'w-full rounded-xl border bg-surface text-base text-ink outline-none sm:text-[0.9375rem]',
    'placeholder:text-ink-faint',
    'transition-[box-shadow,border-color,background-color] duration-200 ease-apple',
    'disabled:cursor-not-allowed disabled:bg-ink/[0.04] disabled:text-ink-faint',
    state === 'idle' &&
      'border-line-strong hover:border-ink-faint focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20',
    state === 'valid' && 'border-emerald-500/60 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20',
    state === 'invalid' && 'border-red-500/70 ring-4 ring-red-500/15 focus:border-red-500 focus:ring-red-500/25',
  );
}
