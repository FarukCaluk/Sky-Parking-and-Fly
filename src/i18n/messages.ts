import type { Lang } from '../router/routes.ts';
import { bs, type Messages } from './bs.ts';
import { de } from './de.ts';
import { en } from './en.ts';

export type { Messages };

/** All dictionaries, keyed by language. `bs` is the source of truth for the shape. */
export const MESSAGES: Record<Lang, Messages> = { bs, en, de };
