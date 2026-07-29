import { AppError } from './AppError';

/**
 * ValidationError — thrown when user input fails validation rules.
 *
 * @example
 * throw new ValidationError('Topic must be at least 3 characters', 'topic', { value: 'ab', minLength: 3 });
 */
export class ValidationError extends AppError {
  /**
   * @param {string} message - Human-readable description
   * @param {string} [field] - The field that failed validation
   * @param {object} [context] - Additional context (value, min, max, pattern, etc.)
   */
  constructor(message, field = null, context = {}) {
    super(message, 'VALIDATION_ERROR', { field, ...context });
    this.field = field;
    this.isValidationError = true;
  }

  get userMessage() {
    return this.field
      ? `${this.field}: ${this.message}`
      : this.message;
  }
}

/**
 * Create a ValidationError for a required field.
 * @param {string} field
 * @returns {ValidationError}
 */
export function requiredField(field) {
  return new ValidationError(`${field} is required`, field, { rule: 'required' });
}

/**
 * Create a ValidationError for a min-length violation.
 * @param {string} field
 * @param {number} min
 * @param {number} actual
 * @returns {ValidationError}
 */
export function minLength(field, min, actual) {
  return new ValidationError(
    `${field} must be at least ${min} characters (got ${actual})`,
    field,
    { rule: 'minLength', min, actual }
  );
}

/**
 * Create a ValidationError for a max-length violation.
 * @param {string} field
 * @param {number} max
 * @param {number} actual
 * @returns {ValidationError}
 */
export function maxLength(field, max, actual) {
  return new ValidationError(
    `${field} must be at most ${max} characters (got ${actual})`,
    field,
    { rule: 'maxLength', max, actual }
  );
}
