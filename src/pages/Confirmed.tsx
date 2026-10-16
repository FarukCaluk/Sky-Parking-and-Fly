import { useMemo, useSyncExternalStore } from 'react';
import { ConfirmationPanel } from '@/components/sections/ConfirmationPanel';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useI18n } from '@/i18n/context';
import { navigate } from '@/router/navigation';
import { pathFor } from '@/router/routes';
import { parseStoredConfirmation, readStoredConfirmation } from '@/utils/confirmationStore';
import { PageShell } from './PageShell';

const noSubscription = () => () => undefined;

/**
 * Where the guest lands after sending a reservation. It is a page of its own (not a message on the form) so that its
 * address can be counted as a conversion by the ads and statistics. It shows the confirmation of this visit when there
 * is one; opened any other way it only says thank you.
 */
export default function Confirmed() {
  const { t, lang } = useI18n();
  // Nothing is stored on the server, so the prerendered page is the plain thank-you; the confirmation appears after React attaches
  const raw = useSyncExternalStore(noSubscription, readStoredConfirmation, () => null);
  const stored = useMemo(() => parseStoredConfirmation(raw), [raw]);

  return (
    <PageShell page="confirmed">
      <PageHeader title={t.confirmation.pageTitle} lead={stored ? undefined : t.confirmation.pageLead} />
      <Container className="grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12">
        {stored ? (
          <ConfirmationPanel
            confirmation={stored.confirmation}
            mailedTo={stored.mailedTo}
            onAnother={() => navigate(pathFor(lang, 'reservation'))}
          />
        ) : (
          <div className="flex flex-wrap gap-3 lg:col-span-12">
            <Button to="contact" size="lg" arrow>
              {t.nav.pages.contact}
            </Button>
            <Button to="home" size="lg" variant="secondary">
              {t.nav.pages.home}
            </Button>
          </div>
        )}
      </Container>
    </PageShell>
  );
}
