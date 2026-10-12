import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] ' +
  'transition-[transform,background-color,box-shadow,color,border-color,opacity] duration-300 ease-apple ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_8px_22px_-8px_rgb(0_113_227/0.75)] ' +
    'hover:bg-brand-700 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_12px_30px_-8px_rgb(0_113_227/0.85)] active:bg-brand-800',
  secondary: 'bg-ink/[0.06] text-ink hover:bg-ink/[0.1] active:bg-ink/[0.14]',
  ghost: 'text-accent hover:bg-accent-soft active:bg-accent-soft',
  glass:
    'border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/30 hover:bg-white/20 active:bg-white/25',
  inverse: 'bg-ink text-canvas hover:opacity-90 active:opacity-80',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
};

export function buttonStyles(options: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}): string {
  const { variant = 'primary', size = 'md', fullWidth, className } = options;
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
}
