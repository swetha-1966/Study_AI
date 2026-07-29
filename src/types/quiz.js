/**
 * quiz.js — Quiz and Question shape documentation.
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {number|string} id - Unique question identifier
 * @property {string} question - The question prompt text
 * @property {string[]} options - Array of 4 answer option strings (A, B, C, D)
 * @property {number} correctAnswer - 0-indexed index of the correct option
 * @property {string} explanation - Explanation shown after answering
 * @property {string} [difficulty] - 'easy' | 'medium' | 'hard'
 * @property {string} [topic] - Sub-topic this question belongs to
 * @property {boolean} [isBookmarked] - User bookmarked this question
 */

/**
 * @typedef {Object} QuizResult
 * @property {number} totalQuestions - Total number of questions
 * @property {number} correctCount - Number of correct answers
 * @property {number} wrongCount - Number of wrong answers
 * @property {number} skippedCount - Number of skipped questions
 * @property {number} percentage - Score as percentage (0-100)
 * @property {QuizQuestion[]} wrongQuestions - Questions answered incorrectly
 * @property {QuizQuestion[]} correctQuestions - Questions answered correctly
 * @property {Record<number, number>} userAnswers - Map of questionIndex → selectedOptionIndex
 * @property {Record<number, string>} confidences - Map of questionIndex → confidence level
 */

/**
 * @typedef {'Guess'|'Maybe'|'Confident'} ConfidenceLevel
 */

/**
 * Creates a default quiz question.
 * @param {Partial<QuizQuestion>} overrides
 * @returns {QuizQuestion}
 */
export function createQuestion(overrides = {}) {
  return {
    id: Date.now(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    difficulty: 'medium',
    isBookmarked: false,
    ...overrides,
  };
}
