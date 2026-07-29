/**
 * Utility functions for exporting study materials.
 */

/**
 * Downloads active study material as a formatted JSON file.
 */
export function exportToJSON(data, topic = 'study_session') {
  if (!data) return;
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  const filename = `${topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_study_deck.json`;

  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Triggers browser print view for study material as PDF.
 */
export function exportToPDF(data, topic = 'Study Material') {
  if (!data) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const flashcardsHtml = (data.flashcards || []).map((card, i) => `
    <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px;">
      <h4 style="margin: 0 0 6px 0; color: #1e293b;">Card ${i + 1}: ${escapeHtml(card.question)}</h4>
      <p style="margin: 0; color: #475569;"><strong>Answer:</strong> ${escapeHtml(card.answer)}</p>
    </div>
  `).join('');

  const quizHtml = (data.quiz || []).map((q, i) => `
    <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px;">
      <h4 style="margin: 0 0 8px 0; color: #1e293b;">Q${i + 1}: ${escapeHtml(q.question)}</h4>
      <ul style="margin: 0 0 8px 0; padding-left: 20px;">
        ${(q.options || []).map((opt, idx) => `
          <li style="color: ${idx === q.correctAnswer ? '#16a34a' : '#475569'}; font-weight: ${idx === q.correctAnswer ? 'bold' : 'normal'};">
            ${escapeHtml(opt)} ${idx === q.correctAnswer ? '✓ (Correct)' : ''}
          </li>
        `).join('')}
      </ul>
      <p style="margin: 0; font-size: 13px; color: #64748b;"><em>Explanation: ${escapeHtml(q.explanation)}</em></p>
    </div>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${escapeHtml(topic)} - Study Deck</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; max-width: 800px; margin: 0 auto; }
          h1 { color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
          h2 { margin-top: 24px; color: #475569; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(topic)}</h1>
        <p style="color: #64748b;">Generated via Study Assistant AI</p>

        ${data.summary ? `
          <h2>Overview</h2>
          <p>${escapeHtml(data.summary.overview)}</p>
        ` : ''}

        <h2>Flashcards (${(data.flashcards || []).length})</h2>
        ${flashcardsHtml}

        <h2>Multiple-Choice Quiz (${(data.quiz || []).length})</h2>
        ${quizHtml}
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
