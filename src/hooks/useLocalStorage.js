import { useState, useCallback } from 'react';
import { storage } from '../lib/storage';

/**
 * useLocalStorage — React state synced to localStorage.
 * @template T
 * @param {string} key - LocalStorage key
 * @param {T} initialValue - Default value if key is empty
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return storage.get(key, initialValue);
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const newValue = typeof value === 'function' ? value(prev) : value;
        storage.set(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    storage.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
