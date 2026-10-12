import type { ComponentPropsWithRef, ElementType, PointerEvent as ReactPointerEvent } from 'react';
import { usePointerGlow } from '@/hooks/usePointerGlow';
import { cn } from '@/utils/cn';

type Tone = 'light' | 'dark';

interface GlassContainerProps extends ComponentPropsWithRef<'div'> {
  as?: ElementType;
  /** `light` follows the theme (frosted white / zinc); `dark` stays dark — for use on the cinematic hero. */
  tone?: Tone;
  /** Cursor-following border glow on hover. */
  glow?: boolean;
}

const tones: Record<Tone, string> = {
  light:
    'border-white/60 bg-white/70 dark:border-white/10 dark:bg-zinc-900/80 ' +
    'shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_24px_60px_-20px_rgb(0_0_0/0.35)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_24px_60px_-20px_rgb(0_0_0/0.7)]',
  dark: 'border-white/10 bg-zinc-900/60 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_24px_60px_-24px_rgb(0_0_0/0.8)]',
};

/** Frosted-glass surface: blur, saturated backdrop, hairline border and an inner highlight. */
export function GlassContainer({
  as: Tag = 'div',
  tone = 'light',
  glow = false,
  className,
  onPointerMove,
  ...props
}: GlassContainerProps) {
  const track = usePointerGlow<HTMLElement>();
  return (
    <Tag
      {...props}
      onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => {
        if (glow) track(event);
        onPointerMove?.(event);
      }}
      className={cn(
        'rounded-[1.75rem] border backdrop-blur-md backdrop-saturate-150',
        tones[tone],
        glow && 'glow-border',
        className,
      )}
    />
  );
}
