/**
 * notificationService.js — App notification management.
 * A thin pub/sub layer over the NotificationContext.
 */

/** Notification types */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/** Default durations per type (ms) */
const DEFAULT_DURATIONS = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000,
};

/**
 * Creates a notification object.
 * @param {string} type - Notification type
 * @param {string} message - Display message
 * @param {object} [options]
 * @returns {NotificationItem}
 */
export function createNotification(type, message, options = {}) {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    message,
    duration: options.duration ?? DEFAULT_DURATIONS[type] ?? 3000,
    action: options.action ?? null,
    createdAt: Date.now(),
  };
}

/** Convenience factory functions */
export const notify = {
  success: (msg, opts) => createNotification(NOTIFICATION_TYPES.SUCCESS, msg, opts),
  error: (msg, opts) => createNotification(NOTIFICATION_TYPES.ERROR, msg, opts),
  warning: (msg, opts) => createNotification(NOTIFICATION_TYPES.WARNING, msg, opts),
  info: (msg, opts) => createNotification(NOTIFICATION_TYPES.INFO, msg, opts),
};

/**
 * @typedef {Object} NotificationItem
 * @property {string} id
 * @property {'success'|'error'|'warning'|'info'} type
 * @property {string} message
 * @property {number} duration
 * @property {{ label: string, onClick: Function }|null} action
 * @property {number} createdAt
 */
