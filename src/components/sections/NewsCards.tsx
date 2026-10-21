import { ArrowRight } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { NEWS } from '@/data/news';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { articleRouteOf } from '@/router/routes';
import { cn } from '@/utils/cn';
import { formatDMY } from '@/utils/date';

type NewsEntry = (typeof NEWS)[number];

/** One post: the photograph, the date, the title and the start of the text. The whole card is the link. */
export function NewsCard({ entry }: { entry: NewsEntry }) {
  const { t } = useI18n();
  const text = t.news.items[entry.id];

  return (
    <article className="group relative grid h-full grid-cols-[7rem_1fr] gap-4 rounded-[10px] border border-line bg-surface p-3 transition-colors duration-300 hover:border-line-strong sm:grid-cols-[11rem_1fr] sm:gap-6 sm:p-4 lg:grid-cols-[13rem_1fr]">
      <div className="aspect-square self-start overflow-hidden rounded-[6px] bg-surface-2">
        {/* The title says it all, so the picture is decoration here (it is described on the article page) */}
        <Photo
          id={entry.photo}
          alt=""
          sizes="(min-width: 1024px) 208px, (min-width: 640px) 176px, 112px"
          className="size-full object-cover transition-transform duration-700 ease-signal group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex min-w-0 flex-col py-1 pr-1">
        <time dateTime={entry.date} className="label text-[0.9375rem] text-accent-text">
          {formatDMY(entry.date)}
        </time>
        <h3 className="mt-1.5 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] font-bold leading-[1.08]">
          <Link route={articleRouteOf(entry.id)} className="after:absolute after:inset-0 after:content-['']">
            {text.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-ink-muted sm:line-clamp-3">{text.excerpt}</p>
        <span
          aria-hidden="true"
          className="label mt-auto inline-flex items-center gap-2 pt-3 text-[1rem] text-accent-text"
        >
          {t.news.readMore}
          <ArrowRight
            className="size-[1.1em] transition-transform duration-300 ease-signal group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </span>
      </div>
    </article>
  );
}

/** The posts, two by two on a wide screen. Used by the News page (all of them) and by the home page (the latest). */
export function NewsGrid({ className, limit }: { className?: string; limit?: number }) {
  return (
    <ul role="list" className={cn('grid gap-4 lg:grid-cols-2 lg:gap-6', className)}>
      {NEWS.slice(0, limit).map((entry, index) => (
        <li key={entry.id}>
          <Reveal y={24} delay={(index % 2) * 0.08} className="h-full">
            <NewsCard entry={entry} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
