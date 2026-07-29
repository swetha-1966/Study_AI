import React, { useState } from 'react';
import { AnalyticsHeader } from '../features/analytics/components/AnalyticsHeader';
import { OverviewCards } from '../features/analytics/components/OverviewCards';
import { StudyTimeChart } from '../features/analytics/components/StudyTimeChart';
import { QuizPerformanceChart } from '../features/analytics/components/QuizPerformanceChart';
import { TopicBreakdown } from '../features/analytics/components/TopicBreakdown';
import { LearningStreak } from '../features/analytics/components/LearningStreak';
import { GoalTracker } from '../features/analytics/components/GoalTracker';
import { AIRecommendations } from '../features/analytics/components/AIRecommendations';
import { AchievementGrid } from '../features/analytics/components/AchievementGrid';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      <AnalyticsHeader timeRange={timeRange} onChangeTimeRange={setTimeRange} />
      <OverviewCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudyTimeChart />
        <QuizPerformanceChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LearningStreak />
        <GoalTracker />
      </div>

      <TopicBreakdown />
      <AIRecommendations />
      <AchievementGrid />
    </div>
  );
}
