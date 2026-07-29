import { AppError } from './AppError';

/**
 * AIError — thrown when AI generation, parsing, or validation fails.
 *
 * @example
 * throw new AIError('Gemini API quota exceeded', 'QUOTA_EXCEEDED', { model: 'gemini-2.0-flash' });
 */
export class AIError extends AppError {
  /**
   * @param {string} message
   * @param {string} [code='AI_ERROR']
   * @param {object} [context]
   */
  constructor(message, code = 'AI_ERROR', context = {}) {
    super(message, code, context);
    this.isAIError = true;
  }

  get userMessage() {
    switch (this.code) {
      case 'QUOTA_EXCEEDED':
        return 'AI quota reached — using smart offline content instead.';
      case 'PARSE_ERROR':
        return 'AI returned an unexpected format. Retrying with fallback...';
      case 'SCHEMA_INVALID':
        return 'Generated content could not be validated. Please try again.';
      case 'PROVIDER_UNAVAILABLE':
        return 'AI provider is temporarily unavailable. Using cached content.';
      default:
        return 'AI generation encountered an issue. Please try again.';
    }
  }
}

/** Thrown when all AI model fallbacks fail */
export class AIProviderError extends AIError {
  constructor(message, context = {}) {
    super(message, 'PROVIDER_UNAVAILABLE', context);
  }
}

/** Thrown when AI JSON response cannot be parsed */
export class AIParseError extends AIError {
  constructor(rawText, context = {}) {
    super('Failed to parse AI JSON response', 'PARSE_ERROR', { rawText: rawText?.slice(0, 200), ...context });
  }
}

/** Thrown when AI response fails schema validation */
export class AISchemaError extends AIError {
  constructor(errors = [], context = {}) {
    super('AI response failed schema validation', 'SCHEMA_INVALID', { validationErrors: errors, ...context });
    this.validationErrors = errors;
  }
}
