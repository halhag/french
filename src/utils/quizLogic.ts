import { Sentence, QuizQuestion } from '../types/quiz';
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
