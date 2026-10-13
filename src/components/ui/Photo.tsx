import { photoFallback, photoSrcSet, PHOTOS, type PhotoId } from '@/data/photos';

interface PhotoProps {
  id: PhotoId;
  alt: string;
  /** `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  /** CSS `object-position`, e.g. `62% 55%`. */
  position?: string;
  className?: string;
}

/** One of the real photographs as AVIF with a WebP fallback. Phones get the tighter portrait crop where one exists. */
export function Photo({ id, alt, sizes, priority = false, position, className }: PhotoProps) {
  const photo = PHOTOS[id];
  return (
    <picture className="contents">
      {photo.portrait && (
        <>
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet={photoSrcSet(photo.portrait, 'avif')}
            sizes={sizes}
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet={photoSrcSet(photo.portrait, 'webp')}
            sizes={sizes}
          />
        </>
      )}
      <source type="image/avif" srcSet={photoSrcSet(photo.main, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={photoSrcSet(photo.main, 'webp')} sizes={sizes} />
      <img
        src={photoFallback(photo.main)}
        width={photo.width}
        height={photo.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        style={{ objectPosition: position }}
        className={className}
      />
    </picture>
  );
}
