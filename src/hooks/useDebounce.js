import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce — Returns a debounced version of the value.
 * @template T
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {T} - The debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback — Returns a debounced callback function.
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - The debounced function
 */
export function useDebouncedCallback(callback, delay = 300) {
  const timerRef = useRef(null);

  return (...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
