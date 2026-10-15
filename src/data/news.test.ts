import { describe, expect, it } from 'vitest';
import { MESSAGES } from '@/i18n/messages';
import { LANGS } from '@/router/routes';
import { parseISODate } from '@/utils/date';
import { NEWS } from './news';
import { PHOTOS } from './photos';

describe('news', () => {
  it('has valid dates, newest first, and a photograph that exists', () => {
    const dates = NEWS.map((entry) => entry.date);
    for (const date of dates) expect(parseISODate(date), date).not.toBeNull();
    expect([...dates].sort().reverse()).toEqual(dates);
    for (const entry of NEWS) expect(PHOTOS[entry.photo], entry.id).toBeDefined();
  });

  it('has an address in every language, unique and URL-safe', () => {
    for (const lang of LANGS) {
      const slugs = NEWS.map((entry) => entry.slugs[lang]);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('is written out in every language, with matching structure and balanced bold markers', () => {
    for (const lang of LANGS) {
      for (const entry of NEWS) {
        const item = MESSAGES[lang].news.items[entry.id];
        const reference = MESSAGES.bs.news.items[entry.id];
        const where = `${lang}/${entry.id}`;
        expect(item.title.trim(), where).not.toBe('');
        expect(item.alt.trim(), where).not.toBe('');
        // The excerpt doubles as the meta description
        expect(item.excerpt.length, where).toBeLessThanOrEqual(170);
        expect(
          item.blocks.map((block) => block.type),
          where,
        ).toEqual(reference.blocks.map((block) => block.type));

        const texts = item.blocks.flatMap((block) =>
          block.type === 'checks' || block.type === 'steps' ? block.items : [block.text],
        );
        for (const text of texts) expect((text.match(/\*\*/g) ?? []).length % 2, `${where}: ${text}`).toBe(0);
      }
    }
  });
});
