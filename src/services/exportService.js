/**
 * exportService.js — Unified export service for PDF, JSON, and Markdown.
 * Centralises all download logic in one place.
 */

import { logger } from '../lib/logger';

const MODULE = 'ExportService';

/**
 * Download a string as a file.
 * @param {string} content - File content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
function downloadFile(content, filename, mimeType) {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    logger.info(MODULE, `Downloaded: ${filename}`);
  } catch (err) {
    logger.error(MODULE, 'Download failed:', err.message);
  }
}

/**
 * Export session data as JSON.
 * @param {object} data - Study session data
 * @param {string} [filename] - Output filename
 */
export function exportToJSON(data, filename = 'study_session') {
  const content = JSON.stringify(data, null, 2);
  downloadFile(content, `${filename}.json`, 'application/json');
}

/**
 * Export session data as Markdown.
 * @param {object} data - Study session data (with summary, flashcards, quiz)
 * @param {string} [title] - Document title
 */
export function exportToMarkdown(data, title = 'Study Session') {
  const lines = [`# ${title}`, ''];

  if (data.summary?.overview) {
    lines.push('## Summary', '', data.summary.overview, '');
  }

  if (data.summary?.keyTakeaways?.length > 0) {
    lines.push('## Key Takeaways', '');
    data.summary.keyTakeaways.forEach((t) => lines.push(`- ${t}`));
    lines.push('');
  }

  if (data.flashcards?.length > 0) {
    lines.push('## Flashcards', '');
    data.flashcards.forEach((card, i) => {
      lines.push(`### Card ${i + 1}`, `**Q:** ${card.question}`, `**A:** ${card.answer}`, '');
    });
  }

  if (data.quiz?.length > 0) {
    lines.push('## Quiz Questions', '');
    data.quiz.forEach((q, i) => {
      lines.push(`### Question ${i + 1}`, `${q.question}`, '');
      q.options?.forEach((opt, idx) => {
        const marker = idx === q.correctAnswer ? '✅' : '  ';
        lines.push(`${marker} ${String.fromCharCode(65 + idx)}. ${opt}`);
      });
      if (q.explanation) lines.push('', `*${q.explanation}*`);
      lines.push('');
    });
  }

  downloadFile(lines.join('\n'), `${title.replace(/\s+/g, '_')}.md`, 'text/markdown');
}

/**
 * Export session as print-ready PDF (uses browser print dialog).
 * @param {object} data - Study session data
 * @param {string} [title] - Document title
 */
export function exportToPDF(data, title = 'Study Session') {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const flashcardsHTML = data.flashcards
    ?.map(
      (card, i) => `
      <div style="margin-bottom:16px; padding:12px; border:1px solid #e2e8f0; border-radius:8px;">
        <strong>Q${i + 1}:</strong> ${card.question}<br/>
        <strong>A:</strong> ${card.answer}
      </div>`
    )
    .join('') || '';

  const quizHTML = data.quiz
    ?.map(
      (q, i) => `
      <div style="margin-bottom:16px;">
        <strong>Q${i + 1}:</strong> ${q.question}<br/>
        ${q.options?.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}${idx === q.correctAnswer ? ' ✅' : ''}`).join('<br/>') || ''}
      </div>`
    )
    .join('') || '';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; color: #1a202c; }
        h1 { color: #4f46e5; } h2 { color: #374151; border-bottom: 1px solid #e2e8f0; padding-bottom:4px; }
        @media print { body { margin: 20px; } }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${data.summary?.overview ? `<h2>Summary</h2><p>${data.summary.overview}</p>` : ''}
      ${flashcardsHTML ? `<h2>Flashcards</h2>${flashcardsHTML}` : ''}
      ${quizHTML ? `<h2>Quiz</h2>${quizHTML}` : ''}
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}
