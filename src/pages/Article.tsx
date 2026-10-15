import { m } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import { ArticleBody } from '@/components/sections/ArticleBody';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { NEWS, type NewsId } from '@/data/news';
import { PHOTOS } from '@/data/photos';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { useRoute } from '@/router/navigation';
import { articleRouteOf, isArticleRoute, newsIdOf, pathFor, type ArticleRouteId } from '@/router/routes';
import { formatDMY } from '@/utils/date';
import { PageShell } from './PageShell';

type NewsEntry = (typeof NEWS)[number];
const ENTRIES = Object.fromEntries(NEWS.map((entry) => [entry.id, entry])) as Record<NewsId, NewsEntry>;

/** `BlogPosting` structured data for the article. Removed again when the page unmounts. */
function useArticleSchema(entry: NewsEntry, headline: string, description: string) {
  const { lang } = useI18n();
  useEffect(() => {
    const origin = window.location.origin;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.article = 'true';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline,
      description,
      datePublished: entry.date,
      inLanguage: lang,
      image: `${origin}/photos/${PHOTOS[entry.photo].main.prefix}-1200.webp`,
      mainEntityOfPage: `${origin}${pathFor(lang, articleRouteOf(entry.id))}`,
      author: { '@type': 'Organization', name: 'Sky Parking & Fly' },
      publisher: { '@type': 'Organization', name: 'Sky Parking & Fly' },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [entry, headline, description, lang]);
}

function ArticleView({ route }: { route: ArticleRouteId }) {
  const { t } = useI18n();
  const entry = ENTRIES[newsIdOf(route)];
  const text = t.news.items[entry.id];
  useArticleSchema(entry, text.title, text.excerpt);

  return (
    <PageShell page={route}>
      <article>
        <header>
          <Container className="pb-10 pt-32 sm:pt-40 lg:pb-14">
            <Link
              route="news"
              className="label group/back inline-flex items-center gap-2 text-[1.0625rem] text-accent-text transition-colors hover:text-ink"
            >
              <ArrowLeft
                className="size-[1.1em] transition-transform duration-300 ease-signal group-hover/back:-translate-x-1"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {t.news.back}
            </Link>
            <p className="mt-8">
              <time dateTime={entry.date} className="label text-[1.0625rem] text-ink-faint">
                {formatDMY(entry.date)}
              </time>
            </p>
            <m.h1
              initial={{ y: 28 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="display text-heading mt-3 max-w-[24ch]"
            >
              {text.title}
            </m.h1>
          </Container>
        </header>

        <Container className="grid gap-10 pb-20 lg:grid-cols-12 lg:gap-16 lg:pb-28">
          <div className="lg:col-span-5">
            <div className="max-w-md overflow-hidden rounded-[10px] bg-surface-2 lg:sticky lg:top-28 lg:max-w-none">
              <Photo
                id={entry.photo}
                alt={text.alt}
                priority
                sizes="(min-width: 1344px) 520px, (min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="max-w-[62ch] lg:col-span-7">
            <ArticleBody blocks={text.blocks} />
          </div>
        </Container>
      </article>

      <section aria-labelledby="more-news" className="border-t border-line-strong py-16 sm:py-20">
        <Container>
          <h2 id="more-news" className="display text-sub">
            {t.news.more}
          </h2>
          <ul role="list" className="mt-8 border-t border-line">
            {NEWS.filter((other) => other.id !== entry.id).map((other) => (
              <li key={other.id} className="border-b border-line">
                <Link
                  route={articleRouteOf(other.id)}
                  className="group/row grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 transition-colors duration-300 hover:bg-ink/[0.035] sm:grid-cols-[7rem_1fr_auto] sm:px-3"
                >
                  <time
                    dateTime={other.date}
                    className="label col-span-2 text-[0.9375rem] text-accent-text sm:col-span-1"
                  >
                    {formatDMY(other.date)}
                  </time>
                  <span className="font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] font-bold leading-[1.1]">
                    {t.news.items[other.id].title}
                  </span>
                  <ArrowUpRight
                    className="size-6 text-ink-faint transition-[transform,color] duration-300 ease-signal group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-accent-text"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </PageShell>
  );
}

/** One page for every article: the address says which one. */
export default function Article() {
  const { route } = useRoute();
  if (!route || !isArticleRoute(route)) return null;
  return <ArticleView route={route} />;
}
