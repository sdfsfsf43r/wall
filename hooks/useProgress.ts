
import { useState, useEffect, useCallback } from 'react';
import { ProgressState } from '../types';

const PROGRESS_STORAGE_KEY = 'udemyWallpaperProgress';
const DEFAULT_GOAL = 365;

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic validation and backward compatibility for streak
        if (typeof parsed.daysDone === 'number' && typeof parsed.goal === 'number') {
            return { ...parsed, streak: parsed.streak || 0 };
        }
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    }
    return { daysDone: 0, goal: DEFAULT_GOAL, lastClickDate: null, streak: 0 };
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }, [progress]);

  const incrementProgress = useCallback(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (progress.lastClickDate !== todayStr) {
      setProgress(prev => {
        const isConsecutive = prev.lastClickDate === yesterdayStr;
        const newStreak = isConsecutive ? (prev.streak || 0) + 1 : 1;

        return ({
            ...prev,
            daysDone: Math.min(prev.daysDone + 1, prev.goal),
            lastClickDate: todayStr,
            streak: newStreak,
        });
      });
    } else {
        console.log("Progress already logged for today.");
    }
  }, [progress.lastClickDate, progress.goal, progress.streak]);

  const importProgress = useCallback((jsonString: string) => {
    try {
        const data = JSON.parse(jsonString);
        if (typeof data.daysDone === 'number' && typeof data.lastClickDate === 'string') {
            setProgress(prev => ({ ...prev, ...data, streak: data.streak || 0 }));
            alert('Progress imported successfully!');
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Failed to import progress:', error);
        alert('Failed to import progress. Please check the data format.');
    }
  }, []);

  const exportProgress = useCallback(() => {
    try {
        const { daysDone, lastClickDate, streak } = progress;
        const exportData = JSON.stringify({ daysDone, lastClickDate, streak }, null, 2);
        navigator.clipboard.writeText(exportData);
        alert('Progress data copied to clipboard!');
    } catch (error) {
        console.error('Failed to copy progress to clipboard:', error);
        alert('Failed to copy progress data.');
    }
  }, [progress]);
  
  return { progress, incrementProgress, importProgress, exportProgress };
}