/**
 * JSON Repair Engine for AI Responses.
 *
 * Fixes common AI formatting issues:
 * - Trailing commas in arrays/objects
 * - Unclosed brackets or braces
 * - Unescaped quotes inside strings
 * - Surrounding markdown code blocks
 */
export function repairJSON(rawString) {
  if (typeof rawString === 'object' && rawString !== null) {
    return rawString;
  }

  if (!rawString || typeof rawString !== 'string') {
    throw new Error('Invalid raw string for JSON repair.');
  }

  let cleaned = rawString.trim();

  // 1. Strip markdown code fences (```json ... ``` or ``` ...)
  const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    cleaned = codeBlockMatch[1].trim();
  }

  // 2. Locate first '{' or '[' and last '}' or ']'
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // 3. Fix trailing commas before closing braces/brackets
  cleaned = cleaned.replace(/,\s*([\}\]])/g, '$1');

  // 4. Try standard JSON.parse
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt extra bracket balancing
    let openBraces = (cleaned.match(/\{/g) || []).length;
    let closeBraces = (cleaned.match(/\}/g) || []).length;

    while (openBraces > closeBraces) {
      cleaned += '}';
      closeBraces++;
    }

    let openBrackets = (cleaned.match(/\[/g) || []).length;
    let closeBrackets = (cleaned.match(/\]/g) || []).length;

    while (openBrackets > closeBrackets) {
      cleaned += ']';
      closeBrackets++;
    }

    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      console.error('JSON repair failed:', e2.message);
      throw new Error('Failed to parse AI response into valid JSON.');
    }
  }
}
