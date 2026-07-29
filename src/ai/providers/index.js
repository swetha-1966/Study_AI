import { GeminiProvider } from './GeminiProvider';
import { MockProvider } from './MockProvider';
import { logger } from '../../lib/logger';

const MODULE = 'AIProviderFactory';

/**
 * AIProviderFactory — Creates and manages the active AI provider.
 *
 * Provider selection order:
 * 1. Backend server (POST /api/study) — always tried first
 * 2. GeminiProvider (direct API) — if API key is set
 * 3. MockProvider — always-available fallback
 *
 * SWITCHING PROVIDERS:
 * To switch from Gemini to OpenAI, add an OpenAIProvider and update getProvider().
 */

let _activeProvider = null;

/**
 * Get the active AI provider (lazy-initialized singleton).
 * @returns {import('./AIProviderInterface').AIProvider}
 */
export function getProvider() {
  if (_activeProvider) return _activeProvider;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';

  if (useMock) {
    logger.info(MODULE, 'Using MockProvider (VITE_USE_MOCK=true)');
    _activeProvider = new MockProvider();
    return _activeProvider;
  }

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    logger.info(MODULE, 'Using GeminiProvider');
    _activeProvider = new GeminiProvider(apiKey);
    return _activeProvider;
  }

  logger.warn(MODULE, 'No API key found — using MockProvider fallback');
  _activeProvider = new MockProvider();
  return _activeProvider;
}

/**
 * Override the active provider (useful for testing).
 * @param {import('./AIProviderInterface').AIProvider} provider
 */
export function setProvider(provider) {
  _activeProvider = provider;
  logger.info(MODULE, `Provider overridden to: ${provider.name}`);
}

/**
 * Reset to auto-detect mode (re-reads env variables).
 */
export function resetProvider() {
  _activeProvider = null;
}

export { GeminiProvider, MockProvider };
export { AIProvider } from './AIProviderInterface';
