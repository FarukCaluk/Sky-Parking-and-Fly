import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'onPhoto' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[6px] font-display font-bold uppercase tracking-[0.07em] ' +
  'transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-signal ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-ink shadow-[0_14px_34px_-14px_rgb(255_139_61/0.75)] ' +
    'hover:bg-[color-mix(in_oklab,var(--accent)_86%,white)] hover:shadow-[0_18px_40px_-14px_rgb(255_139_61/0.9)]',
  secondary: 'border border-line-strong text-ink hover:border-ink hover:bg-ink/[0.06]',
  onPhoto: 'border border-white/45 text-white hover:border-white hover:bg-white/10',
  text: 'rounded-none px-0 text-accent-text hover:text-ink',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[1.0625rem]',
  md: 'h-12 px-6 text-[1.125rem]',
  lg: 'h-14 px-8 text-[1.25rem]',
};

export function buttonStyles(options: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}): string {
  const { variant = 'primary', size = 'md', fullWidth, className } = options;
  return cn(base, variants[variant], variant === 'text' ? 'h-auto' : sizes[size], fullWidth && 'w-full', className);
}
