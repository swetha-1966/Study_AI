import axios from 'axios';

/**
 * AI Service for Study Assistant.
 *
 * Handles HTTP requests to backend server or direct Google Gemini REST API.
 */

let RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/study';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

if (RAW_BASE_URL.endsWith('/api/study') || RAW_BASE_URL.endsWith('/api/study/')) {
  RAW_BASE_URL = RAW_BASE_URL.replace(/\/api\/study\/?$/, '');
}

const apiClient = axios.create({
  baseURL: RAW_BASE_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000,
});

/**
 * Main entrypoint for study material generation.
 *
 * @param {string} notes - User entered study notes or topic.
 * @param {object} [options] - Customization options { difficulty, cardCount, quizCount }
 * @param {AbortSignal} [signal] - Optional AbortSignal for request cancellation.
 * @returns {Promise<object|string>} Raw response data or JSON string to be parsed.
 */
export async function generateStudyMaterial(notes, options = {}, signal) {
  if (!notes || !notes.trim()) {
    throw new Error('Please enter some study notes or a topic before generating.');
  }

  // 1. Force Mock Mode if configured
  if (USE_MOCK) {
    return simulateMockResponse(notes, options, signal);
  }

  // 2. Try Backend Server First
  try {
    const response = await apiClient.post('/api/study', { notes: notes.trim(), ...options }, { signal });
    return response.data;
  } catch (backendError) {
    if (axios.isCancel(backendError) || backendError.name === 'CanceledError' || backendError.name === 'AbortError') {
      const abortError = new Error('Request was canceled.');
      abortError.name = 'AbortError';
      throw abortError;
    }

    console.warn('Backend endpoint POST failed:', backendError.message, 'Trying direct Gemini API fallback...');
  }

  // 3. Direct Gemini API call if API Key is available
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
    try {
      return await fetchFromGeminiAPI(notes, options, signal);
    } catch (geminiError) {
      if (axios.isCancel(geminiError) || geminiError.name === 'AbortError') {
        const abortErr = new Error('Request was canceled.');
        abortErr.name = 'AbortError';
        throw abortErr;
      }
      console.warn('Gemini API direct call failed:', geminiError.message, 'Falling back to mock generator.');
    }
  }

  // 4. Dynamic Client-Side Mock Generator Fallback
  return simulateMockResponse(notes, options, signal);
}

/**
 * Direct call to Google Gemini REST API with model fallback.
 */
async function fetchFromGeminiAPI(notes, options = {}, signal) {
  const difficulty = options.difficulty || 'Intermediate';
  const cardCount = options.cardCount || 4;
  const quizCount = options.quizCount || 3;

  const prompt = `You are a senior software architect and university professor.
Analyze the following study topic or notes and generate in-depth, comprehensive study materials tailored to ${difficulty} level.

Target Study Notes/Topic:
"""
${notes.trim()}
"""

Return ONLY a valid JSON object matching this exact schema:
{
  "summary": {
    "overview": "Thorough 3-4 sentence academic overview explaining core mechanisms and architectural principles...",
    "keyTakeaways": [
      "Detailed takeaway 1...",
      "Detailed takeaway 2...",
      "Detailed takeaway 3...",
      "Detailed takeaway 4..."
    ],
    "mnemonics": [
      "Clever acronym or memory model explaining how to recall key concepts..."
    ]
  },
  "flashcards": [
    {
      "id": 1,
      "question": "Deep, concept-focused question...",
      "answer": "Thorough, multi-sentence answer providing deep explanation and context..."
    }
  ],
  "quiz": [
    {
      "id": 1,
      "question": "Realistic scenario-based quiz question...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Comprehensive explanation detailing why the correct option is right..."
    }
  ]
}

Requirements:
- Target level: ${difficulty}.
- Generate exactly ${cardCount} comprehensive flashcards with detailed answers.
- Generate exactly ${quizCount} scenario-based multiple-choice quiz questions with 4 options each.
- \`correctAnswer\` MUST be 0-based index (0, 1, 2, 3).
- Output ONLY valid JSON matching schema above without markdown or extra text.`;

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-pro'];

  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await axios.post(
        url,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          }
        },
        { signal, timeout: 25000 }
      );

      const candidate = response.data?.candidates?.[0];
      const textOutput = candidate?.content?.parts?.[0]?.text;

      if (textOutput) {
        return textOutput;
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'AbortError') {
        throw err;
      }
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini AI model endpoints returned empty output.');
}

