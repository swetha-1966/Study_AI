/**
 * debounce.js — Framework-agnostic debounce and throttle utilities.
 * Use the React hook versions (useDebounce, useDebouncedCallback) inside components.
 * Use these plain functions in service/utility code.
 */

/**
 * Creates a debounced version of a function.
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function & { cancel: Function, flush: Function }}
 */
export function debounce(fn, delay) {
  let timer = null;
  let lastArgs = null;

  const debounced = (...args) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  debounced.flush = () => {
    if (timer && lastArgs) {
      clearTimeout(timer);
      fn(...lastArgs);
      timer = null;
    }
  };

  return debounced;
}

/**
 * Creates a throttled version of a function.
 * The function is invoked at most once per `interval` milliseconds.
 * @param {Function} fn - Function to throttle
 * @param {number} interval - Minimum interval between calls (ms)
 * @returns {Function & { cancel: Function }}
 */
export function throttle(fn, interval) {
  let lastCallTime = 0;
  let timer = null;

  const throttled = (...args) => {
    const now = Date.now();
    const remaining = interval - (now - lastCallTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCallTime = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCallTime = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return throttled;
}
