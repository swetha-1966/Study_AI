export function formatNumber(num) {
  return new Intl.NumberFormat().format(num || 0);
}

export function formatPercentage(val) {
  return `${Math.round(val || 0)}%`;
}

export function truncateText(text, maxLength = 60) {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
