// Core Errors — Public API
export { AppError } from './AppError';
export { ValidationError, requiredField, minLength, maxLength } from './ValidationError';
export { AIError, AIProviderError, AIParseError, AISchemaError } from './AIError';
export { NetworkError, fromAxiosError } from './NetworkError';
export { StorageError } from './StorageError';

/**
 * Determine if an error is any kind of application error.
 * @param {any} error
 * @returns {boolean}
 */
export function isAppError(error) {
  return error?.isAppError === true;
}

/**
 * Safely extract a user-facing message from any error type.
 * @param {any} error
 * @param {string} [fallback]
 * @returns {string}
 */
export function getErrorMessage(error, fallback = 'An unexpected error occurred') {
  if (isAppError(error)) return error.userMessage;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
}
