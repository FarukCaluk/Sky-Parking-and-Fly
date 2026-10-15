import { ArrowUpRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/data/site';
import type { Review } from '@/data/reviews';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

export function Stars({ rating, className }: { rating: number; className?: string }) {
  const { t } = useI18n();
  return (
    <span role="img" aria-label={t.reviews.starsAria(rating)} className={cn('flex gap-0.5', className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn('size-[1.15rem]', index < rating ? 'fill-accent text-accent' : 'text-line-strong')}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

/** One real Google review: stars, the text as written, and who left it. */
export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  const { t } = useI18n();
  return (
    <figure
      className={cn(
        'relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[10px] border border-line bg-surface p-6 sm:p-7',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute right-5 top-2 select-none text-[5.5rem] leading-none text-accent/20"
      >
        &ldquo;
      </span>
      <div className="relative">
        <Stars rating={review.rating} />
        <blockquote lang={review.lang} className="mt-4 text-base leading-[1.6] text-ink">
          <p>{review.text}</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-line pt-4">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent font-display text-[1.375rem] font-extrabold leading-none text-accent-ink"
        >
          {review.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold leading-tight">{review.name}</span>
          <span className="block text-sm text-ink-faint">{t.reviews.source}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Opens the Google Maps listing, where every review (not only the ones shown here) can be read. */
export function AllReviewsButton({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <Button
      variant="secondary"
      size="lg"
      href={SITE.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      rightIcon={<ArrowUpRight className="size-[1.1em] shrink-0" strokeWidth={2.5} aria-hidden="true" />}
      // The label is long: it wraps to two lines on a phone instead of running off the screen
      className={cn('h-auto min-h-14 max-w-full whitespace-normal py-3 text-center leading-tight', className)}
    >
      {t.reviews.googleLink}
    </Button>
  );
}
