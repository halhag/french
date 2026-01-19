import { Sentence, QuizQuestion, Word, WordQuestion, QuizQuestionType } from '../types/quiz';
import { shuffle } from './shuffle';

/**
 * Selects a random sentence that hasn't been used yet
 */
export function getRandomQuestion(
  sentences: Sentence[],
  usedIds: Set<number>
): Sentence | null {
  const availableSentences = sentences.filter(s => !usedIds.has(s.id));

  if (availableSentences.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableSentences.length);
  return availableSentences[randomIndex];
}

/**
 * Creates a quiz question with randomized answer order
 */
export function createQuizQuestion(sentence: Sentence): QuizQuestion {
  const allAnswers = [
    sentence.correctEnglish,
    ...sentence.incorrectOptions
  ];

  const shuffledAnswers = shuffle(allAnswers);

  return {
    sentence,
    answers: shuffledAnswers,
    correctAnswer: sentence.correctEnglish
  };
}

/**
 * Selects a random word that hasn't been used yet
 */
export function getRandomWord(
  words: Word[],
  usedIds: Set<number>
): Word | null {
  const availableWords = words.filter(w => !usedIds.has(w.id));

  if (availableWords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

/**
 * Creates a word quiz question with randomized answer order
 */
export function createWordQuestion(word: Word): WordQuestion {
  const allAnswers = [
    word.correctEnglish,
    ...word.incorrectOptions
  ];

  const shuffledAnswers = shuffle(allAnswers);

  return {
    word,
    answers: shuffledAnswers,
    correctAnswer: word.correctEnglish
  };
}

/**
 * Type guard to check if a question is a QuizQuestion (sentence)
 */
export function isQuizQuestion(question: QuizQuestionType): question is QuizQuestion {
  return 'sentence' in question;
}

/**
 * Type guard to check if a question is a WordQuestion
 */
export function isWordQuestion(question: QuizQuestionType): question is WordQuestion {
  return 'word' in question;
}
