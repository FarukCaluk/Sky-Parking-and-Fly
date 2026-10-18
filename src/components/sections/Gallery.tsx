import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import type { PhotoId } from '@/data/photos';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

/** The photographs of the lot: two wide ones, then three smaller (the last one spans the row on a phone). */
const TILES: { id: PhotoId; className: string; sizes: string; position?: string }[] = [
  {
    id: 'galleryLot',
    className: 'col-span-2 sm:col-span-3 aspect-[4/3]',
    sizes: '(min-width: 1344px) 660px, (min-width: 640px) 50vw, 100vw',
  },
  {
    id: 'galleryCars',
    className: 'col-span-2 sm:col-span-3 aspect-[4/3]',
    sizes: '(min-width: 1344px) 660px, (min-width: 640px) 50vw, 100vw',
    position: '50% 60%',
  },
  {
    id: 'galleryGate',
    className: 'sm:col-span-2 aspect-square',
    sizes: '(min-width: 1344px) 435px, (min-width: 640px) 33vw, 50vw',
  },
  {
    id: 'galleryCamera',
    className: 'sm:col-span-2 aspect-square',
    sizes: '(min-width: 1344px) 435px, (min-width: 640px) 33vw, 50vw',
  },
  {
    id: 'galleryField',
    className: 'col-span-2 sm:col-span-2 aspect-[2/1] sm:aspect-square',
    sizes: '(min-width: 1344px) 435px, (min-width: 640px) 33vw, 100vw',
  },
];

const POSTERS: PhotoId[] = ['posterCare', 'posterAerial', 'posterTravel'];

/** Photographs of the lot and the posters of the business, as supplied by it. */
export function Gallery() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="gallery-title" className="pb-20 sm:pb-28 lg:pb-32">
      <Container>
        <Reveal>
          <h2 id="gallery-title" className="display text-heading max-w-[16ch]">
            {t.facilities.gallery.title}
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg text-ink-muted">{t.facilities.gallery.lead}</p>
        </Reveal>

        <ul role="list" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4">
          {TILES.map((tile) => (
            <li key={tile.id} className={cn('overflow-hidden rounded-[10px] bg-surface-2', tile.className)}>
              <Photo
                id={tile.id}
                alt={t.photos[tile.id as keyof typeof t.photos]}
                sizes={tile.sizes}
                position={tile.position}
                className="size-full object-cover"
              />
            </li>
          ))}
        </ul>

        <h3 className="display text-sub mt-16 sm:mt-20">{t.facilities.gallery.postersTitle}</h3>
        <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {POSTERS.map((id) => (
            <li key={id} className="overflow-hidden rounded-[10px] bg-surface-2">
              <Photo
                id={id}
                alt={t.photos[id as keyof typeof t.photos]}
                sizes="(min-width: 1344px) 430px, (min-width: 640px) 31vw, 100vw"
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
