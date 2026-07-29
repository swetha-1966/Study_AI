/**
 * logger.js — Structured console logger with log levels.
 * Respects production environment (silences debug/info in prod).
 */

const IS_DEV = import.meta.env.DEV === true;

const LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const CURRENT_LEVEL = IS_DEV ? LEVELS.DEBUG : LEVELS.WARN;

const format = (level, module, ...args) => {
  const timestamp = new Date().toISOString().slice(11, 23);
  const prefix = `[${timestamp}] [${level}]${module ? ` [${module}]` : ''}`;
  return [prefix, ...args];
};

export const logger = {
  /**
   * Debug log — only visible in development.
   * @param {string} module - Source module name
   * @param {...any} args - Log arguments
   */
  debug(module, ...args) {
    if (CURRENT_LEVEL <= LEVELS.DEBUG) {
      console.debug(...format('DEBUG', module, ...args));
    }
  },

  /**
   * Info log — only visible in development.
   */
  info(module, ...args) {
    if (CURRENT_LEVEL <= LEVELS.INFO) {
      console.info(...format('INFO', module, ...args));
    }
  },

  /**
   * Warning log — visible in all environments.
   */
  warn(module, ...args) {
    if (CURRENT_LEVEL <= LEVELS.WARN) {
      console.warn(...format('WARN', module, ...args));
    }
  },

  /**
   * Error log — visible in all environments.
   */
  error(module, ...args) {
    if (CURRENT_LEVEL <= LEVELS.ERROR) {
      console.error(...format('ERROR', module, ...args));
    }
  },
};
