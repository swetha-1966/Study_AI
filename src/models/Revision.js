/**
 * Revision — Domain model for exam revision sheet data.
 */
export class Revision {
  constructor(data = {}) {
    this.topic = String(data.topic || '');
    this.keyFacts = Array.isArray(data.keyFacts) ? data.keyFacts.filter(Boolean) : [];
    this.commonMistakes = Array.isArray(data.commonMistakes) ? data.commonMistakes.filter(Boolean) : [];
    this.examTips = Array.isArray(data.examTips) ? data.examTips.filter(Boolean) : [];
    this.quickFormulas = Array.isArray(data.quickFormulas) ? data.quickFormulas.filter(Boolean) : [];
    this.mnemonic = data.mnemonic || null;
    this.oneLineSummary = data.oneLineSummary || '';
    this.checklist = Array.isArray(data.checklist)
      ? data.checklist
      : this.keyFacts.map((fact, i) => ({ id: `fact_${i}`, label: fact, checked: false }));
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  get hasContent() { return this.keyFacts.length > 0; }
  get checklistProgress() {
    if (!this.checklist.length) return 0;
    return Math.round((this.checklist.filter((c) => c.checked).length / this.checklist.length) * 100);
  }

  /**
   * Toggle a checklist item.
   * @param {string} itemId
   * @returns {Revision}
   */
  toggleChecklistItem(itemId) {
    return new Revision({
      ...this.toJSON(),
      checklist: this.checklist.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    });
  }

  static fromRaw(raw) { return new Revision(raw); }

  toJSON() {
    return {
      topic: this.topic,
      keyFacts: this.keyFacts,
      commonMistakes: this.commonMistakes,
      examTips: this.examTips,
      quickFormulas: this.quickFormulas,
      mnemonic: this.mnemonic,
      oneLineSummary: this.oneLineSummary,
      checklist: this.checklist,
      createdAt: this.createdAt,
    };
  }
}
