/** Business details, taken from parkingandfly.ba. Single source of truth for contact data and map links. */
export const SITE = {
  name: 'Sky Parking & Fly',
  address: { street: 'Dr Atifa Purivatre 38', city: 'Sarajevo' },
  geo: { lat: 43.828498, lng: 18.328639 },
  phone: { display: '+387 62 963 901', e164: '+38762963901' },
  email: 'info@parkingandfly.ba',
  whatsapp: '38762963901',
  viber: '%2B38762963901',
  /** The business's Google Maps listing, where all the reviews are */
  reviewsUrl:
    'https://www.google.com/maps/place/Parkiraj+i+leti/@43.8294016,18.3268494,2220m/data=!3m1!1e3!4m6!3m5!1s0x4758cbec292ab3bf:0x277c5439dbd4492a!8m2!3d43.8278852!4d18.3285589!16s%2Fg%2F11yf278sxl',
  /** Metres from the lot to the main entrance of the airport */
  distanceMeters: 800,
} as const;

export const MAPS_LINKS = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`,
  apple: `https://maps.apple.com/?daddr=${SITE.geo.lat},${SITE.geo.lng}&dirflg=d`,
  /** OpenStreetMap embed, only loaded after the visitor asks for the map. */
  embed: `https://www.openstreetmap.org/export/embed.html?bbox=${SITE.geo.lng - 0.006},${SITE.geo.lat - 0.003},${SITE.geo.lng + 0.006},${SITE.geo.lat + 0.003}&layer=mapnik&marker=${SITE.geo.lat},${SITE.geo.lng}`,
} as const;

/**
 * Inbox that receives the reservations sent from the form. This is a TEST address for now; set
 * `VITE_RESERVATION_EMAIL` (for example to the business address) to change it without touching the code.
 */
export const RESERVATION_INBOX: string = import.meta.env.VITE_RESERVATION_EMAIL?.trim() || 'farukcaluk12@gmail.com';

export const telLink = `tel:${SITE.phone.e164}`;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function viberLink(): string {
  return `viber://chat?number=${SITE.viber}`;
}

export function mailLink(subject: string, body: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
