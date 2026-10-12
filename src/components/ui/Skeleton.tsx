import { cn } from '@/utils/cn';

/** Placeholder block that reserves space while a lazy section loads (prevents layout shift). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-shimmer rounded-[1.75rem] bg-[linear-gradient(90deg,transparent,rgb(128_128_128/0.12),transparent)] bg-[length:200%_100%] bg-ink/[0.04]',
        className,
      )}
    />
  );
}
