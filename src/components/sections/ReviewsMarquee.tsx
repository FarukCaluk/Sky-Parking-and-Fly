import { Pause, Play } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { Container } from '@/components/ui/Layout';
import { REVIEWS } from '@/data/reviews';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { AllReviewsButton, ReviewCard, Stars } from './ReviewCard';

/** Seconds a card takes to pass: slow enough to read, whatever the number of reviews. */
const SECONDS_PER_REVIEW = 10;

/** One full set of reviews. The strip holds two, so moving it by half its width loops without a jump. */
function ReviewRow({ copy = false }: { copy?: boolean }) {
  return (
    <ul role="list" aria-hidden={copy || undefined} className={cn('flex shrink-0 gap-4 pr-4', copy && 'marquee-copy')}>
      {REVIEWS.map((review) => (
        <li key={review.id} className="marquee-item w-[min(86vw,26rem)] shrink-0">
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}

/** Home page strip of real Google reviews, drifting sideways. Pauses on hover, on focus and on request. */
export function ReviewsMarquee() {
  const { t } = useI18n();
  const [paused, setPaused] = useState(false);
  const ToggleIcon = paused ? Play : Pause;

  return (
    <section aria-labelledby="reviews-title" className="relative py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <h2 id="reviews-title" className="display text-heading">
            {t.reviews.title}
          </h2>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-ink-muted">
            <Stars rating={5} />
            {t.reviews.google}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="label inline-flex h-10 items-center gap-2 rounded-[6px] border border-line-strong px-4 text-[0.9375rem] text-ink-muted transition-colors hover:border-ink hover:text-ink motion-reduce:hidden"
        >
          <ToggleIcon className="size-4" aria-hidden="true" />
          {paused ? t.reviews.play : t.reviews.pause}
        </button>
      </Container>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={t.reviews.marqueeAria}
        data-paused={paused}
        className="marquee mt-10 sm:mt-12"
      >
        <div
          className="marquee-track"
          style={{ '--marquee-duration': `${REVIEWS.length * SECONDS_PER_REVIEW}s` } as CSSProperties}
        >
          <ReviewRow />
          <ReviewRow copy />
        </div>
      </div>

      <Container className="mt-10 flex justify-center sm:mt-12">
        <AllReviewsButton />
      </Container>
    </section>
  );
}
