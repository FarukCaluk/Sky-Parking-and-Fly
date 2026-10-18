import { cn } from '@/utils/cn';
import { LOGO } from './logoPaths';

const VIEW_BOX = `0 0 ${LOGO.width} ${LOGO.height}`;

/**
 * The logo, drawn once for the whole page: the navigation bar and the footer both point at it (`<use>`), so its outline
 * is in the HTML a single time. The script "Sky" takes the colour of the text around it (black on the light page, white
 * on the dark one and on a photograph); PARKING & FLY and SARAJEVO keep the colours of the sign.
 */
export function LogoSymbol() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute size-0 overflow-hidden">
      <symbol id="spf-logo" viewBox={VIEW_BOX}>
        <path fillRule="evenodd" fill="currentColor" d={LOGO.sky} />
        <path fillRule="evenodd" fill={LOGO.teal} d={LOGO.parking} />
        <path fillRule="evenodd" fill={LOGO.orange} d={LOGO.sarajevo} />
      </symbol>
    </svg>
  );
}

/** The logo for the navigation bar. */
export function Logo({ className, onPhoto = false }: { className?: string; onPhoto?: boolean }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      aria-hidden="true"
      focusable="false"
      className={cn('h-[3.25rem] w-auto shrink-0 lg:h-14', onPhoto ? 'text-white' : 'text-ink', className)}
    >
      <use href="#spf-logo" />
    </svg>
  );
}

/** The logo at footer size, with an accessible name. */
export function LogoStack({ className, label }: { className?: string; label: string }) {
  return (
    <svg viewBox={VIEW_BOX} role="img" aria-label={label} className={cn('h-auto w-44 shrink-0 text-ink', className)}>
      <use href="#spf-logo" />
    </svg>
  );
}
