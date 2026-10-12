import { Suspense, type ReactNode } from 'react';
import { Container } from '@/components/ui/Layout';
import { Skeleton } from '@/components/ui/Skeleton';

interface LazySectionProps {
  /** Anchor id — present from the first render so in-page links work before the chunk arrives. */
  id?: string;
  /** Reserved height (CSS length) so the page does not jump when the section streams in. */
  minHeight: string;
  children: ReactNode;
}

export function LazySection({ id, minHeight, children }: LazySectionProps) {
  return (
    <div id={id} style={{ minHeight }}>
      <Suspense
        fallback={
          <Container className="py-24">
            <Skeleton className="w-full" />
          </Container>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
