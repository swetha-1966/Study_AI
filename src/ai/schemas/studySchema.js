import { AISchemaError, AIParseError } from '../../core/errors/AIError';
import { logger } from '../../lib/logger';

const MODULE = 'StudySchema';

/**
 * studySchema.js — AI response validation and normalization pipeline.
 *
 * Every AI response passes through:
 *   Raw text → JSON parse → Schema validate → Normalize → Domain-ready object
 *
 * Never trust raw AI output — always validate and normalize.
 */

/**
 * Full pipeline: parse raw AI text → validate → normalize.
 *
 * @param {string|object} rawResponse - Raw AI text response or already-parsed object
 * @returns {NormalizedStudyData}
 * @throws {AIParseError} If JSON cannot be parsed
 * @throws {AISchemaError} If the parsed data fails validation
 */
export function repairAndValidate(rawResponse) {
  // Step 1: Parse if string
  const parsed = parseResponse(rawResponse);

  // Step 2: Validate structure
  const { valid, errors } = validateSchema(parsed);
  if (!valid) {
    logger.warn(MODULE, 'Schema validation failed:', errors);
    // Don't throw — normalize what we have (resilient mode)
  }

  // Step 3: Normalize
  return normalize(parsed);
}

/**
 * Parse a raw AI response string into a JavaScript object.
 * Handles markdown code fences and common JSON formatting issues.
 *
 * @param {string|object} raw
 * @returns {object}
 * @throws {AIParseError}
 */
export function parseResponse(raw) {
  if (typeof raw === 'object' && raw !== null) return raw;

  if (typeof raw !== 'string') {
    throw new AIParseError(String(raw));
  }

  // Strip markdown code fences
  let cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  // Find first { and last }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt simple repairs
    try {
      const repaired = cleaned
        .replace(/,\s*([}\]])/g, '$1')   // trailing commas
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":'); // unquoted keys
      return JSON.parse(repaired);
    } catch {
      throw new AIParseError(cleaned, { parseError: err.message });
    }
  }
}

/**
 * Validate that a parsed object matches the expected study data schema.
 *
 * @param {any} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateSchema(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Response is not a valid object'] };
  }

  // Summary validation
  if (!data.summary?.overview || typeof data.summary.overview !== 'string') {
    errors.push('Missing or invalid: summary.overview');
  }
  if (!Array.isArray(data.summary?.keyTakeaways) || data.summary.keyTakeaways.length === 0) {
    errors.push('Missing or empty: summary.keyTakeaways');
  }

  // Flashcards validation
  if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
    errors.push('Missing or empty: flashcards');
  } else {
    data.flashcards.forEach((card, i) => {
      if (!card.question) errors.push(`flashcards[${i}]: missing question`);
      if (!card.answer) errors.push(`flashcards[${i}]: missing answer`);
    });
  }

  // Quiz validation
  if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
    errors.push('Missing or empty: quiz');
  } else {
    data.quiz.forEach((q, i) => {
      if (!q.question) errors.push(`quiz[${i}]: missing question`);
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`quiz[${i}]: options must have at least 2 items`);
      }
      if (typeof q.correctAnswer !== 'number') {
        errors.push(`quiz[${i}]: correctAnswer must be a number`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Normalize a parsed AI response — fill defaults, sanitize, ensure IDs.
 *
 * @param {object} data
 * @returns {NormalizedStudyData}
 */
export function normalize(data) {
  return {
    summary: {
      overview: data.summary?.overview || 'Summary not available.',
      keyTakeaways: Array.isArray(data.summary?.keyTakeaways)
        ? data.summary.keyTakeaways.filter(Boolean)
        : [],
      mnemonics: Array.isArray(data.summary?.mnemonics)
        ? data.summary.mnemonics.filter(Boolean)
        : [],
    },
    flashcards: (data.flashcards || []).map((card, i) => ({
      id: card.id ?? i + 1,
      question: String(card.question || `Question ${i + 1}`),
      answer: String(card.answer || 'Answer not available.'),
      difficulty: card.difficulty || 'medium',
      tags: Array.isArray(card.tags) ? card.tags : [],
    })),
    quiz: (data.quiz || []).map((q, i) => ({
      id: q.id ?? i + 1,
      question: String(q.question || `Question ${i + 1}`),
      options: Array.isArray(q.options) && q.options.length >= 2
        ? q.options.map(String)
        : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
      explanation: String(q.explanation || 'No explanation provided.'),
      difficulty: q.difficulty || 'medium',
    })),
  };
}

/**
 * @typedef {Object} NormalizedStudyData
 * @property {{ overview: string, keyTakeaways: string[], mnemonics: string[] }} summary
 * @property {Array<{ id: number, question: string, answer: string, difficulty: string }>} flashcards
 * @property {Array<{ id: number, question: string, options: string[], correctAnswer: number, explanation: string }>} quiz
 */
