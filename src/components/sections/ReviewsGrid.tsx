import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { REVIEWS } from '@/data/reviews';
import { useI18n } from '@/i18n/context';
import { AllReviewsButton, ReviewCard, Stars } from './ReviewCard';

/** The Reviews page: every picked review as a card, in columns that follow the width of the screen. */
export function ReviewsGrid() {
  const { t } = useI18n();

  return (
    <section aria-label={t.reviews.title}>
      <Container className="pb-24 sm:pb-32">
        <p className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-ink-muted">
          <Stars rating={5} />
          {t.reviews.google}
        </p>

        <ul role="list" className="columns-1 gap-4 md:columns-2 xl:columns-3">
          {REVIEWS.map((review) => (
            <li key={review.id} className="mb-4 break-inside-avoid">
              <Reveal y={24}>
                <ReviewCard review={review} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <AllReviewsButton />
        </div>
      </Container>
    </section>
  );
}
