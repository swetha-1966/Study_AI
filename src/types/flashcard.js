/**
 * flashcard.js — Flashcard shape documentation.
 */

/**
 * @typedef {Object} FlashcardItem
 * @property {number|string} id - Unique card identifier
 * @property {string} question - The front-face question text
 * @property {string} answer - The back-face answer text
 * @property {string} [difficulty] - 'easy' | 'medium' | 'hard'
 * @property {string[]} [tags] - Categorical tags
 * @property {boolean} [isBookmarked] - User bookmarked this card
 * @property {LeitnerBox} [leitnerBox] - Spaced repetition box (1-5)
 * @property {string} [lastReviewedAt] - ISO timestamp
 * @property {string} [nextReviewAt] - ISO timestamp for next review
 */

/**
 * @typedef {1|2|3|4|5} LeitnerBox
 * Leitner system: Box 1 = review daily, Box 5 = review monthly
 */

/**
 * @typedef {'known'|'review'|'unseen'} CardStatus
 */

/**
 * Creates a default flashcard object.
 * @param {Partial<FlashcardItem>} overrides
 * @returns {FlashcardItem}
 */
export function createFlashcard(overrides = {}) {
  return {
    id: Date.now(),
    question: '',
    answer: '',
    difficulty: 'medium',
    tags: [],
    isBookmarked: false,
    leitnerBox: 1,
    ...overrides,
  };
}
