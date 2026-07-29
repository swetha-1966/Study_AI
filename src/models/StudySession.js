import { Summary } from './Summary';
import { Flashcard } from './Flashcard';
import { Quiz } from './Quiz';

/**
 * StudySession — Domain model wrapping a complete AI-generated study session.
 *
 * Converts raw API/localStorage data into a typed, validated, and
 * behavior-enriched domain object.
 *
 * Benefits:
 * - Consistent shape — components always receive the same structure
 * - Validation at the boundary — bad data caught early
 * - Business logic encapsulated — not spread across components
 *
 * @example
 * const session = StudySession.fromRaw(apiResponse);
 * session.isComplete;       // → boolean
 * session.flashcardCount;   // → number
 * session.toStorageFormat(); // → plain object for localStorage
 */
export class StudySession {
  /**
   * @param {object} data
   */
  constructor(data = {}) {
    this.id = data.id || `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    this.topic = String(data.topic || '').trim();
    this.difficulty = data.difficulty || 'Intermediate';
    this.summary = data.summary instanceof Summary ? data.summary : new Summary(data.summary || {});
    this.flashcards = Array.isArray(data.flashcards)
      ? data.flashcards.map((f) => (f instanceof Flashcard ? f : new Flashcard(f)))
      : [];
    this.quiz = Array.isArray(data.quiz)
      ? data.quiz.map((q) => (q instanceof Quiz ? q : new Quiz(q)))
      : [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || this.createdAt;
    this.isFavorite = Boolean(data.isFavorite);
    this.tags = Array.isArray(data.tags) ? data.tags : [];
    this.progress = {
      flashcardsCompleted: data.progress?.flashcardsCompleted || 0,
      quizScore: data.progress?.quizScore || 0,
      timeSpentMinutes: data.progress?.timeSpentMinutes || 0,
    };
  }

  // ─── Computed Properties ──────────────────────────────────────────────────

  /** Number of flashcards in this session */
  get flashcardCount() { return this.flashcards.length; }

  /** Number of quiz questions in this session */
  get quizCount() { return this.quiz.length; }

  /** Whether the session has any study content */
  get hasContent() {
    return this.flashcards.length > 0 || this.quiz.length > 0;
  }

  /** Whether the session has a summary */
  get hasSummary() {
    return Boolean(this.summary?.overview);
  }

  /** Mastery percentage based on quiz score */
  get masteryPercent() {
    return this.progress.quizScore || 0;
  }

  /** Abbreviated topic for display */
  get shortTopic() {
    return this.topic.length > 50 ? `${this.topic.slice(0, 47)}...` : this.topic;
  }

  // ─── Factory Methods ──────────────────────────────────────────────────────

  /**
   * Create a StudySession from raw API/localStorage data.
   * @param {object} raw
   * @returns {StudySession}
   */
  static fromRaw(raw) {
    return new StudySession(raw);
  }

  /**
   * Create an empty StudySession.
   * @returns {StudySession}
   */
  static empty() {
    return new StudySession({});
  }

  // ─── Serialization ────────────────────────────────────────────────────────

  /**
   * Convert to a plain object for localStorage.
   * @returns {object}
   */
  toStorageFormat() {
    return {
      id: this.id,
      topic: this.topic,
      difficulty: this.difficulty,
      summary: this.summary.toJSON(),
      flashcards: this.flashcards.map((f) => f.toJSON()),
      quiz: this.quiz.map((q) => q.toJSON()),
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString(),
      isFavorite: this.isFavorite,
      tags: this.tags,
      progress: this.progress,
    };
  }

  toJSON() {
    return this.toStorageFormat();
  }

  toString() {
    return `[StudySession: "${this.shortTopic}" | ${this.flashcardCount} cards, ${this.quizCount} questions]`;
  }
}
