import { cn } from '@/utils/cn';
import { LOGO_PATHS, WORDMARK_VIEWBOX } from './logoPaths';

/** Brand colours as on the sign: white script and PARKING, orange & and SARAJEVO, teal FLY. */
function palette(onPhoto: boolean) {
  return {
    ink: onPhoto ? 'fill-white' : 'fill-ink',
    amp: onPhoto ? 'fill-accent' : 'fill-accent-text',
    fly: onPhoto ? 'fill-[#8bd6d9]' : 'fill-[#0b7a84] dark:fill-[#7fd0d3]',
  };
}

/** Horizontal lockup for the navigation bar: script "Sky" beside PARKING&FLY / SARAJEVO. */
export function Logo({ className, onPhoto = false }: { className?: string; onPhoto?: boolean }) {
  const c = palette(onPhoto);
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg viewBox="92 68 330 240" aria-hidden="true" focusable="false" className={cn('h-9 w-auto shrink-0', c.ink)}>
        <path d={LOGO_PATHS.sky} />
      </svg>
      <svg
        viewBox={WORDMARK_VIEWBOX}
        aria-hidden="true"
        focusable="false"
        className="h-[1.875rem] w-auto shrink-0 max-[23.75rem]:hidden"
      >
        <path d={LOGO_PATHS.parking} className={c.ink} />
        <path d={LOGO_PATHS.amp} className={c.amp} />
        <path d={LOGO_PATHS.fly} className={c.fly} />
        <path d={LOGO_PATHS.sarajevo} className={c.amp} />
      </svg>
    </span>
  );
}

/** Stacked lockup (script above the lettering), the way the sign is laid out. */
export function LogoStack({ className, label }: { className?: string; label: string }) {
  const c = palette(false);
  return (
    <svg viewBox="60 70 392 380" role="img" aria-label={label} className={cn('h-auto w-44 shrink-0', className)}>
      <path d={LOGO_PATHS.sky} className={c.ink} />
      <path d={LOGO_PATHS.parking} className={c.ink} />
      <path d={LOGO_PATHS.amp} className={c.amp} />
      <path d={LOGO_PATHS.fly} className={c.fly} />
      <path d={LOGO_PATHS.sarajevo} className={c.amp} />
    </svg>
  );
}
