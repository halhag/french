export interface Sentence {
  id: number;
  french: string;
  correctEnglish: string;
  incorrectOptions: [string, string];
  level: 'A1' | 'A2';
}

export interface QuizQuestion {
  sentence: Sentence;
  answers: string[];
  correctAnswer: string;
}

export interface GameState {
  round: number;
  score: number;
  currentQuestion: QuizQuestion | null;
  selectedAnswer: string | null;
  hasAnswered: boolean;
  isGameComplete: boolean;
}
