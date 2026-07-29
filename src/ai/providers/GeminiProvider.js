import axios from 'axios';
import { AIProvider } from './AIProviderInterface';
import { AIProviderError, AIParseError } from '../../core/errors/AIError';
import { buildStudyPrompt, buildExplanationPrompt } from '../prompts/study.prompt';
import { repairAndValidate } from '../schemas/studySchema';

/**
 * GeminiProvider — Google Gemini AI implementation of AIProvider.
 *
 * Supports model cascade fallback:
 *   gemini-2.5-flash → gemini-2.0-flash → gemini-1.5-flash
 *
 * @extends AIProvider
 */
export class GeminiProvider extends AIProvider {
  static MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
  ];

  static BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

  /**
   * @param {string} apiKey - Google Gemini API key
   * @param {object} [config]
   * @param {number} [config.timeout=25000] - Request timeout (ms)
   * @param {number} [config.temperature=0.7] - Generation temperature
   */
  constructor(apiKey, config = {}) {
    super('Gemini', config);
    this.apiKey = apiKey;
    this.timeout = config.timeout ?? 25000;
    this.temperature = config.temperature ?? 0.7;
  }

  /**
   * @inheritdoc
   */
  async generate(topic, options = {}) {
    const prompt = buildStudyPrompt(topic, options);
    const signal = options.signal;

    let lastError = null;

    for (const model of GeminiProvider.MODELS) {
      try {
        const text = await this._callModel(model, prompt, signal);
        if (text) {
          return repairAndValidate(text);
        }
      } catch (err) {
        if (err.name === 'AbortError' || err.name === 'CanceledError') throw err;
        lastError = err;
        console.warn(`[GeminiProvider] Model ${model} failed:`, err.message);
      }
    }

    throw new AIProviderError(
      lastError?.message || 'All Gemini models failed',
      { attemptedModels: GeminiProvider.MODELS }
    );
  }

  /**
   * @inheritdoc
   */
  async explain(question, answerOptions, userAnswer, correctAnswer) {
    const prompt = buildExplanationPrompt(question, answerOptions, userAnswer, correctAnswer);

    for (const model of GeminiProvider.MODELS) {
      try {
        const text = await this._callModel(model, prompt, null);
        if (text) return text.trim();
      } catch {
        // try next model
      }
    }
    return 'Explanation unavailable.';
  }

  /**
   * @inheritdoc
   */
  async isAvailable() {
    return Boolean(this.apiKey && this.apiKey !== 'YOUR_GEMINI_API_KEY_HERE');
  }

  /**
   * Internal: call a single Gemini model.
   * @private
   */
  async _callModel(model, prompt, signal) {
    const url = `${GeminiProvider.BASE_URL}/${model}:generateContent?key=${this.apiKey}`;
    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: this.temperature,
          responseMimeType: 'application/json',
        },
      },
      { signal, timeout: this.timeout }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || null;
  }
}
