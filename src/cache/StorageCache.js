import { logger } from '../lib/logger';

const MODULE = 'StorageCache';

/**
 * StorageCache — localStorage-backed cache for persistent data.
 *
 * Use for:
 * - Session history between page refreshes
 * - User settings persistence
 * - Offline data access
 */
export class StorageCache {
  /**
   * @param {string} [namespace='sc'] - Key prefix to avoid collisions
   * @param {number} [ttlMs] - Default TTL (undefined = permanent)
   */
  constructor(namespace = 'sc', ttlMs) {
    this.namespace = namespace;
    this.ttlMs = ttlMs;
  }

  _key(key) { return `${this.namespace}:${key}`; }

  /**
   * Get a value from localStorage.
   * @param {string} key
   * @param {any} [fallback]
   * @returns {any}
   */
  get(key, fallback = undefined) {
    try {
      const raw = localStorage.getItem(this._key(key));
      if (!raw) return fallback;
      const { value, createdAt, ttlMs } = JSON.parse(raw);
      const ttl = ttlMs ?? this.ttlMs;
      if (ttl && Date.now() - createdAt > ttl) {
        localStorage.removeItem(this._key(key));
        return fallback;
      }
      return value;
    } catch (err) {
      logger.warn(MODULE, `get("${key}") failed:`, err.message);
      return fallback;
    }
  }

  /**
   * Set a value in localStorage.
   * @param {string} key
   * @param {any} value
   * @param {number} [ttlMs] - Per-entry TTL
   * @returns {boolean}
   */
  set(key, value, ttlMs) {
    try {
      localStorage.setItem(
        this._key(key),
        JSON.stringify({ value, createdAt: Date.now(), ttlMs })
      );
      return true;
    } catch (err) {
      logger.error(MODULE, `set("${key}") failed:`, err.message);
      return false;
    }
  }

  has(key) { return this.get(key) !== undefined; }
  delete(key) { localStorage.removeItem(this._key(key)); }

  clear() {
    const prefix = `${this.namespace}:`;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k));
  }

  /** Approximate storage size used by this namespace (bytes) */
  get usageBytes() {
    const prefix = `${this.namespace}:`;
    return Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .reduce((total, k) => total + (k.length + (localStorage.getItem(k) || '').length) * 2, 0);
  }
}
