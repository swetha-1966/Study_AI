import axios from 'axios';
import { env } from './env';

/**
 * axiosInstance — pre-configured Axios instance for all API calls.
 * Sets base URL, timeouts, and common headers in one place.
 */
export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor — attach auth tokens or trace IDs if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach a request timestamp for performance monitoring
    config.metadata = { startTime: Date.now() };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    const normalizedError = new Error(message);
    normalizedError.status = error.response?.status;
    normalizedError.data = error.response?.data;

    return Promise.reject(normalizedError);
  }
);
