/**
 * errorParser.js — Normalize errors from different sources into a consistent shape.
 * Handles Axios errors, network errors, AI parsing errors, and generic JS errors.
 */

/**
 * @typedef {Object} ParsedError
 * @property {string} message - Human-readable error message
 * @property {string} code - Machine-readable error code
 * @property {number} [status] - HTTP status code (if applicable)
 * @property {boolean} isNetworkError - True if it's a connectivity issue
 * @property {boolean} isValidationError - True if it's a user input error
 * @property {boolean} isAIError - True if it's an AI/generation error
 * @property {any} [raw] - Original error object
 */

/**
 * Parse any error into a consistent shape.
 * @param {any} error - The raw error
 * @param {string} [fallbackMessage]
 * @returns {ParsedError}
 */
export function parseError(error, fallbackMessage = 'An unexpected error occurred') {
  // Axios/HTTP error
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data;
    return {
      message: data?.error?.message || data?.message || `Request failed (${status})`,
      code: data?.error?.code || `HTTP_${status}`,
      status,
      isNetworkError: false,
      isValidationError: status === 400 || status === 422,
      isAIError: false,
      raw: error,
    };
  }

  // Network error (no response)
  if (error?.request || error?.message?.toLowerCase().includes('network')) {
    return {
      message: 'Network error — please check your internet connection.',
      code: 'NETWORK_ERROR',
      isNetworkError: true,
      isValidationError: false,
      isAIError: false,
      raw: error,
    };
  }

  // AI/JSON parsing error
  if (error?.message?.toLowerCase().includes('json') || error?.message?.toLowerCase().includes('parse')) {
    return {
      message: 'AI response could not be parsed. Please try again.',
      code: 'AI_PARSE_ERROR',
      isNetworkError: false,
      isValidationError: false,
      isAIError: true,
      raw: error,
    };
  }

  // Quota/rate limit
  if (error?.status === 429 || error?.message?.toLowerCase().includes('quota')) {
    return {
      message: 'API quota exceeded. Using offline fallback content.',
      code: 'QUOTA_EXCEEDED',
      status: 429,
      isNetworkError: false,
      isValidationError: false,
      isAIError: true,
      raw: error,
    };
  }

  // Generic error
  return {
    message: error?.message || fallbackMessage,
    code: error?.code || 'UNKNOWN_ERROR',
    isNetworkError: false,
    isValidationError: false,
    isAIError: false,
    raw: error,
  };
}

/**
 * Format a ParsedError for display to the user.
 * @param {ParsedError} parsedError
 * @returns {string}
 */
export function formatErrorForDisplay(parsedError) {
  return parsedError.message;
}
