import { Check } from 'lucide-react';
import type { NewsBlock } from '@/i18n/bs';

/** Text with `**bold**` spans, the only inline markup the articles use. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** The body of an article: a subheading, paragraphs, a check list and numbered steps. */
export function ArticleBody({ blocks }: { blocks: readonly NewsBlock[] }) {
  return (
    <div className="grid gap-6 text-[1.0625rem] leading-[1.7] text-ink-muted sm:text-lg sm:leading-[1.7]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={index} className="display text-sub text-ink">
                {block.text}
              </h2>
            );
          case 'p':
            return (
              <p key={index}>
                <Inline text={block.text} />
              </p>
            );
          case 'checks':
            return (
              <ul key={index} role="list" className="grid gap-4">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-ink"
                    >
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case 'steps':
            return (
              <ol key={index} role="list" className="grid gap-4">
                {block.items.map((item, step) => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="display mt-px grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-[1.25rem] leading-none text-accent-text"
                    >
                      {step + 1}
                    </span>
                    <span className="pt-0.5">
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}
