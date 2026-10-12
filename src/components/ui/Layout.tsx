import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from './Reveal';

export function Container({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div {...props} className={cn('mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10', className)} />;
}

export function Section({ className, ...props }: ComponentPropsWithRef<'section'>) {
  return <section {...props} className={cn('relative py-20 sm:py-28 lg:py-32', className)} />;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && <p className="mb-3 text-sm font-semibold tracking-[-0.005em] text-accent">{eyebrow}</p>}
      <h2 className="display-title text-[clamp(2rem,1.3rem+3.2vw,3.5rem)]">{title}</h2>
      {description && (
        <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-muted sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
