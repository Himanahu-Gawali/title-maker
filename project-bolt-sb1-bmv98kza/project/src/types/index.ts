export interface TitleSuggestion {
  id: string;
  title: string;
  confidence: number;
  emotion: 'shock' | 'excitement' | 'emotional' | 'curiosity' | 'urgency';
}

export interface GeneratorState {
  loading: boolean;
  results: TitleSuggestion[];
  error: string | null;
}