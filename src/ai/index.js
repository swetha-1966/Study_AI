// AI Layer — Public API
export { getProvider, setProvider, resetProvider } from './providers/index';
export { GeminiProvider } from './providers/GeminiProvider';
export { MockProvider } from './providers/MockProvider';
export { AIProvider } from './providers/AIProviderInterface';

export { buildStudyPrompt, buildExplanationPrompt, PROMPT_VERSION } from './prompts/study.prompt';
export { buildQuizPrompt, buildRetestPrompt } from './prompts/quiz.prompt';
export { buildFlashcardPrompt } from './prompts/flashcards.prompt';
export { buildRevisionPrompt } from './prompts/revision.prompt';

export { repairAndValidate, parseResponse, validateSchema, normalize } from './schemas/studySchema';
