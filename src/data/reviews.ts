/**
 * Real Google Maps reviews of the business, picked for being complete, specific and varied (security, transfer,
 * communication, price, repeat customers). Texts are quoted as written, in the language the reviewer used; only
 * doubled spaces and one doubled word were cleaned up. Surnames are shortened to an initial.
 *
 * `rating`: the pasted reviews carry no star counts, so all are shown as 5 (the business's listed rating is 5.0).
 * Change a value here if a review turns out to be 4 stars.
 */
export interface Review {
  id: string;
  name: string;
  text: string;
  /** Language of `text`, for correct pronunciation by screen readers */
  lang: 'bs' | 'hr' | 'en';
  rating: 1 | 2 | 3 | 4 | 5;
}

export const REVIEWS: readonly Review[] = [
  {
    id: 'josip',
    name: 'Josip',
    lang: 'hr',
    rating: 5,
    text: 'Preporučujem ovaj parking svima koji lete iz Sarajeva. Brza i jednostavna komunikacija. Gospodin nas je odvezao u zračnu luku i pri povratku došao po nas bez da smo imali potrebu čekati. Parking je odlično osiguran ogradom i video nadzorom. I u buduće želim ovdje ostaviti svoje vozilo.',
  },
  {
    id: 'aida',
    name: 'Aida L.',
    lang: 'en',
    rating: 5,
    text: 'Excellent service from Sky Park and Fly! The parking is located right next to the airport, which is very convenient. I contacted them via WhatsApp and received an immediate response. The airport transfer was well organized and made everything easy and stress-free. The staff was also very friendly and helpful. Highly recommended!',
  },
  {
    id: 'armin',
    name: 'Armin M.',
    lang: 'bs',
    rating: 5,
    text: 'Jako ugodno iskustvo i komunikacija. Zaposleni na parkingu su nas dočekali prilikom ostavljanja auta (koje je bilo jako kasno), isto tako smo dočekani nakon slijetanja. Cijena parkinga je također relativno povoljna tako da je ukupna ocjena jako pozitivna.',
  },
  {
    id: 'arnel',
    name: 'Arnel',
    lang: 'bs',
    rating: 5,
    text: 'Odličan parking, uvijek ima dovoljno mjesta i sve je uredno organizovano. Prilaz je lagan, parking je čist i dobro osvijetljen, što daje osjećaj sigurnosti i navečer. Osoblje ljubazno i uslužno, a cijene sasvim korektne za lokaciju i uslugu. Sve preporuke.',
  },
  {
    id: 'antonio',
    name: 'Antonio K.',
    lang: 'hr',
    rating: 5,
    text: 'Vrlo pozitivno iskustvo s Parking&Fly Sarajevo. Transfer je bio brz, točan i dobro organiziran, bez ikakvog čekanja. Komunikacija jasna i profesionalna, a cijeli proces jednostavan i pouzdan. Sve je prošlo točno po dogovoru. Za svaku preporuku i sigurno ću ponovno koristiti uslugu.',
  },
  {
    id: 'jasmin',
    name: 'Jasmin C.',
    lang: 'en',
    rating: 5,
    text: 'We loved their service. They were on time, no delays for both departure and arrival. Drive to Sarajevo airport from SKY parking took only few minutes. We will definitely use their services again. Thank you SKY parking and Fly!!',
  },
  {
    id: 'asja',
    name: 'Asja K.',
    lang: 'bs',
    rating: 5,
    text: 'Parking je siguran i na odličnoj lokaciji. Vlasnici su izuzetno ljubazni i profesionalni, a uz parking je osiguran i prevoz do aerodroma i nazad u komfornom vozilu. Cijeli proces je bio jednostavan i bez ikakvih problema. Sigurno ću koristiti njihove usluge ponovo!',
  },
  {
    id: 'lejla',
    name: 'Lejla H.',
    lang: 'bs',
    rating: 5,
    text: 'Parking koji je veoma blizu terminala, veoma pouzdan i siguran, pod video nadzorom. Transfer je funkcionirao odlično a osoblje profesionalno i prijatno. Dva puta smo ostavili kod njih auto i sigurno ćemo opet koristiti njihove usluge.',
  },
  {
    id: 'semir',
    name: 'Semir H.',
    lang: 'en',
    rating: 5,
    text: 'Great service and very good communication through phone and WhatsApp. They drove us to the airport and picked us up on our return without any issues. Good prices and everything worked exactly as agreed. Highly recommended!',
  },
  {
    id: 'saska',
    name: 'Saska T.',
    lang: 'bs',
    rating: 5,
    text: 'Vrlo smo zadovoljni uslugom, jednostavno, brzo i efikasno - ne mijenjamo više, parkiramo u buduće na isto mjesto, i preporučujemo SKY Parking and Fly svima kome je potrebno ostaviti auto pored aerodroma Sarajevo.',
  },
];
