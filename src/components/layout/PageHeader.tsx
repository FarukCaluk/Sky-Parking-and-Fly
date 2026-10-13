import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import type { PhotoId } from '@/data/photos';

interface PageHeaderProps {
  title: ReactNode;
  lead?: ReactNode;
  photo?: { id: PhotoId; alt: string; position?: string };
  children?: ReactNode;
}

/** Opens every inner page: the `<h1>`, a short lead and, where there is one, a wide photograph. */
export function PageHeader({ title, lead, photo, children }: PageHeaderProps) {
  return (
    <header>
      <Container className="pb-12 pt-32 sm:pt-40 lg:pb-16">
        <m.h1
          initial={{ y: 28 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="display text-title max-w-[17ch]"
        >
          {title}
        </m.h1>
        {lead && <p className="mt-8 max-w-[58ch] text-lg text-ink-muted sm:text-xl">{lead}</p>}
        {children}
      </Container>
      {photo && (
        <Container>
          <ParallaxPhoto {...photo} />
        </Container>
      )}
    </header>
  );
}

function ParallaxPhoto({ id, alt, position }: NonNullable<PageHeaderProps['photo']>) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);

  return (
    <div
      ref={frame}
      className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-surface-2 sm:aspect-[16/9] lg:aspect-[21/9]"
    >
      <m.div style={{ y }} className="absolute inset-x-0 -top-[9%] h-[118%]">
        <Photo
          id={id}
          alt={alt}
          priority
          position={position}
          sizes="(min-width: 1344px) 1344px, 100vw"
          className="size-full object-cover"
        />
      </m.div>
    </div>
  );
}
