import { MemoryCache } from './MemoryCache';
import { StorageCache } from './StorageCache';

/**
 * CacheManager — Unified facade over all cache layers.
 *
 * Provides named cache instances with consistent API across
 * in-memory and persistent storage.
 *
 * Cache layers:
 * - ai       → MemoryCache (10 min TTL) — AI response cache
 * - session  → StorageCache — persistent session data
 * - analytics→ MemoryCache (5 min TTL) — analytics data
 * - ui       → MemoryCache — ephemeral UI state
 */
class CacheManagerClass {
  constructor() {
    this._caches = {
      ai: new MemoryCache({ maxSize: 30, ttlMs: 10 * 60 * 1000, name: 'AI' }),
      session: new StorageCache('studyforge:session'),
      analytics: new MemoryCache({ maxSize: 20, ttlMs: 5 * 60 * 1000, name: 'Analytics' }),
      ui: new MemoryCache({ maxSize: 50, name: 'UI' }),
    };
  }

  /**
   * Get a named cache instance.
   * @param {'ai'|'session'|'analytics'|'ui'} name
   * @returns {MemoryCache|StorageCache}
   */
  get(name) {
    if (!this._caches[name]) {
      throw new Error(`Unknown cache: "${name}". Available: ${Object.keys(this._caches).join(', ')}`);
    }
    return this._caches[name];
  }

  /** AI response cache */
  get ai() { return this._caches.ai; }

  /** Session persistence cache */
  get session() { return this._caches.session; }

  /** Analytics data cache */
  get analytics() { return this._caches.analytics; }

  /** UI state cache */
  get ui() { return this._caches.ui; }

  /**
   * Clear all cache layers.
   */
  clearAll() {
    for (const cache of Object.values(this._caches)) {
      cache.clear();
    }
  }

  /**
   * Get stats from all memory caches.
   * @returns {object}
   */
  getStats() {
    const stats = {};
    for (const [name, cache] of Object.entries(this._caches)) {
      if (typeof cache.stats === 'object') {
        stats[name] = cache.stats;
      }
    }
    return stats;
  }
}

/** Shared CacheManager singleton */
export const cacheManager = new CacheManagerClass();

// Re-export cache classes for direct instantiation
export { MemoryCache } from './MemoryCache';
export { StorageCache } from './StorageCache';
