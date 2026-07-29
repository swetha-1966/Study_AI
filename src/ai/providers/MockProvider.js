import { AIProvider } from './AIProviderInterface';

/**
 * MockProvider — Offline/testing AI provider that never makes network calls.
 *
 * Used automatically when:
 * - No API key is configured
 * - All real providers fail
 * - VITE_USE_MOCK=true is set
 *
 * @extends AIProvider
 */
export class MockProvider extends AIProvider {
  /**
   * @param {object} [config]
   * @param {number} [config.delayMs=1200] - Simulated response delay
   */
  constructor(config = {}) {
    super('Mock', config);
    this.delayMs = config.delayMs ?? 1200;
  }

  /**
   * @inheritdoc
   */
  async generate(topic, options = {}) {
    await this._delay(options.signal);

    const cleanTopic = (topic || 'Study Topic').trim().slice(0, 50);
    const cardCount = parseInt(options.cardCount, 10) || 4;
    const quizCount = parseInt(options.quizCount, 10) || 3;

    return {
      summary: {
        overview: `${cleanTopic} is a fundamental engineering discipline focusing on structural mechanics, operational patterns, and performance trade-offs. Mastering ${cleanTopic} requires understanding how core architectural abstractions translate into practical implementations, system modularity, and resource optimization.`,
        keyTakeaways: [
          `Architectural Design & Mechanics: Understand how ${cleanTopic} organizes execution pathways and state boundaries.`,
          `Performance Metrics & Efficiency: Analyze throughput, latency, memory usage, and scalability parameters.`,
          `Real-World Engineering Application: Apply ${cleanTopic} principles to solve complex domain challenges and production workloads.`,
          `Trade-offs & Constraints: Balance complexity vs maintainability, performance vs resource consumption, and precision vs speed.`,
        ],
        mnemonics: [
          `F.A.C.T: Focus on Foundations, Analyze Tradeoffs, Code Implementations, Test Rigorously.`,
        ],
      },
      flashcards: Array.from({ length: cardCount }, (_, i) => ({
        id: i + 1,
        question: `Core Concept #${i + 1}: What is the ${['primary purpose', 'operational model', 'trade-off analysis', 'best practice', 'failure mode', 'optimization strategy'][i % 6]} of ${cleanTopic}?`,
        answer: `${cleanTopic} addresses ${['system efficiency and modularity', 'execution state management', 'resource utilization trade-offs', 'defensive programming patterns', 'graceful degradation', 'performance at scale'][i % 6]} by establishing clear architectural abstractions and boundaries.`,
      })),
      quiz: Array.from({ length: quizCount }, (_, i) => ({
        id: i + 1,
        question: `Scenario #${i + 1}: When evaluating ${cleanTopic} in a production environment, which principle is most critical?`,
        options: [
          `Balancing modular system design with resource efficiency and maintainability`,
          `Ignoring edge case constraints and performance bottlenecks`,
          `Relying exclusively on hardcoded static values`,
          `Bypassing error handling and input validation`,
        ],
        correctAnswer: 0,
        explanation: `Production engineering requires balancing modular design, system performance, and long-term maintainability.`,
      })),
    };
  }

  /**
   * @inheritdoc
   */
  async explain(question, answerOptions, userAnswer, correctAnswer) {
    await this._delay();
    return `The correct answer is option ${String.fromCharCode(65 + correctAnswer)}. ${
      userAnswer === correctAnswer
        ? 'You selected the right answer!'
        : `Option ${String.fromCharCode(65 + userAnswer)} is incorrect because it misrepresents the core principle.`
    } The key concept here is understanding the trade-offs and best practices involved.`;
  }

  /**
   * @inheritdoc
   */
  async isAvailable() {
    return true; // Mock is always available
  }

  /** @private */
  _delay(signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, this.delayMs);
      signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        const err = new Error('Request was canceled.');
        err.name = 'AbortError';
        reject(err);
      });
    });
  }
}
