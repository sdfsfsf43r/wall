import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface DailyChecklistProps {
  onCheck: () => void;
  lastClickDate: string | null;
  language: Language;
}

const calculateTimeRemaining = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const DailyChecklist: React.FC<DailyChecklistProps> = ({ onCheck, lastClickDate, language }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  
  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedToday = lastClickDate === todayStr;

  useEffect(() => {
    if (isCheckedToday) {
      const timerId = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isCheckedToday]);

  const labels = {
    en: {
      checkbox: "I've completed my studies for today",
      timer: "Next check-in available in:",
    },
    ar: {
      checkbox: "لقد أكملت دراستي لهذا اليوم",
      timer: "التسجيل التالي متاح في:",
    },
  };

  const handleCheck = () => {
    if (!isCheckedToday) {
      onCheck();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 text-white/90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
      <label className="flex items-center gap-3 cursor-pointer text-lg">
        <input
          type="checkbox"
          checked={isCheckedToday}
          onChange={handleCheck}
          disabled={isCheckedToday}
          className="sr-only peer"
        />
        <div className="relative w-6 h-6 bg-white/20 rounded-md border-2 border-transparent peer-checked:bg-purple-600 peer-checked:border-purple-400 peer-disabled:cursor-not-allowed transition-all">
          <svg className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white transition-opacity ${isCheckedToday ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span>{labels[language].checkbox}</span>
      </label>
      
      {isCheckedToday && (
        <div className="text-sm text-white/70">
          <span>{labels[language].timer} </span>
          <span className="font-mono font-semibold">{timeRemaining}</span>
        </div>
      )}
    </div>
  );
};
