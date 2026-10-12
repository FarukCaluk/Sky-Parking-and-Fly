import type { Lang } from '@/router/routes';
import { bs, type Messages } from './bs';
import { de } from './de';
import { en } from './en';

export type { Messages };

/** All dictionaries, keyed by language. `bs` is the source of truth for the shape. */
export const MESSAGES: Record<Lang, Messages> = { bs, en, de };
