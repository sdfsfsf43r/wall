
export interface ProgressState {
  daysDone: number;
  goal: number;
  lastClickDate: string | null;
  streak: number;
}

export type Language = 'en' | 'ar';

export interface Quote {
    text: string;
    author?: string;
}

export interface MultilingualQuote {
  en: Quote;
  ar: Quote;
}
