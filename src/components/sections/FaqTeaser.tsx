import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useI18n } from '@/i18n/context';
import { FaqList } from './FaqList';

/** First questions of the FAQ on the home page, with a way to the full list. */
export function FaqTeaser() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="faq-title" className="relative py-20 sm:py-28 lg:py-36">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 id="faq-title" className="display text-heading max-w-[8ch]">
            {t.faq.title}
          </h2>
          <Button to="faq" variant="secondary" arrow className="mt-8">
            {t.faq.all}
          </Button>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <FaqList limit={5} />
        </Reveal>
      </Container>
    </section>
  );
}
