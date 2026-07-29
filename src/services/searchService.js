/**
 * searchService.js — Client-side full-text search across study sessions.
 * Searches topic, summary content, flashcard Q&A, and quiz questions.
 */

import { logger } from '../lib/logger';

const MODULE = 'SearchService';

/**
 * Normalize text for searching (lowercase, trim).
 * @param {string} text
 * @returns {string}
 */
const normalize = (text) => (text || '').toLowerCase().trim();

/**
 * Search sessions by query string.
 * @param {import('../types/studySession').StudySession[]} sessions
 * @param {string} query
 * @param {object} [options]
 * @param {string[]} [options.fields] - Which fields to search
 * @returns {SearchResult[]}
 */
export function searchSessions(sessions, query, options = {}) {
  const q = normalize(query);
  if (!q || q.length < 2) return sessions.map((s) => ({ session: s, score: 0, matches: [] }));

  const fields = options.fields || ['topic', 'summary', 'flashcards', 'quiz'];
  const results = [];

  for (const session of sessions) {
    let score = 0;
    const matches = [];

    if (fields.includes('topic')) {
      const topic = normalize(session.topic);
      if (topic.includes(q)) {
        score += topic.startsWith(q) ? 10 : 5;
        matches.push({ field: 'topic', snippet: session.topic });
      }
    }

    if (fields.includes('summary') && session.summary?.overview) {
      const overview = normalize(session.summary.overview);
      if (overview.includes(q)) {
        score += 3;
        const idx = overview.indexOf(q);
        matches.push({
          field: 'summary',
          snippet: session.summary.overview.slice(Math.max(0, idx - 30), idx + 80) + '...',
        });
      }
    }

    if (fields.includes('flashcards') && session.flashcards) {
      const matchedCards = session.flashcards.filter(
        (c) => normalize(c.question).includes(q) || normalize(c.answer).includes(q)
      );
      if (matchedCards.length > 0) {
        score += matchedCards.length * 2;
        matches.push({ field: 'flashcards', snippet: `${matchedCards.length} flashcard match(es)` });
      }
    }

    if (score > 0) {
      results.push({ session, score, matches });
    }
  }

  logger.debug(MODULE, `Search "${query}" → ${results.length} results`);
  return results.sort((a, b) => b.score - a.score);
}

/**
 * @typedef {Object} SearchResult
 * @property {import('../types/studySession').StudySession} session
 * @property {number} score
 * @property {{ field: string, snippet: string }[]} matches
 */
