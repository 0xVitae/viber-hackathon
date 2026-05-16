export type QuestionType = 'choice' | 'slider';

export interface QuestionOption {
  id: string;
  label: string;
  penalty: number;
  tags?: string[];
}

export interface Question {
  id: string;
  category: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  sliderLabels?: [string, string];
  sliderPenalty?: (value: number) => number;
  sliderTags?: (value: number) => string[];
}

export interface Answer {
  questionId: string;
  value: string | number;
  penalty: number;
  tags: string[];
}

export interface EvaluationResult {
  score: number;
  tier: string;
  tierDescription: string;
  threatLevel: string;
  citizenStatus: string;
  concerns: string[];
  insights: string[];
  recommendations: string[];
  penalties: { label: string; amount: number }[];
}

export type AppPhase = 'landing' | 'quiz' | 'analysis' | 'results';
