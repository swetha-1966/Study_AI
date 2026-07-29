import axios from 'axios';
import { fromAxiosError } from '../core/errors/NetworkError';
import { logger } from '../lib/logger';
import { withRetry } from '../utils/retryEngine';

const MODULE = 'ApiClient';

/**
 * API endpoints reference.
 * Centralised so a URL change requires editing exactly one file.
 */
export const ENDPOINTS = {
  HEALTH: '/api/v1/health',
  GENERATE: '/api/v1/generate',
  EXPLAIN: '/api/v1/explain',
  ANALYTICS: '/api/v1/analytics',
  STUDY: '/api/study',
};

/**
 * Shared Axios instance — single source for all HTTP configuration.
 *
 * Configuration:
 * - Base URL from env (defaults to localhost:5001)
 * - 30-second timeout
 * - JSON content type
 * - Response normalization interceptors
 * - Automatic NetworkError conversion
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor ────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    config._startTime = Date.now();
    logger.debug(MODULE, `→ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ───────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config._startTime || 0);
    logger.debug(MODULE, `← ${response.status} ${response.config.url} (${duration}ms)`);
    return response;
  },
  (error) => {
    if (axios.isCancel(error) || error.name === 'AbortError') {
      return Promise.reject(error);
    }
    // Convert to our typed NetworkError
    return Promise.reject(fromAxiosError(error));
  }
);

/**
 * GET request wrapper with retry support.
 * @param {string} url
 * @param {object} [params]
 * @param {object} [config]
 * @returns {Promise<any>}
 */
export async function get(url, params = {}, config = {}) {
  return withRetry(
    () => apiClient.get(url, { params, ...config }).then((r) => r.data),
    { maxAttempts: 2, baseDelayMs: 500 }
  );
}

/**
 * POST request wrapper.
 * @param {string} url
 * @param {object} [body]
 * @param {object} [config]
 * @returns {Promise<any>}
 */
export async function post(url, body = {}, config = {}) {
  return apiClient.post(url, body, config).then((r) => r.data);
}

export default apiClient;
