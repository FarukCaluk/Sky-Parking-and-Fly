/**
 * Where reservations go: the booking mailbox of the business. `VITE_RESERVATION_EMAIL` (in the browser build, for the
 * fallback form service) and `RESERVATION_EMAIL` (for the mail function) can point elsewhere. A plain module so both
 * sides can import it.
 */
export const DEFAULT_RESERVATION_INBOX = 'booking@parkingandfly.ba';
