import { AppError } from './AppError';

/**
 * NetworkError — thrown when HTTP requests fail due to connectivity issues.
 *
 * @example
 * throw new NetworkError('Request timed out', 408, { url: '/api/v1/generate' });
 */
export class NetworkError extends AppError {
  /**
   * @param {string} message
   * @param {number} [statusCode] - HTTP status code (0 = no response)
   * @param {object} [context]
   */
  constructor(message, statusCode = 0, context = {}) {
    const code = statusCode ? `HTTP_${statusCode}` : 'NETWORK_ERROR';
    super(message, code, { statusCode, ...context });
    this.statusCode = statusCode;
    this.isNetworkError = true;
  }

  get userMessage() {
    if (this.statusCode === 0) {
      return 'No internet connection — please check your network.';
    }
    if (this.statusCode === 429) {
      return 'Too many requests — please wait a moment and try again.';
    }
    if (this.statusCode >= 500) {
      return 'Server error — our team has been notified. Please try again.';
    }
    if (this.statusCode === 401 || this.statusCode === 403) {
      return 'Authentication error — please refresh the page.';
    }
    return `Request failed (${this.statusCode}) — please try again.`;
  }

  /** True if the failure is a client-side network problem (no response received) */
  get isOffline() {
    return this.statusCode === 0;
  }

  /** True if rate-limited */
  get isRateLimited() {
    return this.statusCode === 429;
  }
}

/**
 * Create a NetworkError from an Axios error object.
 * @param {any} axiosError
 * @returns {NetworkError}
 */
export function fromAxiosError(axiosError) {
  if (axiosError.response) {
    const { status, data } = axiosError.response;
    const message = data?.error?.message || data?.message || `Request failed with status ${status}`;
    return new NetworkError(message, status, {
      url: axiosError.config?.url,
      method: axiosError.config?.method,
    });
  }

  // No response (network down, timeout, CORS, etc.)
  return new NetworkError(
    axiosError.message || 'Network request failed',
    0,
    { url: axiosError.config?.url }
  );
}
