/**
 * revision.prompt.js — Versioned prompts for exam revision sheet generation.
 * Version: v1
 */

export const REVISION_PROMPT_VERSION = 'v1';

/**
 * Build a revision sheet generation prompt.
 *
 * @param {string} topic
 * @param {object} [context] - Existing session data for context
 * @returns {string}
 */
export function buildRevisionPrompt(topic, context = {}) {
  const summaryContext = context.summary?.overview
    ? `\nExisting summary context:\n"${context.summary.overview.slice(0, 200)}..."`
    : '';

  return `As an expert exam coach, create a concise exam revision sheet for: "${topic}"${summaryContext}

Generate exam-focused content a student would read the night before an exam.

Return ONLY valid JSON:
{
  "keyFacts": [
    "Critical fact 1 — specific and memorable",
    "Critical fact 2",
    "Critical fact 3",
    "Critical fact 4",
    "Critical fact 5"
  ],
  "commonMistakes": [
    "Mistake students often make: explanation",
    "Another common error: explanation"
  ],
  "examTips": [
    "Specific tip for exam questions on this topic",
    "Another exam strategy"
  ],
  "quickFormulas": [
    "Formula or rule: description"
  ],
  "mnemonic": "One powerful memory device (acronym, story, or visual)",
  "oneLineSummary": "The entire topic in one sentence"
}`;
}
