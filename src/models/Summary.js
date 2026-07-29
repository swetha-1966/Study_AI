/**
 * Summary — Domain model for AI-generated topic summaries.
 */
export class Summary {
  constructor(data = {}) {
    this.overview = String(data.overview || '').trim();
    this.keyTakeaways = Array.isArray(data.keyTakeaways)
      ? data.keyTakeaways.filter(Boolean).map(String)
      : [];
    this.mnemonics = Array.isArray(data.mnemonics)
      ? data.mnemonics.filter(Boolean).map(String)
      : [];
  }

  get hasContent() { return Boolean(this.overview); }
  get primaryMnemonic() { return this.mnemonics[0] || null; }
  get takeawayCount() { return this.keyTakeaways.length; }

  /** Truncated preview for cards / history items */
  get preview() {
    return this.overview.length > 150
      ? `${this.overview.slice(0, 147)}...`
      : this.overview;
  }

  static fromRaw(raw) { return new Summary(raw); }

  toJSON() {
    return {
      overview: this.overview,
      keyTakeaways: this.keyTakeaways,
      mnemonics: this.mnemonics,
    };
  }
}
