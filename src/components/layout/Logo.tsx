import { Plane } from 'lucide-react';
import { cn } from '@/utils/cn';

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-9 shrink-0 place-items-center rounded-[0.7rem] bg-gradient-to-br from-brand-400 to-brand-700 text-white',
        'shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_16px_-6px_rgb(0_113_227/0.8)]',
        className,
      )}
    >
      <Plane className="size-[1.125rem]" strokeWidth={2.2} />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="whitespace-nowrap text-[1.0625rem] font-bold leading-none tracking-[-0.03em]">
        Sky
        <span className="font-medium text-ink-muted">
          {' '}
          Parking<span className="max-[30rem]:hidden"> &amp; Fly</span>
        </span>
      </span>
    </span>
  );
}
