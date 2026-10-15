import { describe, expect, it } from 'vitest';
import { REVIEWS } from './reviews';

describe('reviews', () => {
  it('are the ten that the carousel and the Reviews page promise', () => {
    expect(REVIEWS).toHaveLength(10);
  });

  it('have unique ids, a name, a text and a rating of 1 to 5', () => {
    expect(new Set(REVIEWS.map((review) => review.id)).size).toBe(REVIEWS.length);
    for (const review of REVIEWS) {
      expect(review.name.trim(), review.id).not.toBe('');
      expect(review.text.trim().length, review.id).toBeGreaterThan(40);
      expect(review.rating, review.id).toBeGreaterThanOrEqual(1);
      expect(review.rating, review.id).toBeLessThanOrEqual(5);
      expect(['bs', 'hr', 'en'], review.id).toContain(review.lang);
    }
  });

  it('are shown without full surnames', () => {
    for (const review of REVIEWS) expect(review.name, review.id).toMatch(/^[^\s]+( \p{Lu}\.)?$/u);
  });
});
