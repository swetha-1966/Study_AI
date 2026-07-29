/**
 * performance.js — Web Performance monitoring utilities.
 * Measures component render times, API call durations, and Web Vitals.
 */

import { logger } from './logger';

const MODULE = 'Performance';
const IS_DEV = import.meta.env.DEV === true;

/** Active performance marks */
const marks = new Map();

export const perf = {
  /**
   * Start timing a named operation.
   * @param {string} name - Unique timer name
   */
  start(name) {
    marks.set(name, performance.now());
    if (IS_DEV) {
      logger.debug(MODULE, `⏱ Start: ${name}`);
    }
  },

  /**
   * End timing and return the duration in ms.
   * @param {string} name - Timer name (must match a prior start() call)
   * @returns {number} Duration in milliseconds
   */
  end(name) {
    const startTime = marks.get(name);
    if (startTime === undefined) {
      logger.warn(MODULE, `No start mark found for: ${name}`);
      return 0;
    }
    const duration = Math.round(performance.now() - startTime);
    marks.delete(name);

    if (IS_DEV) {
      const color = duration > 1000 ? '🔴' : duration > 300 ? '🟡' : '🟢';
      logger.debug(MODULE, `${color} ${name}: ${duration}ms`);
    }
    return duration;
  },

  /**
   * Measure a synchronous function and log its duration.
   * @template T
   * @param {string} name - Label for the measurement
   * @param {() => T} fn - Function to measure
   * @returns {T}
   */
  measure(name, fn) {
    this.start(name);
    const result = fn();
    this.end(name);
    return result;
  },

  /**
   * Measure an async function and log its duration.
   * @template T
   * @param {string} name - Label for the measurement
   * @param {() => Promise<T>} fn - Async function to measure
   * @returns {Promise<T>}
   */
  async measureAsync(name, fn) {
    this.start(name);
    const result = await fn();
    this.end(name);
    return result;
  },
};
