/** Crockford-style alphabet — no I, L, O, U or 0/1 so codes can be read out over the phone. */
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTVWXYZ';

/** Human-friendly reservation code, e.g. `SPF-7K3M9Q`. */
export function generateReference(length = 6): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let code = '';
  for (const byte of bytes) code += ALPHABET[byte % ALPHABET.length];
  return `SPF-${code}`;
}
