export function validateGeneratorInput(topic, contentTypes = {}) {
  const errors = {};

  if (!topic || !topic.trim()) {
    errors.topic = 'Topic or notes cannot be empty.';
  } else if (topic.trim().length < 3) {
    errors.topic = 'Topic must be at least 3 characters.';
  } else if (topic.trim().length > 150) {
    errors.topic = 'Topic cannot exceed 150 characters.';
  }

  const hasSelectedModule = Object.values(contentTypes).some(Boolean);
  if (!hasSelectedModule) {
    errors.contentTypes = 'At least one content module must be selected.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