/**
 * Dynamic Mock Generator Fallback
 */
function simulateMockResponse(notes, options = {}, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        const abortErr = new Error('Request was canceled.');
        abortErr.name = 'AbortError';
        return reject(abortErr);
      }

      const cleanTopic = notes.trim().slice(0, 45) || 'Study Topic';
      const mockData = {
        summary: {
          overview: `${cleanTopic} is a fundamental engineering discipline focusing on structural mechanics, operational patterns, and performance trade-offs. Mastering ${cleanTopic} requires understanding how core architectural abstractions translate into practical implementations, system modularity, and resource optimization.`,
          keyTakeaways: [
            `Architectural Design & Mechanics: Understand how ${cleanTopic} organizes execution pathways and state boundaries.`,
            `Performance Metrics & Efficiency: Analyze throughput, latency, memory usage, and throughput scalability parameters.`,
            `Real-World Engineering Application: Apply ${cleanTopic} principles to solve complex domain challenges and production workloads.`,
            `Trade-offs & Constraints: Balance complexity vs maintainability, performance vs resource consumption, and precision vs speed.`
          ],
          mnemonics: [
            `F.A.C.T: Focus on Foundations, Analyze Tradeoffs, Code Implementations, Test Rigorously.`
          ]
        },
        flashcards: [
          {
            id: 1,
            question: `Core Concept: What is ${cleanTopic} and what core problem does it solve?`,
            answer: `${cleanTopic} provides a structured framework for managing data, execution, and logic flow. It resolves inefficiency and lack of modularity by establishing clean architectural abstractions.`
          },
          {
            id: 2,
            question: `Operational Principles: How does ${cleanTopic} execute in practice?`,
            answer: `It operates by partitioning complex operations into distinct lifecycle steps, ensuring predictable state transitions, error isolation, and operational reliability.`
          },
          {
            id: 3,
            question: `Trade-off Analysis: What are key performance considerations in ${cleanTopic}?`,
            answer: `Engineering trade-offs typically balance computational overhead vs memory usage, implementation complexity vs long-term maintainability, and responsiveness vs throughput.`
          },
          {
            id: 4,
            question: `Best Practices: What are industry standard approaches for implementing ${cleanTopic}?`,
            answer: `Best practices advocate for modular component boundaries, strict validation, comprehensive error logging, active monitoring, and defensive programming.`
          }
        ],
        quiz: [
          {
            id: 1,
            question: `What is the primary architectural goal when designing systems based on ${cleanTopic}?`,
            options: [
              `Maximizing system modularity, maintainability, and resource efficiency`,
              `Increasing code line length without modular abstraction`,
              `Bypassing error handling and input validation`,
              `Relying on hardcoded static data structures`
            ],
            correctAnswer: 0,
            explanation: `Production-ready engineering prioritizes modular design, resource efficiency, and long-term code maintainability.`
          },
          {
            id: 2,
            question: `Which approach provides the most effective feedback loop for mastering ${cleanTopic}?`,
            options: [
              `Active recall through flashcards and scenario-based testing`,
              `Passive reading without testing or practical implementation`,
              `Skimming headlines while ignoring core mechanics`,
              `Memorizing terms without understanding structural relationships`
            ],
            correctAnswer: 0,
            explanation: "Active recall combined with immediate scenario testing yields maximum memory retention and deep practical comprehension."
          },
          {
            id: 3,
            question: `When evaluating tradeoffs in ${cleanTopic}, which factor is critical for long-term scalability?`,
            options: [
              `Balancing computational speed, memory usage, and software maintainability`,
              `Ignoring system constraints and hardware boundaries`,
              `Selecting the option with the highest initial setup complexity`,
              `Eliminating documentation and architectural records`
            ],
            correctAnswer: 0,
            explanation: "Scalable architecture carefully balances performance, system resource constraints, and developer maintainability."
          }
        ]
      };

      resolve(mockData);
    }, 1200);

    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        const abortErr = new Error('Request was canceled.');
        abortErr.name = 'AbortError';
        reject(abortErr);
      });
    }
  });
}
