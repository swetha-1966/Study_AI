/**
 * constants.js — App-wide constants.
 * Avoids magic strings and numbers scattered across the codebase.
 */

export const APP_NAME = 'StudyForge AI';
export const APP_VERSION = '1.0.0';
export const APP_TAGLINE = 'Transform Any Topic Into Interactive Learning';

/** Study difficulty levels */
export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
};

/** Default content generation options */
export const DEFAULT_GENERATION_OPTIONS = {
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  cardCount: 8,
  quizCount: 5,
  includeSummary: true,
  includeFlashcards: true,
  includeQuiz: true,
  includeRevision: true,
};

/** LocalStorage keys */
export const STORAGE_KEYS = {
  HISTORY: 'studyforge_history',
  ACTIVE_SESSION: 'studyforge_active_session',
  THEME: 'studyforge_theme',
  SETTINGS: 'studyforge_settings',
  BOOKMARKS: 'studyforge_bookmarks',
};

/** Quiz timer durations (seconds) */
export const QUIZ_TIMER = {
  DEFAULT: 600,
  SHORT: 300,
  LONG: 900,
  WARNING_THRESHOLD: 60,
};

/** Maximum limits */
export const LIMITS = {
  HISTORY_SESSIONS: 50,
  TOPIC_MIN_LENGTH: 3,
  TOPIC_MAX_LENGTH: 150,
  FLASHCARD_MAX: 20,
  QUIZ_MAX: 15,
};

/** Supported export formats */
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  JSON: 'json',
  MARKDOWN: 'markdown',
};

/** Study module types */
export const MODULE_TYPES = {
  SUMMARY: 'summary',
  FLASHCARDS: 'flashcards',
  QUIZ: 'quiz',
  REVISION: 'revision',
  ANALYTICS: 'analytics',
  INTERVIEW: 'interview',
};

/** Route names (used instead of raw strings) */
export const ROUTES = {
  LANDING: 'landing',
  DASHBOARD: 'dashboard',
  CREATE: 'create',
  PROCESSING: 'processing',
  STUDY: 'study',
  ANALYTICS: 'analytics',
  REVISION: 'revision',
  PROFILE: 'profile',
  SETTINGS: 'settings',
};
