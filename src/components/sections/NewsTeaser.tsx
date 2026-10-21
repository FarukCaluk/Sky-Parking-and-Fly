import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useI18n } from '@/i18n/context';
import { NewsGrid } from './NewsCards';

/** Home page: the latest posts, with a way to the whole list. */
export function NewsTeaser() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="news-title" className="relative py-20 sm:py-28 lg:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="news-title" className="display text-heading">
            {t.news.latest}
          </h2>
          <Button to="news" variant="text" arrow className="text-[1.125rem]">
            {t.news.all}
          </Button>
        </Reveal>
        <NewsGrid limit={4} className="mt-10 sm:mt-12" />
      </Container>
    </section>
  );
}
