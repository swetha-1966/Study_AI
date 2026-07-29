/**
 * AppError.js — Base error class for all StudyForge AI application errors.
 *
 * All custom errors extend this class, enabling:
 * - Consistent `instanceof` checks: `error instanceof AppError`
 * - Structured error shapes with code, context, and timestamp
 * - Easy serialization for logging and analytics
 */
export class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {string} [code='APP_ERROR'] - Machine-readable error code (SCREAMING_SNAKE_CASE)
   * @param {object} [context={}] - Additional debugging context
   */
  constructor(message, code = 'APP_ERROR', context = {}) {
    super(message);

    // Maintain proper stack trace in V8 (Chrome/Node)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.code = code;
    this.context = context;
    this.timestamp = new Date().toISOString();
    this.isAppError = true;
  }

  /**
   * Serialize to a plain object for logging/analytics.
   * @returns {object}
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }

  /**
   * User-facing message (safe to display in UI).
   * Override in subclasses for more specific messages.
   * @returns {string}
   */
  get userMessage() {
    return this.message;
  }
}
