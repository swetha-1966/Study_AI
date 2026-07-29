/**
 * studySession.js — Study session shape documentation.
 *
 * These are plain JS objects with JSDoc descriptions.
 * They serve as the single source of truth for data shapes,
 * making TypeScript migration trivial in the future.
 */

/**
 * @typedef {Object} StudySession
 * @property {string} id - Unique session identifier (UUID)
 * @property {string} topic - The study topic / user input (max 150 chars)
 * @property {string} difficulty - One of: 'Easy' | 'Intermediate' | 'Advanced' | 'Expert'
 * @property {SummaryData} summary - AI-generated summary content
 * @property {FlashcardItem[]} flashcards - Array of flashcard objects
 * @property {QuizQuestion[]} quiz - Array of quiz questions
 * @property {RevisionData} [revision] - Optional revision sheet data
 * @property {string} createdAt - ISO 8601 timestamp
 * @property {string} [updatedAt] - ISO 8601 timestamp of last modification
 * @property {boolean} [isFavorite] - Whether session is bookmarked
 * @property {SessionProgress} [progress] - User's progress through the session
 */

/**
 * @typedef {Object} SummaryData
 * @property {string} overview - Multi-paragraph topic overview
 * @property {string[]} keyTakeaways - 3-6 key learning points
 * @property {string[]} [mnemonics] - Memory tricks / mnemonics
 */

/**
 * @typedef {Object} SessionProgress
 * @property {number} flashcardsCompleted - Number of flashcards reviewed
 * @property {number} quizScore - Last quiz percentage (0-100)
 * @property {number} timeSpentMinutes - Total time spent on session
 * @property {string} [lastAccessedAt] - ISO timestamp
 */

/**
 * Creates a default empty session structure.
 * @param {Partial<StudySession>} overrides
 * @returns {StudySession}
 */
export function createSession(overrides = {}) {
  return {
    id: crypto.randomUUID?.() || `session_${Date.now()}`,
    topic: '',
    difficulty: 'Intermediate',
    summary: { overview: '', keyTakeaways: [], mnemonics: [] },
    flashcards: [],
    quiz: [],
    createdAt: new Date().toISOString(),
    isFavorite: false,
    progress: {
      flashcardsCompleted: 0,
      quizScore: 0,
      timeSpentMinutes: 0,
    },
    ...overrides,
  };
}
