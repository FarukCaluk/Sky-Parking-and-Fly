import type { BookingConfirmation, BookingRequest } from '@/types';
import { generateReference } from '@/utils/reference';

export type BookingErrorCode = 'network' | 'timeout' | 'server' | 'aborted';

/** Carries a machine-readable `code`; the UI turns it into text in the visitor's language. */
export class BookingError extends Error {
  readonly code: BookingErrorCode;

  constructor(code: BookingErrorCode) {
    super(`Booking failed: ${code}`);
    this.name = 'BookingError';
    this.code = code;
  }
}

export interface BookingGateway {
  submit(request: BookingRequest, signal?: AbortSignal): Promise<BookingConfirmation>;
}

const REQUEST_TIMEOUT_MS = 15_000;
const STORAGE_KEY = 'spf-bookings';

/** Resolve after `ms`, rejecting early when the signal aborts. */
function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new BookingError('aborted'));
      return;
    }
    const timer = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new BookingError('aborted'));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * Posts the reservation to a real backend (`VITE_BOOKING_ENDPOINT`).
 * Expected response: `200 { "reference": "SPF-XXXXXX" }`.
 */
export class HttpBookingGateway implements BookingGateway {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async submit(request: BookingRequest, signal?: AbortSignal): Promise<BookingConfirmation> {
    const timeout = new AbortController();
    const timer = window.setTimeout(() => timeout.abort(), REQUEST_TIMEOUT_MS);
    const onOuterAbort = () => timeout.abort();
    signal?.addEventListener('abort', onOuterAbort, { once: true });

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(request),
        signal: timeout.signal,
      });
      if (!response.ok) {
        throw new BookingError('server');
      }
      const body: unknown = await response.json().catch(() => null);
      const reference =
        typeof body === 'object' && body !== null && 'reference' in body && typeof body.reference === 'string'
          ? body.reference
          : null;
      if (!reference) throw new BookingError('server');
      return { reference, createdAt: new Date().toISOString(), request };
    } catch (error) {
      if (error instanceof BookingError) throw error;
      if (signal?.aborted) throw new BookingError('aborted');
      if (timeout.signal.aborted) {
        throw new BookingError('timeout');
      }
      throw new BookingError('network');
    } finally {
      window.clearTimeout(timer);
      signal?.removeEventListener('abort', onOuterAbort);
    }
  }
}

/** Stores reservations in this browser only — used when no backend endpoint is configured. */
export class LocalBookingGateway implements BookingGateway {
  async submit(request: BookingRequest, signal?: AbortSignal): Promise<BookingConfirmation> {
    await delay(1400, signal);
    const confirmation: BookingConfirmation = {
      reference: generateReference(),
      createdAt: new Date().toISOString(),
      request,
    };
    try {
      const existing: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      const list = Array.isArray(existing) ? existing : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...list.slice(-19), confirmation]));
    } catch {
      /* storage unavailable (private mode) — the confirmation is still returned */
    }
    return confirmation;
  }
}

function createGateway(): BookingGateway {
  const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT?.trim();
  return endpoint ? new HttpBookingGateway(endpoint) : new LocalBookingGateway();
}

export const bookingGateway: BookingGateway = createGateway();
