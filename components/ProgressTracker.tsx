import React from 'react';
import { ProgressState } from '../types';

interface ProgressTrackerProps {
  progress: ProgressState;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const percentage = progress.goal > 0 ? (progress.daysDone / progress.goal) * 100 : 0;
  const displayPercentage = percentage.toFixed(1);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-sm font-medium text-white/80 mb-1">
        <span>Daily Progress</span>
        <div className="flex items-center gap-3">
          {progress.streak > 0 && (
            <span
              className="streak-pulse flex items-center gap-1 text-lg font-bold text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.7)]"
              title={`${progress.streak} Day Streak`}
            >
              <span>{progress.streak}</span>
              <span>🔥</span>
            </span>
          )}
          <span>Day {progress.daysDone} / {progress.goal}</span>
        </div>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right text-xs mt-1 font-semibold text-white/90">{displayPercentage}% Complete</div>
    </div>
  );
};