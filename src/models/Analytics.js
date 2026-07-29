/**
 * Analytics — Domain model for user learning analytics.
 */
export class Analytics {
  constructor(data = {}) {
    this.totalSessions = data.totalSessions || 0;
    this.totalStudyMinutes = data.totalStudyMinutes || data.studyHours * 60 || 0;
    this.averageQuizScore = data.averageQuizScore || data.retentionScore || 0;
    this.flashcardsReviewed = data.flashcardsReviewed || 0;
    this.streakDays = data.streakDays || 0;
    this.longestStreak = data.longestStreak || this.streakDays;
    this.totalQuestions = data.totalQuestions || 0;
    this.studyDays = Array.isArray(data.studyDays) ? data.studyDays : [];
    this.topicBreakdown = Array.isArray(data.topicBreakdown) ? data.topicBreakdown : [];
  }

  get studyHours() { return Math.round(this.totalStudyMinutes / 60 * 10) / 10; }
  get hasData() { return this.totalSessions > 0; }
  get isOnStreak() { return this.streakDays > 0; }

  /** Performance grade based on quiz score */
  get performanceGrade() {
    if (this.averageQuizScore >= 90) return 'A';
    if (this.averageQuizScore >= 80) return 'B';
    if (this.averageQuizScore >= 70) return 'C';
    if (this.averageQuizScore >= 60) return 'D';
    return 'F';
  }

  static fromRaw(raw) { return new Analytics(raw); }
  static empty() { return new Analytics({}); }

  toJSON() {
    return {
      totalSessions: this.totalSessions,
      totalStudyMinutes: this.totalStudyMinutes,
      averageQuizScore: this.averageQuizScore,
      flashcardsReviewed: this.flashcardsReviewed,
      streakDays: this.streakDays,
      longestStreak: this.longestStreak,
      totalQuestions: this.totalQuestions,
    };
  }
}
