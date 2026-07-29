import { logger } from '../../lib/logger';

const MODULE = 'EventBus';

/**
 * EventBus — Lightweight typed pub/sub event system.
 *
 * Decouples cross-feature communication without prop drilling or context abuse.
 *
 * PATTERN:
 *   Feature A emits → EventBus → Feature B receives
 *
 * EXAMPLE:
 *   // Emit from quiz completion
 *   eventBus.emit(StudyEvents.QUIZ_COMPLETED, { score: 85, questions: 10 });
 *
 *   // Subscribe in analytics feature
 *   const unsub = eventBus.on(StudyEvents.QUIZ_COMPLETED, ({ score }) => {
 *     updateAnalytics(score);
 *   });
 *   // Cleanup:
 *   unsub();
 */
class EventBusClass {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._listeners = new Map();
    this._eventHistory = [];
    this._maxHistory = 50;
  }

  /**
   * Subscribe to an event.
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @returns {Function} Unsubscribe function
   */
  on(event, handler) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(handler);
    logger.debug(MODULE, `Subscribed to "${event}" (${this._listeners.get(event).size} listeners)`);

    // Return unsubscribe function
    return () => this.off(event, handler);
  }

  /**
   * Subscribe to an event — fires only once then auto-unsubscribes.
   * @param {string} event
   * @param {Function} handler
   * @returns {Function} Unsubscribe function
   */
  once(event, handler) {
    const wrapper = (payload) => {
      handler(payload);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event
   * @param {Function} handler
   */
  off(event, handler) {
    const listeners = this._listeners.get(event);
    if (listeners) {
      listeners.delete(handler);
      if (listeners.size === 0) {
        this._listeners.delete(event);
      }
    }
  }

  /**
   * Emit an event to all subscribers.
   * @param {string} event - Event name
   * @param {any} [payload] - Event data
   */
  emit(event, payload) {
    const entry = { event, payload, timestamp: Date.now() };

    // Record in history
    this._eventHistory.push(entry);
    if (this._eventHistory.length > this._maxHistory) {
      this._eventHistory.shift();
    }

    logger.debug(MODULE, `Emit: "${event}"`, payload);

    const listeners = this._listeners.get(event);
    if (!listeners || listeners.size === 0) return;

    for (const handler of listeners) {
      try {
        handler(payload);
      } catch (err) {
        logger.error(MODULE, `Handler error for "${event}":`, err.message);
      }
    }
  }

  /**
   * Get event history for debugging.
   * @returns {Array<{ event: string, payload: any, timestamp: number }>}
   */
  getHistory() {
    return [...this._eventHistory];
  }

  /**
   * Remove all listeners for an event, or all listeners if no event specified.
   * @param {string} [event]
   */
  clear(event) {
    if (event) {
      this._listeners.delete(event);
    } else {
      this._listeners.clear();
    }
  }

  /** Current listener count across all events */
  get listenerCount() {
    let total = 0;
    for (const set of this._listeners.values()) total += set.size;
    return total;
  }
}

/** Shared singleton event bus instance */
export const eventBus = new EventBusClass();
