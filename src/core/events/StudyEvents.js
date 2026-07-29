/**
 * StudyEvents.js — Typed event name constants for the application event bus.
 *
 * Using constants instead of raw strings prevents typos and enables IDE autocomplete.
 *
 * NAMING CONVENTION:
 *   NOUN_VERB_PAST_TENSE
 *   e.g., SESSION_GENERATED, QUIZ_COMPLETED, FLASHCARD_MASTERED
 */

export const StudyEvents = Object.freeze({
  // ─── Session Events ───────────────────────────────────────────────────────
  /** Fired when a new study session is successfully generated */
  SESSION_GENERATED: 'session:generated',
  /** Fired when a session is loaded from history */
  SESSION_LOADED: 'session:loaded',
  /** Fired when a session is deleted */
  SESSION_DELETED: 'session:deleted',
  /** Fired when a session is favorited/unfavorited */
  SESSION_FAVORITED: 'session:favorited',

  // ─── Flashcard Events ─────────────────────────────────────────────────────
  /** Fired when a flashcard is marked as known */
  FLASHCARD_MASTERED: 'flashcard:mastered',
  /** Fired when a flashcard session is completed */
  FLASHCARD_SESSION_COMPLETED: 'flashcard:session_completed',
  /** Fired when a card is bookmarked */
  FLASHCARD_BOOKMARKED: 'flashcard:bookmarked',

  // ─── Quiz Events ──────────────────────────────────────────────────────────
  /** Fired when a quiz is submitted with results */
  QUIZ_COMPLETED: 'quiz:completed',
  /** Fired when a quiz question is answered */
  QUIZ_QUESTION_ANSWERED: 'quiz:question_answered',
  /** Fired when the quiz timer expires */
  QUIZ_TIMER_EXPIRED: 'quiz:timer_expired',

  // ─── Revision Events ─────────────────────────────────────────────────────
  /** Fired when a revision sheet is generated */
  REVISION_GENERATED: 'revision:generated',
  /** Fired when a revision checklist item is toggled */
  REVISION_CHECKLIST_TOGGLED: 'revision:checklist_toggled',

  // ─── Analytics Events ─────────────────────────────────────────────────────
  /** Fired when a study goal is reached */
  GOAL_REACHED: 'analytics:goal_reached',
  /** Fired when a streak milestone is hit */
  STREAK_MILESTONE: 'analytics:streak_milestone',
  /** Fired when an achievement is unlocked */
  ACHIEVEMENT_UNLOCKED: 'analytics:achievement_unlocked',

  // ─── UI Events ────────────────────────────────────────────────────────────
  /** Fired when the theme is changed */
  THEME_CHANGED: 'ui:theme_changed',
  /** Fired when the command palette is opened */
  COMMAND_PALETTE_OPENED: 'ui:command_palette_opened',
  /** Fired when a notification is requested */
  NOTIFICATION_REQUESTED: 'ui:notification_requested',

  // ─── Export Events ────────────────────────────────────────────────────────
  /** Fired when an export is triggered */
  EXPORT_TRIGGERED: 'export:triggered',
  /** Fired when an export completes */
  EXPORT_COMPLETED: 'export:completed',
});
