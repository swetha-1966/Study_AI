/**
 * analytics.js — Client-side analytics event bus.
 * A lightweight event system for tracking user actions without external dependencies.
 * Easily swappable with Mixpanel, Amplitude, or PostHog in the future.
 */

import { logger } from './logger';

const MODULE = 'Analytics';
const IS_DEV = import.meta.env.DEV === true;

/** In-memory event buffer for batching */
let eventBuffer = [];

/** Analytics enabled flag */
let isEnabled = true;

/**
 * Core track function.
 * @param {string} eventName - Event identifier (snake_case)
 * @param {Record<string, any>} [properties] - Event properties
 */
function track(eventName, properties = {}) {
  if (!isEnabled) return;

  const event = {
    event: eventName,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    },
  };

  eventBuffer.push(event);
  logger.debug(MODULE, `Track: ${eventName}`, properties);

  // In production, you'd flush the buffer to your analytics backend here
  if (!IS_DEV && eventBuffer.length >= 10) {
    flush();
  }
}

/**
 * Flush the event buffer to the analytics backend.
 * Currently a no-op — replace with your analytics API call.
 */
function flush() {
  if (eventBuffer.length === 0) return;
  logger.debug(MODULE, `Flushing ${eventBuffer.length} events`);
  // TODO: POST to analytics endpoint
  eventBuffer = [];
}

export const analytics = {
  track,
  flush,

  /** Enable analytics tracking */
  enable() { isEnabled = true; },

  /** Disable analytics tracking (e.g., user opted out) */
  disable() { isEnabled = false; eventBuffer = []; },

  /** Pre-defined events for type-safety */
  events: {
    SESSION_GENERATED: 'session_generated',
    FLASHCARD_COMPLETED: 'flashcard_completed',
    QUIZ_COMPLETED: 'quiz_completed',
    SUMMARY_VIEWED: 'summary_viewed',
    REVISION_OPENED: 'revision_opened',
    EXPORT_TRIGGERED: 'export_triggered',
    SESSION_LOADED: 'session_loaded',
    SESSION_DELETED: 'session_deleted',
    SETTINGS_CHANGED: 'settings_changed',
    COMMAND_PALETTE_OPENED: 'command_palette_opened',
  },
};
