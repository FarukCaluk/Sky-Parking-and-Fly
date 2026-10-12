/**
 * Single source of truth for business details.
 * Replace the values below with the operator's real contact data before launch.
 */
export const SITE = {
  name: 'Sky Parking & Fly',
  legalName: 'Sky Parking & Fly d.o.o. Sarajevo',
  companyId: 'ID 4200000000000',
  vatId: 'PDV 200000000000',
  address: {
    street: 'Aerodromska 12',
    city: '71210 Ilidža, Sarajevo',
  },
  /** Parking lot coordinates */
  geo: { lat: 43.8197, lng: 18.3278 },
  /** Terminal coordinates */
  terminalGeo: { lat: 43.8246, lng: 18.3315 },
  phone: { display: '+387 61 000 000', e164: '+38761000000' },
  landline: { display: '+387 33 000 000', e164: '+38733000000' },
  email: 'info@skyparkingfly.example',
  whatsapp: '38761000000',
  viber: '%2B38761000000',
  shuttleMinutes: 5,
  /** Distance in km — formatted per language where shown. */
  terminalDistanceKm: 1.8,
} as const;

export const MAPS_LINKS = {
  google: `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`,
  apple: `https://maps.apple.com/?daddr=${SITE.geo.lat},${SITE.geo.lng}&dirflg=d`,
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function viberLink(): string {
  return `viber://chat?number=${SITE.viber}`;
}
