/**
 * flashcards.prompt.js — Versioned prompts for flashcard generation.
 * Version: v1
 */

export const FLASHCARD_PROMPT_VERSION = 'v1';

/**
 * Build a standalone flashcard generation prompt.
 *
 * @param {string} topic
 * @param {object} [options]
 * @param {number} [options.count=8]
 * @param {string} [options.difficulty='Intermediate']
 * @returns {string}
 */
export function buildFlashcardPrompt(topic, options = {}) {
  const { count = 8, difficulty = 'Intermediate' } = options;

  return `Generate ${count} high-quality flashcards for: "${topic}" at ${difficulty} level.

Rules:
- Each question must be specific and test one clear concept
- Answers must be accurate, complete, and appropriately detailed
- Vary question types: definitions, how-it-works, why-it-matters, compare-contrast

Return ONLY valid JSON array:
[
  {
    "id": 1,
    "question": "Specific concept-focused question",
    "answer": "Accurate, detailed answer",
    "difficulty": "easy|medium|hard",
    "tags": ["tag1", "tag2"]
  }
]`;
}
