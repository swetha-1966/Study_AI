import { get } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { logger } from '../../lib/logger';
import { appCache } from '../../utils/cache';

const MODULE = 'AnalyticsRepository';
const CACHE_KEY = 'analytics:overview';

/**
 * AnalyticsRepository — Data access layer for analytics and learning insights.
 */
class AnalyticsRepositoryClass {
  /**
   * Get the user's analytics overview.
   * Cached for 5 minutes to avoid redundant requests.
   * @returns {Promise<object>}
   */
  async getOverview() {
    const cached = appCache.get(CACHE_KEY);
    if (cached) {
      logger.debug(MODULE, 'Returning cached analytics');
      return cached;
    }

    try {
      const response = await get(API_ENDPOINTS.ANALYTICS);
      const data = response.data || response;
      appCache.set(CACHE_KEY, data);
      return data;
    } catch (err) {
      logger.warn(MODULE, 'Failed to fetch analytics, using defaults:', err.message);
      return this._defaultAnalytics();
    }
  }

  /**
   * Calculate analytics from local session history.
   * @param {object[]} sessions
   * @returns {object}
   */
  calculateFromSessions(sessions = []) {
    const totalSessions = sessions.length;
    const totalFlashcards = sessions.reduce((sum, s) => sum + (s.flashcards?.length || 0), 0);
    const quizScores = sessions
      .filter((s) => typeof s.quizScore === 'number')
      .map((s) => s.quizScore);
    const avgScore = quizScores.length
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;

    return {
      totalSessions,
      totalFlashcards,
      averageQuizScore: avgScore,
      streakDays: this._calculateStreak(sessions),
    };
  }

  /** @private */
  _calculateStreak(sessions) {
    if (!sessions.length) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    let current = new Date(today);

    const sessionDates = new Set(
      sessions.map((s) => {
        const d = new Date(s.createdAt || Date.now());
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    );

    while (sessionDates.has(current.getTime())) {
      streak++;
      current.setDate(current.getDate() - 1);
    }
    return streak;
  }

  /** @private */
  _defaultAnalytics() {
    return {
      retentionScore: 0,
      totalQuestions: 0,
      studyHours: 0,
      streakDays: 0,
    };
  }
}

export const AnalyticsRepository = new AnalyticsRepositoryClass();
