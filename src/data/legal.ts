import { SITE } from './site';

export type LegalDocId = 'terms' | 'privacy' | 'cookies';

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDoc {
  id: LegalDocId;
  title: string;
  updated: string;
  sections: readonly LegalSection[];
}

export const LEGAL_DOCS: readonly LegalDoc[] = [
  {
    id: 'terms',
    title: 'Uslovi korištenja',
    updated: '1. oktobar 2026.',
    sections: [
      {
        heading: '1. Predmet usluge',
        body: `${SITE.legalName} pruža uslugu čuvanja vozila na ograđenom i video nadziranom parkingu te besplatan shuttle prijevoz do terminala aerodroma i nazad, u skladu s rezervisanim terminom.`,
      },
      {
        heading: '2. Rezervacija i cijena',
        body: 'Rezervacija je potvrđena u trenutku kada dobijete referentni kod. Sve cijene su izražene u konvertibilnim markama (KM) i uključuju PDV. Obračun se vrši po svakom započetom periodu od 24 sata, računajući od vremena ostavljanja vozila.',
      },
      {
        heading: '3. Plaćanje',
        body: 'Plaćanje se vrši prilikom preuzimanja vozila, gotovinom ili platnom karticom. Online rezervacijom ne naplaćujemo nikakve avanse.',
      },
      {
        heading: '4. Otkazivanje i izmjene',
        body: 'Rezervaciju možete besplatno otkazati ili izmijeniti najkasnije 24 sata prije planiranog dolaska, putem telefona, e-maila ili poruke. U slučaju kasnijeg preuzimanja vozila od rezervisanog, dodatni dani se obračunavaju prema važećem cjenovniku.',
      },
      {
        heading: '5. Odgovornost',
        body: 'Vozilo je osigurano osiguranjem od odgovornosti operatera. Molimo da u vozilu ne ostavljate dokumente, novac i vrijedne predmete. Za štete nastale zbog više sile ili ranije postojećih oštećenja operater ne odgovara. Prilikom preuzimanja molimo provjerite vozilo i prijavite eventualnu štetu prije napuštanja parkinga.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Politika privatnosti',
    updated: '1. oktobar 2026.',
    sections: [
      {
        heading: 'Ko obrađuje vaše podatke',
        body: `Rukovalac ličnim podacima je ${SITE.legalName}, ${SITE.address.street}, ${SITE.address.city}. Za sva pitanja možete nas kontaktirati na ${SITE.email}.`,
      },
      {
        heading: 'Koje podatke prikupljamo',
        body: 'Za potrebe rezervacije obrađujemo ime i prezime, e-mail adresu, broj telefona, registarske tablice i podatke o vozilu te broj leta ako ga navedete. Video nadzor i sistem za prepoznavanje tablica bilježe vozila na ulazu i izlazu.',
      },
      {
        heading: 'Svrha i rok čuvanja',
        body: 'Podatke koristimo isključivo za izvršenje rezervacije, komunikaciju s vama i zaštitu imovine. Podaci o rezervaciji čuvaju se u skladu sa zakonskim rokovima, a snimci video nadzora 30 dana.',
      },
      {
        heading: 'Vaša prava',
        body: 'U skladu sa Zakonom o zaštiti ličnih podataka u Bosni i Hercegovini imate pravo na pristup, ispravku i brisanje podataka. Zahtjev nam pošaljite e-mailom, a odgovorit ćemo u zakonskom roku.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Politika kolačića',
    updated: '1. oktobar 2026.',
    sections: [
      {
        heading: 'Šta koristimo',
        body: 'Ova stranica ne koristi marketinške niti analitičke kolačiće trećih strana. Pohranjujemo samo vašu odabranu temu (svijetla ili tamna) i, ako rezervišete, evidenciju rezervacije u lokalnoj memoriji vašeg preglednika.',
      },
      {
        heading: 'Kako ih obrisati',
        body: 'Lokalne podatke možete u svakom trenutku obrisati u postavkama svog preglednika. Brisanjem se vraćaju podrazumijevane postavke stranice.',
      },
    ],
  },
];
