/**
 * featureFlags.js — Runtime feature toggle system.
 *
 * To enable a flag per environment, set VITE_FF_<FLAG_NAME>=true in your .env file.
 * Flags default to the value defined here.
 */

const getFlag = (key, defaultValue) => {
  const envKey = `VITE_FF_${key.toUpperCase()}`;
  const envValue = import.meta.env[envKey];
  if (envValue === 'true') return true;
  if (envValue === 'false') return false;
  return defaultValue;
};

export const featureFlags = {
  /** Enable the AI-powered interview module */
  INTERVIEW_MODULE: getFlag('INTERVIEW_MODULE', false),

  /** Enable spaced repetition algorithm in flashcards */
  SPACED_REPETITION: getFlag('SPACED_REPETITION', true),

  /** Enable text-to-speech across all modules */
  TEXT_TO_SPEECH: getFlag('TEXT_TO_SPEECH', true),

  /** Enable PDF export functionality */
  PDF_EXPORT: getFlag('PDF_EXPORT', true),

  /** Enable the analytics dashboard */
  ANALYTICS: getFlag('ANALYTICS', true),

  /** Enable offline mode / PWA support */
  OFFLINE_MODE: getFlag('OFFLINE_MODE', false),

  /** Enable AI explanation panel in quiz */
  QUIZ_EXPLANATIONS: getFlag('QUIZ_EXPLANATIONS', true),

  /** Enable command palette (Ctrl+K) */
  COMMAND_PALETTE: getFlag('COMMAND_PALETTE', true),

  /** Enable cloud sync (future feature) */
  CLOUD_SYNC: getFlag('CLOUD_SYNC', false),
};
