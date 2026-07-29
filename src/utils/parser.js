/**
 * Robust JSON Parser for AI Backend Responses.
 *
 * Handles:
 * - Markdown code fences (e.g., ```json ... ``` or ``` ... ```)
 * - Leading/trailing conversational text or whitespace
 * - Empty or non-string inputs
 * - Invalid JSON formatting
 *
 * Guarantee: Never crashes unexpectedly; always returns parsed object or throws descriptive Error.
 */

/**
 * Parses raw text input from AI responses and extracts structured JSON.
 *
 * @param {string|object} rawResponse - The raw output string or pre-parsed object from backend.
 * @returns {object} The parsed JSON object containing study materials.
 * @throws {Error} Descriptive error message if JSON parsing fails.
 */
export function parseStudyJSON(rawResponse) {
  // If response is already an object (e.g., Axios parsed response body)
  if (rawResponse && typeof rawResponse === 'object') {
    return rawResponse;
  }

  if (!rawResponse || typeof rawResponse !== 'string' || !rawResponse.trim()) {
    throw new Error('Received empty or invalid response from AI service.');
  }

  let cleaned = rawResponse.trim();

  // 1. Handle markdown code fences (```json ... ``` or ``` ...)
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const codeBlockMatch = cleaned.match(codeBlockRegex);

  if (codeBlockMatch && codeBlockMatch[1]) {
    cleaned = codeBlockMatch[1].trim();
  }

  // 2. Handle unexpected text before/after JSON object or array
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // 3. Attempt JSON parse
  try {
    const parsed = JSON.parse(cleaned);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Parsed response is not a valid JSON object.');
    }
    return parsed;
  } catch (err) {
    console.error('JSON Parsing Error:', err.message, 'Raw content:', rawResponse);
    throw new Error('Failed to parse AI response as JSON. Output was malformed.');
  }
}
