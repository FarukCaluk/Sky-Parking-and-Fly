import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

type BadgeTone = 'neutral' | 'brand' | 'solid' | 'success' | 'warning' | 'glass';

interface BadgeProps extends ComponentPropsWithRef<'span'> {
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-ink/[0.06] text-ink-muted',
  brand: 'bg-accent-soft text-accent',
  solid: 'bg-brand-600 text-white',
  success: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  glass: 'border border-white/15 bg-white/10 text-white/90 backdrop-blur-md',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-[-0.005em]',
        tones[tone],
        className,
      )}
    />
  );
}
