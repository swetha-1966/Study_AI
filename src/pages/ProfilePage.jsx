import React from 'react';
import { ProfileHeader } from '../features/profile/components/ProfileHeader';
import { StatisticsCard } from '../features/profile/components/StatisticsCard';
import { AchievementsGrid } from '../features/profile/components/AchievementsGrid';
import { GoalSummary } from '../features/profile/components/GoalSummary';
import { LearningPreferencesCard } from '../features/profile/components/LearningPreferencesCard';

export function ProfilePage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans">
      <ProfileHeader />
      <StatisticsCard />
      <GoalSummary />
      <LearningPreferencesCard />
      <AchievementsGrid />
    </div>
  );
}
