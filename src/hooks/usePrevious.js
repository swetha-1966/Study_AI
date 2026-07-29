import { useRef, useEffect } from 'react';

/**
 * usePrevious — Returns the previous value of a variable.
 * Useful for comparing previous vs. current props/state in effects.
 * @template T
 * @param {T} value
 * @returns {T|undefined} - The value from the previous render
 */
export function usePrevious(value) {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
