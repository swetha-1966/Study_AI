import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import { storage } from '../lib/storage';

/**
 * useDarkMode — Manages dark/light mode with system preference detection.
 * Syncs to localStorage and responds to OS-level theme changes.
 * @returns {{ isDark: boolean, toggle: Function, setDark: Function, setLight: Function }}
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.THEME, null);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    // Fall back to system preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => {
      storage.set(STORAGE_KEYS.THEME, !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  const setDark = () => {
    storage.set(STORAGE_KEYS.THEME, 'dark');
    setIsDark(true);
  };

  const setLight = () => {
    storage.set(STORAGE_KEYS.THEME, 'light');
    setIsDark(false);
  };

  return { isDark, toggle, setDark, setLight };
}
