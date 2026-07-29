import { useEffect } from 'react';

/**
 * Global Hotkey Listener Hook.
 *
 * @param {object} keyMap - Map of key names to callback functions
 */
export function useKeyboard(keyMap = {}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore hotkeys when typing in input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      const key = e.key;

      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'k') {
        e.preventDefault();
        if (keyMap['Ctrl+K']) keyMap['Ctrl+K'](e);
        return;
      }

      if (keyMap[key]) {
        keyMap[key](e);
      } else if (keyMap[key.toLowerCase()]) {
        keyMap[key.toLowerCase()](e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyMap]);
}
