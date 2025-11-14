
import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundInterval: number;
  setBackgroundInterval: (interval: number) => void;
  onImport: (jsonString: string) => void;
  onExport: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  backgroundInterval,
  setBackgroundInterval,
  onImport,
  onExport,
}) => {
  const [intervalSeconds, setIntervalSeconds] = useState(backgroundInterval / 1000);
  const [importJson, setImportJson] = useState('');

  useEffect(() => {
    setIntervalSeconds(backgroundInterval / 1000);
  }, [backgroundInterval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setIntervalSeconds(value);
    setBackgroundInterval(value * 1000);
  };
  
  const handleImportClick = () => {
    if (importJson.trim()) {
        onImport(importJson);
        setImportJson('');
        onClose();
    } else {
        alert('Please paste your progress data into the text area.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-gray-800/80 p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="interval" className="block text-sm font-medium text-white/80 mb-2">
              Background Change Interval: {intervalSeconds} seconds
            </label>
            <input
              id="interval"
              type="range"
              min="5"
              max="180"
              step="5"
              value={intervalSeconds}
              onChange={handleIntervalChange}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Import / Export Progress</h3>
            <div className="flex gap-4">
              <button onClick={onExport} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-semibold">
                Export Progress
              </button>
            </div>
            <div className="mt-4">
                <textarea
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder='Paste your exported progress data here...'
                    className="w-full p-2 bg-gray-900/50 rounded-lg border border-white/20 text-sm h-24 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <button onClick={handleImportClick} className="w-full mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-semibold">
                    Import Progress
                </button>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};
