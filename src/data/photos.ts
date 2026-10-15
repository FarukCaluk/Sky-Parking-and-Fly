/**
 * The photographs of the lot and of the news posts, pre-rendered as `public/photos/<prefix>-<width>.{avif,webp}`.
 * The `news*` ones are the square pictures published with the posts on parkingandfly.ba.
 */
export type PhotoId = 'jet' | 'entrance' | 'sign' | 'pole' | 'newsChecklist' | 'newsTransfer' | 'newsLongStay';

interface PhotoSet {
  prefix: string;
  widths: readonly number[];
}

export interface PhotoDef {
  /** Intrinsic size of the largest file */
  width: number;
  height: number;
  main: PhotoSet;
  /** Tighter crop served to phones */
  portrait?: PhotoSet & { width: number; height: number };
}

const WIDTHS = [480, 800, 1200, 1600, 2000] as const;
const NEWS_WIDTHS = [480, 800, 1200] as const;

export const PHOTOS: Record<PhotoId, PhotoDef> = {
  jet: {
    width: 2000,
    height: 1334,
    main: { prefix: 'jet', widths: WIDTHS },
    portrait: { prefix: 'jet-portrait', widths: [480, 800, 1000], width: 1000, height: 1004 },
  },
  entrance: { width: 2000, height: 1334, main: { prefix: 'entrance', widths: WIDTHS } },
  sign: { width: 2000, height: 1334, main: { prefix: 'sign', widths: WIDTHS } },
  pole: { width: 2000, height: 1334, main: { prefix: 'pole', widths: WIDTHS } },
  newsChecklist: { width: 1200, height: 1200, main: { prefix: 'news-checklist', widths: NEWS_WIDTHS } },
  newsTransfer: { width: 1200, height: 1200, main: { prefix: 'news-transfer', widths: NEWS_WIDTHS } },
  newsLongStay: { width: 1200, height: 1200, main: { prefix: 'news-long-stay', widths: NEWS_WIDTHS } },
};

export const photoSrcSet = (set: PhotoSet, format: 'avif' | 'webp'): string =>
  set.widths.map((w) => `/photos/${set.prefix}-${w}.${format} ${w}w`).join(', ');

/** A mid-size file used as the plain `src` fallback. */
export const photoFallback = (set: PhotoSet): string =>
  `/photos/${set.prefix}-${set.widths[Math.min(2, set.widths.length - 1)]}.webp`;
