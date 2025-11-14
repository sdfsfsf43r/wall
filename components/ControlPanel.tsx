
import React, { useState } from 'react';
import { ProgressState, Language } from '../types';
import { COURSE_DETAILS, UDEMY_COURSE_URL } from '../constants';
import { SettingsModal } from './SettingsModal';
import { ProgressTracker } from './ProgressTracker';

interface ControlPanelProps {
  progress: ProgressState;
  onNextBackground: () => void;
  backgroundInterval: number;
  setBackgroundInterval: (interval: number) => void;
  onLanguageToggle: () => void;
  currentLanguage: Language;
  onImport: (jsonString: string) => void;
  onExport: () => void;
}

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 w-full max-w-5xl px-4">
        <div className="relative flex items-center justify-between gap-6 rounded-2xl border border-white/20 bg-black/30 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <img src={COURSE_DETAILS.thumbnail} alt="Course Thumbnail" className="h-20 w-32 rounded-lg object-cover" />
            <div>
              <h2 className="text-lg font-bold">{COURSE_DETAILS.title}</h2>
              <p className="text-sm text-white/70 hidden md:block">{COURSE_DETAILS.description}</p>
            </div>
          </div>
          <div className="flex-1 max-w-xs">
            <ProgressTracker progress={props.progress} />
          </div>
          <div className="flex items-center gap-2">
            <a href={UDEMY_COURSE_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-semibold">Open Course</a>
            <button onClick={props.onNextBackground} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-semibold">Next BG</button>
            <button onClick={props.onLanguageToggle} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-bold uppercase">{props.currentLanguage}</button>
            <button onClick={() => setIsSettingsOpen(true)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <SettingsIcon />
            </button>
          </div>
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        backgroundInterval={props.backgroundInterval}
        setBackgroundInterval={props.setBackgroundInterval}
        onImport={props.onImport}
        onExport={props.onExport}
      />
    </>
  );
};
