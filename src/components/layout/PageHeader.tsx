import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Layout';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional row of actions under the description */
  actions?: ReactNode;
}

/** The `<h1>` block that opens every inner page. Leaves room for the floating navigation bar. */
export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <Container className="pb-10 pt-28 sm:pb-14 sm:pt-36 lg:pt-40">
      <m.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl text-center"
      >
        {eyebrow && <p className="mb-3 text-sm font-semibold tracking-[-0.005em] text-accent">{eyebrow}</p>}
        <h1 className="display-title text-[clamp(2.25rem,1.4rem+4vw,4rem)]">{title}</h1>
        {description && (
          <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-muted sm:text-lg">{description}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
      </m.header>
    </Container>
  );
}
