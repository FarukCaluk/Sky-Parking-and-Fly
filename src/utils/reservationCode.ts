/** Letters and digits without the look-alikes: no 0 and O, no 1, I and L. 31 symbols, so a byte below 248 maps evenly. */
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const SUFFIX_LENGTH = 4;

const randomBytes = (length: number): Uint8Array => crypto.getRandomValues(new Uint8Array(length));

/**
 * Reference for a reservation, e.g. `SKY-2010-7K3Q`: the day and month of arrival, then four random symbols. The date
 * lets us sort arrivals at a glance, the symbols make it unguessable. There is no database behind it, the code only
 * names the reservation in the mails and in conversation, so a collision (about 1 in 900,000 for one arrival day) is
 * harmless.
 */
export function createReservationCode(
  arrivalDate: string,
  bytes: (length: number) => Uint8Array = randomBytes,
): string {
  const [, month = '00', day = '00'] = /^\d{4}-(\d{2})-(\d{2})$/.exec(arrivalDate) ?? [];
  let suffix = '';
  while (suffix.length < SUFFIX_LENGTH) {
    for (const byte of bytes(8)) {
      // Bytes from 248 up are skipped, so that no symbol is likelier than another
      if (byte < 248 && suffix.length < SUFFIX_LENGTH) suffix += ALPHABET[byte % ALPHABET.length];
    }
  }
  return `SKY-${day}${month}-${suffix}`;
}

export const RESERVATION_CODE_PATTERN = /^SKY-\d{4}-[2-9A-HJKMNP-Z]{4}$/;
