
import { useState, useCallback, useMemo } from 'react';
import { MULTILINGUAL_QUOTES } from '../constants';
import { Language, Quote, MultilingualQuote } from '../types';

const getRandomMultilingualQuote = (): MultilingualQuote => {
  return MULTILINGUAL_QUOTES[Math.floor(Math.random() * MULTILINGUAL_QUOTES.length)];
};

export function useQuotes() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeQuote, setActiveQuote] = useState<MultilingualQuote>(() => getRandomMultilingualQuote());

  const changeQuote = useCallback(() => {
    setActiveQuote(getRandomMultilingualQuote());
  }, []);
  
  const handleSetLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
  }, []);

  const quote: Quote = useMemo(() => activeQuote[language], [activeQuote, language]);

  const isRtl = useMemo(() => language === 'ar', [language]);

  return { quote, language, setLanguage: handleSetLanguage, changeQuote, isRtl };
}
