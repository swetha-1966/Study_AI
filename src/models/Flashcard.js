/**
 * Flashcard — Domain model for a single study flashcard.
 */
export class Flashcard {
  /**
   * @param {object} data
   */
  constructor(data = {}) {
    this.id = data.id ?? Date.now();
    this.question = String(data.question || '').trim();
    this.answer = String(data.answer || '').trim();
    this.difficulty = data.difficulty || 'medium';
    this.tags = Array.isArray(data.tags) ? data.tags : [];
    this.isBookmarked = Boolean(data.isBookmarked);
    this.leitnerBox = data.leitnerBox || 1; // 1-5 for spaced repetition
    this.lastReviewedAt = data.lastReviewedAt || null;
    this.nextReviewAt = data.nextReviewAt || null;
    this.reviewCount = data.reviewCount || 0;
    this.knownCount = data.knownCount || 0;
  }

  // ─── Computed Properties ──────────────────────────────────────────────────

  /** True if the user has marked this card as 'known' at least once */
  get hasBeenLearned() { return this.knownCount > 0; }

  /** True if it's time to review this card (spaced repetition) */
  get isDueForReview() {
    if (!this.nextReviewAt) return true;
    return new Date() >= new Date(this.nextReviewAt);
  }

  /** Abbreviated question for previews */
  get shortQuestion() {
    return this.question.length > 80 ? `${this.question.slice(0, 77)}...` : this.question;
  }

  // ─── Business Logic ───────────────────────────────────────────────────────

  /**
   * Mark card as known — advance its Leitner box.
   * @returns {Flashcard} New Flashcard instance (immutable update)
   */
  markKnown() {
    return new Flashcard({
      ...this.toJSON(),
      leitnerBox: Math.min(this.leitnerBox + 1, 5),
      knownCount: this.knownCount + 1,
      lastReviewedAt: new Date().toISOString(),
      nextReviewAt: this._calculateNextReview(this.leitnerBox + 1),
    });
  }

  /**
   * Mark card for review — reset its Leitner box.
   * @returns {Flashcard}
   */
  markForReview() {
    return new Flashcard({
      ...this.toJSON(),
      leitnerBox: 1,
      reviewCount: this.reviewCount + 1,
      lastReviewedAt: new Date().toISOString(),
      nextReviewAt: this._calculateNextReview(1),
    });
  }

  /** @private */
  _calculateNextReview(box) {
    const daysMap = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
    const days = daysMap[box] || 1;
    const next = new Date();
    next.setDate(next.getDate() + days);
    return next.toISOString();
  }

  // ─── Factory & Serialization ──────────────────────────────────────────────

  static fromRaw(raw) { return new Flashcard(raw); }

  toJSON() {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
      difficulty: this.difficulty,
      tags: this.tags,
      isBookmarked: this.isBookmarked,
      leitnerBox: this.leitnerBox,
      lastReviewedAt: this.lastReviewedAt,
      nextReviewAt: this.nextReviewAt,
      reviewCount: this.reviewCount,
      knownCount: this.knownCount,
    };
  }
}
