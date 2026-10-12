import { useId } from 'react';
import { cn } from '@/utils/cn';
import { LOGO_COLORS, LOGO_PATHS, MARK_TRANSFORM, WORDMARK_VIEWBOX } from './logoPaths';

/** Rounded dark-teal tile shared by the mark and the full logo. */
function Tile({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={LOGO_COLORS.tileFrom} />
          <stop offset="1" stopColor={LOGO_COLORS.tileTo} />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${id}-bg)`} />
      <rect width="512" height="512" rx="112" fill={`url(#${id}-gloss)`} />
    </>
  );
}

/** Compact mark: the brushed "Sky" on the teal tile. Legible down to favicon size. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      className={cn('size-9 shrink-0 drop-shadow-[0_6px_14px_rgb(4_49_59/0.35)]', className)}
    >
      <Tile id={id} />
      <path d={LOGO_PATHS.sky} transform={MARK_TRANSFORM} fill="#fff" />
    </svg>
  );
}

/** The complete logo exactly as supplied: Sky / PARKING&FLY / SARAJEVO on the tile. Use from ~5rem upwards. */
export function LogoFull({ className, label }: { className?: string; label: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 512 512"
      role="img"
      aria-label={label}
      className={cn('size-24 shrink-0 drop-shadow-[0_10px_24px_rgb(4_49_59/0.3)]', className)}
    >
      <Tile id={id} />
      <path d={LOGO_PATHS.sky} fill="#fff" />
      <path d={LOGO_PATHS.parking} fill={LOGO_COLORS.teal} />
      <path d={LOGO_PATHS.amp} fill={LOGO_COLORS.orange} />
      <path d={LOGO_PATHS.fly} fill={LOGO_COLORS.teal} />
      <path d={LOGO_PATHS.sarajevo} fill={LOGO_COLORS.orange} />
    </svg>
  );
}

/** Horizontal lockup — mark + lettering — for the navigation bar. Lettering follows the light/dark theme. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <svg viewBox={WORDMARK_VIEWBOX} aria-hidden="true" focusable="false" className="h-8 w-auto shrink-0">
        <g className="fill-[#0a6a73] dark:fill-[#3fd6cc]">
          <path d={LOGO_PATHS.parking} />
          <path d={LOGO_PATHS.fly} />
        </g>
        <g className="fill-[#df5f06] dark:fill-[#ff8a1f]">
          <path d={LOGO_PATHS.amp} />
          <path d={LOGO_PATHS.sarajevo} />
        </g>
      </svg>
    </span>
  );
}
