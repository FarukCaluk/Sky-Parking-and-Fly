import { cn } from '@/utils/cn';

/** Placeholder block that reserves space while a lazy page loads (prevents layout shift). */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-[10px] bg-ink/[0.07]', className)} />;
}
