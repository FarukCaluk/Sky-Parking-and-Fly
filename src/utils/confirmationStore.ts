import type { Confirmation } from './confirmation.ts';

/** What the thank-you page shows: kept for the length of the visit, until the visitor closes the tab. */
export interface StoredConfirmation {
  confirmation: Confirmation;
  /** Where the confirmation was mailed, or `null` when it could not be */
  mailedTo: string | null;
}

const KEY = 'spf-confirmation';

/** `false` when the browser does not allow it (a private window, blocked site data): the caller shows the result itself. */
export function saveConfirmation(value: StoredConfirmation): boolean {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** The stored text as it is (a string compares by value, which is what `useSyncExternalStore` needs). */
export function readStoredConfirmation(): string | null {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function parseStoredConfirmation(raw: string | null): StoredConfirmation | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredConfirmation;
  } catch {
    return null;
  }
}
