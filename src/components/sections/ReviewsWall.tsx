import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

const ORDER = ['nedim', 'lejla', 'jasmin', 'ajla', 'haris', 'mirela'] as const;
/** Alternating widths so the wall has a rhythm instead of three equal columns. */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6'];

export function GoogleLink({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <a
      href={SITE.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/g label inline-flex items-center gap-2 text-[1.0625rem] text-accent-text transition-colors hover:text-ink',
        className,
      )}
    >
      {t.reviews.googleLink}
      <ArrowUpRight
        className="size-[1.1em] transition-transform duration-300 ease-signal group-hover/g:-translate-y-0.5 group-hover/g:translate-x-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </a>
  );
}

/** The six reviews from the business's own site, as a wall rather than a carousel. */
export function ReviewsWall({ withHeading = true }: { withHeading?: boolean }) {
  const { t } = useI18n();

  return (
    <section aria-labelledby={withHeading ? 'reviews-title' : undefined} className="relative py-20 sm:py-28 lg:py-36">
      <Container>
        {withHeading && (
          <Reveal>
            <h2 id="reviews-title" className="display text-heading max-w-[12ch]">
              {t.reviews.title}
            </h2>
            <p className="mt-5 text-lg text-ink-muted">{t.reviews.google}</p>
            <GoogleLink className="mt-2" />
          </Reveal>
        )}
        <ul className={cn('grid gap-x-12 gap-y-14 lg:grid-cols-12', withHeading && 'mt-14')}>
          {ORDER.map((id, index) => {
            const review = t.reviews.items[id];
            return (
              <li key={id} className={SPANS[index]}>
                <Reveal className="h-full">
                  <figure className="h-full border-t border-line-strong pt-6">
                    <h3 className="font-display text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] font-extrabold leading-none">
                      {review.title}
                    </h3>
                    <blockquote
                      className={cn(
                        'mt-4',
                        index === 0
                          ? 'max-w-[34ch] font-display text-[clamp(1.75rem,1.2rem+1.7vw,2.75rem)] font-semibold leading-[1.12] text-ink'
                          : 'max-w-[50ch] text-[1.0625rem] text-ink-muted',
                      )}
                    >
                      <p>{review.quote}</p>
                    </blockquote>
                    <figcaption className="label mt-5 text-[1rem] text-ink">{review.name}</figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
        {!withHeading && (
          <div className="mt-14 space-y-1">
            <p className="text-lg text-ink-muted">{t.reviews.google}</p>
            <GoogleLink />
          </div>
        )}
      </Container>
    </section>
  );
}
