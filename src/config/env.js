/**
 * env.js — Typed environment variable access.
 * Centralises all env reads so we get helpful errors at startup, not at runtime.
 */

const required = (key) => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`[env] Missing environment variable: ${key}`);
  }
  return value || '';
};

const optional = (key, fallback = '') => {
  return import.meta.env[key] ?? fallback;
};

export const env = {
  /** Google Gemini API key */
  GEMINI_API_KEY: optional('VITE_GEMINI_API_KEY', ''),

  /** Backend API base URL */
  API_BASE_URL: optional('VITE_API_BASE_URL', 'http://localhost:5001'),

  /** Current runtime mode */
  MODE: import.meta.env.MODE || 'development',

  /** Is production build */
  IS_PROD: import.meta.env.PROD === true,

  /** Is development mode */
  IS_DEV: import.meta.env.DEV === true,

  /** App version from package.json (injected at build time) */
  APP_VERSION: optional('VITE_APP_VERSION', '1.0.0'),

  /** Application name */
  APP_NAME: optional('VITE_APP_NAME', 'StudyForge AI'),
};
