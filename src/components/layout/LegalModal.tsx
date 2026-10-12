import { Modal } from '@/components/ui/Modal';
import { LEGAL_DOCS, type LegalDocId } from '@/data/legal';

interface LegalModalProps {
  docId: LegalDocId | null;
  onClose: () => void;
}

export function LegalModal({ docId, onClose }: LegalModalProps) {
  // Keep the last document rendered while the exit animation plays
  const doc = LEGAL_DOCS.find((d) => d.id === docId) ?? null;
  return (
    <Modal
      open={docId !== null && doc !== null}
      onClose={onClose}
      title={doc?.title ?? ''}
      eyebrow={doc ? `Ažurirano ${doc.updated}` : undefined}
      size="lg"
    >
      {doc && (
        <div className="space-y-6">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="text-base font-bold tracking-[-0.015em]">{section.heading}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{section.body}</p>
            </section>
          ))}
        </div>
      )}
    </Modal>
  );
}
