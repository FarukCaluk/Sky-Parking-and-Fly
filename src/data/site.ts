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
    country: 'Bosna i Hercegovina',
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
  terminalDistance: '1,8 km',
  hours: [
    { label: 'Parking i shuttle', value: 'Non-stop, 0–24h' },
    { label: 'Recepcija', value: 'Non-stop, 0–24h' },
    { label: 'Administracija', value: 'Pon–Pet, 08–18h' },
  ],
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
