import { PageHeader } from '@/components/layout/PageHeader';
import ContactChannels from '@/components/sections/Contact';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Contact() {
  const { t } = useI18n();
  return (
    <PageShell page="contact">
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} description={t.contact.description} />
      <ContactChannels />
    </PageShell>
  );
}
