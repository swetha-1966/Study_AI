/**
 * Quiz — Domain model for a single quiz question.
 */
export class Quiz {
  /**
   * @param {object} data
   */
  constructor(data = {}) {
    this.id = data.id ?? Date.now();
    this.question = String(data.question || '').trim();
    this.options = Array.isArray(data.options)
      ? data.options.map(String)
      : ['Option A', 'Option B', 'Option C', 'Option D'];
    this.correctAnswer = typeof data.correctAnswer === 'number' ? data.correctAnswer : 0;
    this.explanation = String(data.explanation || '').trim();
    this.difficulty = data.difficulty || 'medium';
    this.topic = data.topic || '';
    this.isBookmarked = Boolean(data.isBookmarked);
  }

  // ─── Computed Properties ──────────────────────────────────────────────────

  /** The text of the correct answer option */
  get correctAnswerText() {
    return this.options[this.correctAnswer] || '';
  }

  /** Number of answer options */
  get optionCount() { return this.options.length; }

  /**
   * Check if a given answer index is correct.
   * @param {number} answerIndex
   * @returns {boolean}
   */
  isCorrect(answerIndex) {
    return answerIndex === this.correctAnswer;
  }

  // ─── Factory & Serialization ──────────────────────────────────────────────

  static fromRaw(raw) { return new Quiz(raw); }

  toJSON() {
    return {
      id: this.id,
      question: this.question,
      options: this.options,
      correctAnswer: this.correctAnswer,
      explanation: this.explanation,
      difficulty: this.difficulty,
      topic: this.topic,
      isBookmarked: this.isBookmarked,
    };
  }
}
