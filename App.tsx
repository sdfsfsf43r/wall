
import React, { useState, useEffect, useCallback } from 'react';
import { Background } from './components/Background';
import { Clock } from './components/Clock';
import { ControlPanel } from './components/ControlPanel';
import { QuoteDisplay } from './components/QuoteDisplay';
import { useProgress } from './hooks/useProgress';
import { useQuotes } from './hooks/useQuotes';
import { Language } from './types';
import { UDEMY_COURSE_URL } from './constants';

function App() {
  const { progress, incrementProgress, importProgress, exportProgress } = useProgress();
  const [backgroundInterval, setBackgroundInterval] = useState(30000); // 30 seconds
  const [backgroundKey, setBackgroundKey] = useState(Date.now());
  const { quote, language, changeQuote, setLanguage, isRtl } = useQuotes();

  const handleNextBackground = useCallback(() => {
    setBackgroundKey(Date.now());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextBackground();
    }, backgroundInterval);

    return () => clearInterval(intervalId);
  }, [backgroundInterval, handleNextBackground]);

  const handleQuoteClick = useCallback(() => {
    window.open(UDEMY_COURSE_URL, '_blank');
    incrementProgress();
    changeQuote();
  }, [incrementProgress, changeQuote]);

  const handleLanguageToggle = () => {
    const newLang: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };
  
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <Background key={backgroundKey} />
      
      <div className="absolute inset-0 bg-black/40" />

      <main className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8">
        <Clock />
        
        <div className="flex-grow flex items-center justify-center">
            <QuoteDisplay quote={quote} onQuoteClick={handleQuoteClick} isRtl={isRtl} />
        </div>

        <ControlPanel
          progress={progress}
          onNextBackground={handleNextBackground}
          backgroundInterval={backgroundInterval}
          setBackgroundInterval={setBackgroundInterval}
          onLanguageToggle={handleLanguageToggle}
          currentLanguage={language}
          onImport={importProgress}
          onExport={exportProgress}
        />
      </main>
    </div>
  );
}

export default App;
