import { ArrowRight, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { NAV_LINKS } from '@/data/content';
import { LEGAL_DOCS, type LegalDocId } from '@/data/legal';
import { SITE } from '@/data/site';
import { EXTRAS } from '@/data/pricing';
import { useBooking } from '@/context/bookingContext';
import { LegalModal } from './LegalModal';
import { Logo } from './Logo';

const linkClass = 'inline-block py-1.5 text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink';

export default function Footer() {
  const { openBooking } = useBooking();
  const [legalDoc, setLegalDoc] = useState<LegalDocId | null>(null);

  return (
    <footer className="relative">
      <Container>
        {/* Closing call to action */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-900 to-brand-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/35 blur-[100px]"
          />
          <div className="relative">
            <h2 className="display-title mx-auto max-w-2xl text-[clamp(1.875rem,1.3rem+2.6vw,3.25rem)]">
              Rezervišite mjesto za manje od minute.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-white/65 sm:text-lg">
              Bez avansa i bez registracije. Plaćate tek kada preuzmete vozilo.
            </p>
            <Button
              size="lg"
              onClick={openBooking}
              className="mt-8"
              rightIcon={<ArrowRight className="size-5" aria-hidden="true" />}
            >
              Rezerviši parking
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-16 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ink-muted">
              Siguran parking i besplatan shuttle do terminala aerodroma Sarajevo — {SITE.shuttleMinutes} minuta od
              ulaza do prijave leta.
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-ink-muted">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.country}
            </address>
          </div>

          <nav aria-label="Navigacija u podnožju">
            <h3 className="mb-2 text-sm font-semibold">Stranica</h3>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Usluge</h3>
            <ul>
              <li className="text-[0.9375rem] text-ink-muted">
                <a href="#cijene" className={linkClass}>
                  Natkriveni parking
                </a>
              </li>
              <li>
                <a href="#cijene" className={linkClass}>
                  Nenatkriveni parking
                </a>
              </li>
              {EXTRAS.slice(0, 3).map((extra) => (
                <li key={extra.id}>
                  <a href="#cijene" className={linkClass}>
                    {extra.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Pravno</h3>
            <ul>
              {LEGAL_DOCS.map((doc) => (
                <li key={doc.id}>
                  <button type="button" onClick={() => setLegalDoc(doc.id)} className={`${linkClass} text-left`}>
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-xs leading-relaxed text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} {SITE.legalName}. Sva prava zadržana.
            </p>
            <p className="mt-1">
              {SITE.companyId} · {SITE.vatId} · Sve cijene su izražene u KM i uključuju PDV.
            </p>
          </div>
          <a
            href="#pocetna"
            className="inline-flex min-h-10 items-center gap-2 self-start rounded-full bg-ink/[0.06] px-4 text-[0.8125rem] font-semibold text-ink-muted transition-colors hover:bg-ink/[0.1] hover:text-ink sm:self-auto"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Na vrh
          </a>
        </div>
      </Container>

      <LegalModal docId={legalDoc} onClose={() => setLegalDoc(null)} />
    </footer>
  );
}
