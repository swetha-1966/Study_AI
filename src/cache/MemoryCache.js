/**
 * MemoryCache.js — In-memory LRU cache with TTL support.
 *
 * Use for:
 * - AI response caching (same topic → instant result)
 * - Analytics data
 * - Expensive computed values
 */
export class MemoryCache {
  /**
   * @param {object} [options]
   * @param {number} [options.maxSize=100] - Max entries before evicting oldest
   * @param {number} [options.ttlMs] - Entry lifetime in ms (undefined = no expiry)
   * @param {string} [options.name='MemoryCache'] - For logging
   */
  constructor({ maxSize = 100, ttlMs, name = 'MemoryCache' } = {}) {
    /** @type {Map<string, { value: any, createdAt: number, ttlMs?: number }>} */
    this._store = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.name = name;
    this._hits = 0;
    this._misses = 0;
  }

  /**
   * Get a cached value. Returns undefined if missing or expired.
   * @param {string} key
   * @returns {any|undefined}
   */
  get(key) {
    const entry = this._store.get(key);
    if (!entry) {
      this._misses++;
      return undefined;
    }

    const ttl = entry.ttlMs ?? this.ttlMs;
    if (ttl && Date.now() - entry.createdAt > ttl) {
      this._store.delete(key);
      this._misses++;
      return undefined;
    }

    // Move to end = most recently used
    this._store.delete(key);
    this._store.set(key, entry);
    this._hits++;
    return entry.value;
  }

  /**
   * Set a value. Evicts oldest entry if at capacity.
   * @param {string} key
   * @param {any} value
   * @param {number} [ttlMs] - Per-entry TTL override
   */
  set(key, value, ttlMs) {
    if (this._store.has(key)) this._store.delete(key);
    if (this._store.size >= this.maxSize) {
      const oldestKey = this._store.keys().next().value;
      this._store.delete(oldestKey);
    }
    this._store.set(key, { value, createdAt: Date.now(), ttlMs });
  }

  /** Check if a key exists and hasn't expired */
  has(key) { return this.get(key) !== undefined; }

  /** Delete a specific key */
  delete(key) { this._store.delete(key); }

  /** Delete all keys matching a prefix */
  deleteByPrefix(prefix) {
    for (const key of this._store.keys()) {
      if (key.startsWith(prefix)) this._store.delete(key);
    }
  }

  /** Clear all entries */
  clear() { this._store.clear(); }

  /** Current entry count */
  get size() { return this._store.size; }

  /** Cache statistics */
  get stats() {
    const total = this._hits + this._misses;
    return {
      hits: this._hits,
      misses: this._misses,
      hitRate: total ? Math.round((this._hits / total) * 100) : 0,
      size: this._store.size,
    };
  }
}
