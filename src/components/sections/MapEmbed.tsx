import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MAPS_LINKS, SITE } from '@/data/site';
import { useI18n } from '@/i18n/context';

/**
 * OpenStreetMap, loaded only after the visitor asks for it: no third-party requests on page load,
 * so no consent banner is needed for the rest of the site.
 */
export function MapEmbed() {
  const { t } = useI18n();
  const [shown, setShown] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-line bg-surface-2 sm:aspect-[16/10]">
      {shown ? (
        <iframe
          title={t.contact.map.embedTitle}
          src={MAPS_LINKS.embed}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="size-full border-0"
        />
      ) : (
        <div className="grid size-full place-content-center justify-items-center gap-5 p-6 text-center">
          <MapPin className="size-10 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
          <p className="display text-[1.75rem] leading-none">
            {SITE.address.street}, {SITE.address.city}
          </p>
          <Button variant="secondary" onClick={() => setShown(true)}>
            {t.contact.map.show}
          </Button>
          <p className="max-w-[34ch] text-sm text-ink-faint">{t.contact.map.note}</p>
        </div>
      )}
    </div>
  );
}
