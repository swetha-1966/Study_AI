import { post } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { getProvider } from '../../ai/providers/index';
import { logger } from '../../lib/logger';

const MODULE = 'QuizRepository';

/**
 * QuizRepository — Data access layer for quiz operations.
 */
class QuizRepositoryClass {
  /**
   * Get an AI explanation for a quiz answer.
   *
   * @param {object} questionData - { question, options, correctAnswer }
   * @param {number} userAnswer - User's selected index
   * @returns {Promise<string>} Explanation text
   */
  async getExplanation(questionData, userAnswer) {
    const { question, options, correctAnswer } = questionData;

    // Try backend first
    try {
      const response = await post(API_ENDPOINTS.EXPLAIN, {
        question,
        options,
        userAnswer,
        correctAnswer,
      });
      return response.data?.explanation || response.explanation || '';
    } catch (err) {
      logger.warn(MODULE, 'Backend explanation failed, using AI provider:', err.message);
    }

    // Fall back to AI provider
    try {
      const provider = getProvider();
      return await provider.explain(question, options, userAnswer, correctAnswer);
    } catch (err) {
      logger.error(MODULE, 'AI explanation also failed:', err.message);
      return 'Explanation temporarily unavailable.';
    }
  }
}

export const QuizRepository = new QuizRepositoryClass();
