/**
 * analytics.js — Analytics data shape documentation.
 */

/**
 * @typedef {Object} AnalyticsSummary
 * @property {number} totalSessions - Total study sessions created
 * @property {number} totalStudyMinutes - Total time studied (minutes)
 * @property {number} averageQuizScore - Average quiz percentage (0-100)
 * @property {number} flashcardsReviewed - Total flashcards reviewed
 * @property {number} streakDays - Current consecutive study streak
 * @property {number} longestStreak - Longest ever streak in days
 */

/**
 * @typedef {Object} StudyDay
 * @property {string} date - ISO date string (YYYY-MM-DD)
 * @property {number} minutes - Minutes studied on this day
 * @property {number} sessions - Sessions completed on this day
 */

/**
 * @typedef {Object} TopicStats
 * @property {string} topic - Topic name
 * @property {number} sessions - Sessions on this topic
 * @property {number} accuracy - Quiz accuracy percentage
 * @property {number} timeMinutes - Time spent
 * @property {'strong'|'weak'|'neutral'} strength - Topic mastery assessment
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id - Unique achievement ID
 * @property {string} title - Display title
 * @property {string} description - What the user did to earn it
 * @property {string} icon - Emoji or icon identifier
 * @property {boolean} earned - Whether the user has earned this
 * @property {string} [earnedAt] - ISO timestamp when earned
 */

/**
 * Creates a default analytics summary.
 * @returns {AnalyticsSummary}
 */
export function createAnalyticsSummary() {
  return {
    totalSessions: 0,
    totalStudyMinutes: 0,
    averageQuizScore: 0,
    flashcardsReviewed: 0,
    streakDays: 0,
    longestStreak: 0,
  };
}
