export interface Sentence {
  id: number;
  french: string;
  correctEnglish: string;
  incorrectOptions: [string, string];
  incorrectOptionsFrench: [string, string];
  level: 'A1' | 'A2';
}

export interface QuizQuestion {
  sentence: Sentence;
  answers: string[];
  correctAnswer: string;
}

// Word-specific types
export interface Word {
  id: number;
  french: string;
  correctEnglish: string;
  incorrectOptions: [string, string];
  incorrectOptionsFrench: [string, string];
  level: 'A1' | 'A2';
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'preposition' | 'conjunction';
  gender?: 'masculine' | 'feminine';
}

export interface WordQuestion {
  word: Word;
  answers: string[];
  correctAnswer: string;
}

// Mode type
export type QuizMode = 'sentences' | 'words' | 'reading' | 'match' | 'conjugation' | 'timewords';

// Reading mode state
export interface ReadingState {
  frenchText: string;
  englishTranslation: string;
  pubDate: string;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
}

// Union types for polymorphism
export type QuizQuestionType = QuizQuestion | WordQuestion;

export interface GameState {
  mode: QuizMode;
  round: number;
  score: number;
  currentQuestion: QuizQuestionType | null;
  selectedAnswer: string | null;
  hasAnswered: boolean;
  isGameComplete: boolean;
}
