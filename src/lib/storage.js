/**
 * storage.js — LocalStorage abstraction with JSON serialization and error handling.
 * Provides a safe typed API that never throws — all errors are caught and logged.
 */

import { logger } from './logger';

const MODULE = 'Storage';

export const storage = {
  /**
   * Get a value from localStorage.
   * @template T
   * @param {string} key
   * @param {T} [fallback] - Default value if key doesn't exist or parse fails
   * @returns {T}
   */
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return fallback;
      return JSON.parse(item);
    } catch (err) {
      logger.warn(MODULE, `Failed to get key "${key}":`, err.message);
      return fallback;
    }
  },

  /**
   * Set a value in localStorage.
   * @param {string} key
   * @param {any} value
   * @returns {boolean} - True if successful
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      logger.error(MODULE, `Failed to set key "${key}":`, err.message);
      return false;
    }
  },

  /**
   * Remove a key from localStorage.
   * @param {string} key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      logger.warn(MODULE, `Failed to remove key "${key}":`, err.message);
    }
  },

  /**
   * Check if a key exists.
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  /**
   * Clear all StudyForge-prefixed keys from localStorage.
   * @param {string} [prefix] - Key prefix to filter (default: 'studyforge_')
   */
  clearByPrefix(prefix = 'studyforge_') {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(prefix))
        .forEach((k) => localStorage.removeItem(k));
    } catch (err) {
      logger.error(MODULE, 'Failed to clear storage:', err.message);
    }
  },

  /**
   * Get approximate storage usage in KB.
   * @returns {number}
   */
  getUsageKB() {
    try {
      let total = 0;
      for (const key of Object.keys(localStorage)) {
        total += (localStorage.getItem(key) || '').length + key.length;
      }
      return Math.round(total / 1024);
    } catch {
      return 0;
    }
  },
};
