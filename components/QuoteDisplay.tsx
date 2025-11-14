import React from 'react';
import { Quote } from '../types';

interface QuoteDisplayProps {
  quote: Quote;
  onQuoteClick: () => void;
  isRtl: boolean;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, onQuoteClick, isRtl }) => {
  const directionClass = isRtl ? 'rtl' : 'ltr';
  const fontClass = isRtl ? 'font-cairo' : '';

  return (
    <div
      onClick={onQuoteClick}
      className="cursor-pointer text-center max-w-4xl px-4 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
      dir={directionClass}
      title="Click to open course and log progress"
    >
      <h1 className={`text-4xl md:text-5xl font-bold leading-tight tracking-wide ${fontClass}`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
        "{quote.text}"
      </h1>
      {quote.author && (
        <p className={`mt-4 text-xl text-white/80 ${fontClass}`} style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
          - {quote.author}
        </p>
      )}
    </div>
  );
};
