export function validateTopicInput(input) {
  if (!input || !input.trim()) {
    return 'Topic or notes input cannot be empty.';
  }
  if (input.trim().length < 3) {
    return 'Please enter at least 3 characters.';
  }
  return null;
}
