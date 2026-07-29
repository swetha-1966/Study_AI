/**
 * cache.js — Simple in-memory LRU-like cache for expensive computations.
 * Useful for caching AI responses, search results, or parsed data.
 */

/**
 * Creates a bounded in-memory cache.
 * @param {object} [options]
 * @param {number} [options.maxSize=100] - Maximum number of entries
 * @param {number} [options.ttlMs] - Time-to-live in milliseconds (optional)
 * @returns {Cache}
 */
export function createCache({ maxSize = 100, ttlMs } = {}) {
  const store = new Map();

  return {
    /**
     * Get a cached value.
     * @param {string} key
     * @returns {any|undefined}
     */
    get(key) {
      const entry = store.get(key);
      if (!entry) return undefined;

      if (ttlMs && Date.now() - entry.createdAt > ttlMs) {
        store.delete(key);
        return undefined;
      }

      // Move to end (most recently used)
      store.delete(key);
      store.set(key, entry);
      return entry.value;
    },

    /**
     * Set a cache entry.
     * @param {string} key
     * @param {any} value
     */
    set(key, value) {
      if (store.has(key)) store.delete(key);
      if (store.size >= maxSize) {
        // Evict the oldest entry (first inserted)
        const firstKey = store.keys().next().value;
        store.delete(firstKey);
      }
      store.set(key, { value, createdAt: Date.now() });
    },

    /** Check if key exists and is still valid */
    has(key) {
      return this.get(key) !== undefined;
    },

    /** Remove a specific key */
    delete(key) {
      store.delete(key);
    },

    /** Clear all entries */
    clear() {
      store.clear();
    },

    /** Current number of cached entries */
    get size() {
      return store.size;
    },
  };
}

/** Default application cache (shared instance) */
export const appCache = createCache({ maxSize: 50, ttlMs: 10 * 60 * 1000 }); // 10 min TTL
