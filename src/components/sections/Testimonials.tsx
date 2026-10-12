import { BadgeCheck, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { GOOGLE_RATING, STATS, TESTIMONIALS } from '@/data/content';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import type { StatItem, Testimonial } from '@/types';
import { cn } from '@/utils/cn';
import { formatNumberBs } from '@/utils/format';

const AVATAR_GRADIENTS = [
  'from-sky-400 to-blue-600',
  'from-violet-400 to-indigo-600',
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-600',
  'from-rose-400 to-pink-600',
  'from-cyan-400 to-sky-600',
] as const;

function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span
      className={cn('flex items-center gap-0.5 text-amber-400', className)}
      role="img"
      aria-label={`Ocjena ${count} od 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-4', i >= count && 'text-ink/15')} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function GoogleBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-2.5 pr-5 shadow-card">
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-full bg-white text-xl font-bold shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
      >
        <span className="bg-[linear-gradient(135deg,#4285f4_0%,#4285f4_30%,#ea4335_30%,#ea4335_55%,#fbbc05_55%,#fbbc05_75%,#34a853_75%)] bg-clip-text text-transparent">
          G
        </span>
      </span>
      <span className="text-left">
        <span className="flex items-center gap-2">
          <span className="text-lg font-bold leading-none tracking-[-0.03em] tabular">{GOOGLE_RATING.score}</span>
          <Stars count={5} className="[&>svg]:size-3.5" />
        </span>
        <span className="mt-1 block text-xs leading-none text-ink-muted">{GOOGLE_RATING.count} Google recenzija</span>
      </span>
    </div>
  );
}

function Stat({ stat }: { stat: StatItem }) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.5);
  const value = useAnimatedNumber(seen ? stat.value : 0, 1800);

  return (
    <div ref={ref} className="px-4 py-6 text-center sm:py-8">
      <p className="text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-bold leading-none tracking-[-0.045em] tabular">
        {formatNumberBs(value, stat.decimals ?? 0)}
        <span className="text-ink-muted">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
    </div>
  );
}

function ReviewCard({ review, index }: { review: Testimonial; index: number }) {
  const initials = review.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <Card interactive className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <Stars count={review.rating} />
        <Badge tone="success">
          <BadgeCheck className="size-3.5" aria-hidden="true" />
          Verifikovan putnik
        </Badge>
      </div>
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed tracking-[-0.01em]">
        „{review.quote}“
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
            AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
          )}
        >
          {initials}
        </span>
        <div className="min-w-0">
          <cite className="block truncate text-[0.9375rem] font-semibold not-italic">{review.name}</cite>
          <p className="truncate text-[0.8125rem] text-ink-muted">
            {review.city} · let za {review.trip}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <Section className="border-y border-line bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Recenzije"
          title="Putnici nam vjeruju svoja vozila."
          description="Hiljade putnika iz cijele Bosne i Hercegovine i dijaspore ostavlja auto kod nas — evo šta kažu."
        />

        <Reveal className="mt-8 flex justify-center">
          <GoogleBadge />
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid grid-cols-2 divide-line overflow-hidden rounded-[1.75rem] border border-line bg-canvas max-lg:divide-y lg:grid-cols-4 lg:divide-x">
            {STATS.map((stat) => (
              <div key={stat.id} className="max-lg:odd:border-r max-lg:odd:border-line">
                <Stat stat={stat} />
              </div>
            ))}
          </div>
        </Reveal>

        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {TESTIMONIALS.map((review, i) => (
            <li key={review.id} className="min-w-0">
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <ReviewCard review={review} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Ocjene i recenzije su ilustrativne i bit će zamijenjene stvarnim prije objave.
        </p>
      </Container>
    </Section>
  );
}
