/**
 * AIProviderInterface.js — Contract that every AI provider must implement.
 *
 * This interface enforces a common API across Gemini, OpenAI, Claude, or any local LLM.
 * Switching providers = swapping the implementation in AIProviderFactory.
 *
 * USAGE:
 *   class MyProvider extends AIProvider {
 *     async generate(topic, options) { ... }
 *     async explain(question, options) { ... }
 *   }
 */
export class AIProvider {
  /**
   * @param {string} name - Provider display name (e.g. 'Gemini', 'OpenAI')
   * @param {object} [config] - Provider-specific configuration
   */
  constructor(name, config = {}) {
    if (new.target === AIProvider) {
      throw new Error('AIProvider is abstract — extend it instead of instantiating directly.');
    }
    this.name = name;
    this.config = config;
  }

  /**
   * Generate comprehensive study materials for a topic.
   *
   * @param {string} topic - Study topic or notes
   * @param {object} options - Generation options
   * @param {string} [options.difficulty] - 'Easy' | 'Intermediate' | 'Advanced'
   * @param {number} [options.cardCount] - Number of flashcards to generate
   * @param {number} [options.quizCount] - Number of quiz questions to generate
   * @param {AbortSignal} [options.signal] - AbortSignal for cancellation
   * @returns {Promise<RawStudyResponse>}
   */
  // eslint-disable-next-line no-unused-vars
  async generate(topic, options = {}) {
    throw new Error(`${this.name}.generate() is not implemented`);
  }

  /**
   * Generate an explanation for a quiz answer.
   *
   * @param {string} question - The quiz question
   * @param {string[]} options - Answer options
   * @param {number} userAnswer - User's selected index
   * @param {number} correctAnswer - Correct answer index
   * @returns {Promise<string>}
   */
  // eslint-disable-next-line no-unused-vars
  async explain(question, options, userAnswer, correctAnswer) {
    throw new Error(`${this.name}.explain() is not implemented`);
  }

  /**
   * Check if this provider is currently available.
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    return true;
  }

  /**
   * Provider display name.
   * @returns {string}
   */
  toString() {
    return `[AIProvider: ${this.name}]`;
  }
}

/**
 * @typedef {Object} RawStudyResponse
 * @property {object} summary
 * @property {object[]} flashcards
 * @property {object[]} quiz
 */
