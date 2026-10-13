/** Business details, taken from parkingandfly.ba. Single source of truth for contact data and map links. */
export const SITE = {
  name: 'Sky Parking & Fly',
  address: { street: 'Dr Atifa Purivatre 38', city: 'Sarajevo' },
  geo: { lat: 43.828498, lng: 18.328639 },
  phone: { display: '+387 62 963 901', e164: '+38762963901' },
  email: 'info@parkingandfly.ba',
  whatsapp: '38762963901',
  viber: '%2B38762963901',
  /** Public Google Maps listing with the reviews */
  reviewsUrl: 'https://maps.app.goo.gl/v5FRtga6FrcHtsJ78',
  /** Metres from the lot to the main entrance of the airport */
  distanceMeters: 800,
} as const;

export const MAPS_LINKS = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`,
  apple: `https://maps.apple.com/?daddr=${SITE.geo.lat},${SITE.geo.lng}&dirflg=d`,
  /** OpenStreetMap embed, only loaded after the visitor asks for the map. */
  embed: `https://www.openstreetmap.org/export/embed.html?bbox=${SITE.geo.lng - 0.006},${SITE.geo.lat - 0.003},${SITE.geo.lng + 0.006},${SITE.geo.lat + 0.003}&layer=mapnik&marker=${SITE.geo.lat},${SITE.geo.lng}`,
} as const;

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
