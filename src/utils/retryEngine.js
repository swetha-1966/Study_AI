/**
 * retryEngine.js — Robust retry logic for async operations with exponential backoff.
 */

import { logger } from '../lib/logger';

const MODULE = 'RetryEngine';

/**
 * Retry an async function with exponential backoff.
 * @template T
 * @param {() => Promise<T>} fn - The async function to retry
 * @param {object} [options]
 * @param {number} [options.maxAttempts=3] - Maximum number of attempts
 * @param {number} [options.baseDelayMs=500] - Initial delay between retries (ms)
 * @param {number} [options.maxDelayMs=10000] - Maximum delay (ms)
 * @param {number} [options.factor=2] - Exponential backoff multiplier
 * @param {(error: Error, attempt: number) => boolean} [options.shouldRetry] - Custom retry condition
 * @returns {Promise<T>}
 */
export async function withRetry(fn, options = {}) {
  const {
    maxAttempts = 3,
    baseDelayMs = 500,
    maxDelayMs = 10000,
    factor = 2,
    shouldRetry = () => true,
  } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error, attempt)) {
        logger.warn(MODULE, `All ${maxAttempts} attempts failed. Last error: ${error.message}`);
        throw error;
      }

      const delay = Math.min(baseDelayMs * Math.pow(factor, attempt - 1), maxDelayMs);
      logger.debug(MODULE, `Attempt ${attempt} failed. Retrying in ${delay}ms…`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Create a retryable version of an async function.
 * @template T
 * @param {(...args: any[]) => Promise<T>} fn
 * @param {object} [options] - Same as withRetry options
 * @returns {(...args: any[]) => Promise<T>}
 */
export function makeRetryable(fn, options = {}) {
  return (...args) => withRetry(() => fn(...args), options);
}
