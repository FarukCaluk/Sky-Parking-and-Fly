import type { ComponentPropsWithRef, ElementType, PointerEvent as ReactPointerEvent } from 'react';
import { usePointerGlow } from '@/hooks/usePointerGlow';
import { cn } from '@/utils/cn';

type CardVariant = 'solid' | 'outline' | 'tinted';

interface CardProps extends ComponentPropsWithRef<'div'> {
  as?: ElementType;
  variant?: CardVariant;
  /** Lift, spotlight and border glow on hover. */
  interactive?: boolean;
  padded?: boolean;
}

const variants: Record<CardVariant, string> = {
  solid: 'border-line bg-surface shadow-card',
  outline: 'border-line-strong bg-transparent',
  tinted: 'border-transparent bg-ink/[0.04]',
};

export function Card({
  as: Tag = 'div',
  variant = 'solid',
  interactive = false,
  padded = true,
  className,
  onPointerMove,
  ...props
}: CardProps) {
  const track = usePointerGlow<HTMLElement>();
  return (
    <Tag
      {...props}
      onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
        if (interactive) track(event);
        onPointerMove?.(event);
      }}
      className={cn(
        'rounded-[1.75rem] border',
        variants[variant],
        padded && 'p-6 sm:p-7',
        interactive &&
          'spotlight glow-border transition-transform duration-500 ease-apple hover:-translate-y-0.5 motion-reduce:transform-none',
        className,
      )}
    />
  );
}
