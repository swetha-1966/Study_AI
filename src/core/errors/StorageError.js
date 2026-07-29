import { AppError } from './AppError';

/**
 * StorageError — thrown when localStorage read/write operations fail.
 * Common causes: storage quota exceeded, private browsing restrictions, corrupted data.
 */
export class StorageError extends AppError {
  /**
   * @param {string} message
   * @param {string} [operation] - 'get' | 'set' | 'remove' | 'clear'
   * @param {object} [context]
   */
  constructor(message, operation = 'unknown', context = {}) {
    super(message, 'STORAGE_ERROR', { operation, ...context });
    this.operation = operation;
    this.isStorageError = true;
  }

  get userMessage() {
    if (this.message.toLowerCase().includes('quota')) {
      return 'Storage is full — please clear some study sessions to continue.';
    }
    return 'Could not save your data. Please check browser storage permissions.';
  }
}
