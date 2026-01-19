import { useState, useEffect } from 'react';
import { GameState, QuizMode } from '../types/quiz';
import { sentences } from '../data/sentences';
import { words } from '../data/words';
import {
  getRandomQuestion,
  createQuizQuestion,
  getRandomWord,
  createWordQuestion,
  isQuizQuestion
} from '../utils/quizLogic';
import { ScoreDisplay } from './ScoreDisplay';
import { QuestionCard } from './QuestionCard';

interface QuizProps {
  mode: QuizMode;
  onBackToMenu: () => void;
}

export function Quiz({ mode, onBackToMenu }: QuizProps) {
  const [gameState, setGameState] = useState<GameState>({
    mode,
    round: 1,
    score: 0,
    currentQuestion: null,
    selectedAnswer: null,
    hasAnswered: false,
    isGameComplete: false
  });

  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());

  // Load first question on mount and after restart
  useEffect(() => {
    if (!gameState.currentQuestion && !gameState.isGameComplete) {
      loadNextQuestion();
    }
  }, [gameState.currentQuestion, gameState.isGameComplete]);

  const loadNextQuestion = (): void => {
    if (mode === 'sentences') {
      const randomSentence = getRandomQuestion(sentences, usedQuestionIds);

      if (!randomSentence) {
        // Fallback: reset used questions if we run out
        setUsedQuestionIds(new Set());
        const fallbackSentence = sentences[0];
        const quizQuestion = createQuizQuestion(fallbackSentence);
        setGameState(prev => ({
          ...prev,
          currentQuestion: quizQuestion,
          selectedAnswer: null,
          hasAnswered: false
        }));
        setUsedQuestionIds(new Set([fallbackSentence.id]));
        return;
      }

      const quizQuestion = createQuizQuestion(randomSentence);
      setGameState(prev => ({
        ...prev,
        currentQuestion: quizQuestion,
        selectedAnswer: null,
        hasAnswered: false
      }));
      setUsedQuestionIds(prev => new Set([...prev, randomSentence.id]));
    } else {
      // Words mode
      const randomWord = getRandomWord(words, usedQuestionIds);

      if (!randomWord) {
        // Fallback: reset used questions if we run out
        setUsedQuestionIds(new Set());
        const fallbackWord = words[0];
        const wordQuestion = createWordQuestion(fallbackWord);
        setGameState(prev => ({
          ...prev,
          currentQuestion: wordQuestion,
          selectedAnswer: null,
          hasAnswered: false
        }));
        setUsedQuestionIds(new Set([fallbackWord.id]));
        return;
      }

      const wordQuestion = createWordQuestion(randomWord);
      setGameState(prev => ({
        ...prev,
        currentQuestion: wordQuestion,
        selectedAnswer: null,
        hasAnswered: false
      }));
      setUsedQuestionIds(prev => new Set([...prev, randomWord.id]));
    }
  };

  const handleAnswerSelect = (answer: string): void => {
    if (gameState.hasAnswered || !gameState.currentQuestion) return;

    const isCorrect = answer === gameState.currentQuestion.correctAnswer;

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      hasAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNext = (): void => {
    if (gameState.round === 10) {
      setGameState(prev => ({ ...prev, isGameComplete: true }));
    } else {
      setGameState(prev => ({ ...prev, round: prev.round + 1 }));
      loadNextQuestion();
    }
  };

  const handleRestart = (): void => {
    setGameState({
      mode,
      round: 1,
      score: 0,
      currentQuestion: null,
      selectedAnswer: null,
      hasAnswered: false,
      isGameComplete: false
    });
    setUsedQuestionIds(new Set());
  };

  const getScoreMessage = (score: number): string => {
    const messages = [
      "Sacré bleu! Maybe start with 'Bonjour'?",
      "1/10... C'est la vie! At least you tried!",
      "2/10... Keep going, you'll get there... eventually!",
      "3/10... Bon courage! Rome wasn't built in a day!",
      "4/10... Not terrible, not great... très moyen!",
      "5/10... Halfway there! Encore, encore!",
      "6/10... Pas mal! You're getting the hang of it!",
      "7/10... Bien joué! You're doing pretty well!",
      "8/10... Très bien! Almost fluent... almost!",
      "9/10... Magnifique! One tiny mistake away from parfait!",
      "10/10... Incroyable! Are you secretly French?!"
    ];
    return messages[score];
  };

  if (gameState.isGameComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">Quiz Complete!</h2>
          <p className="text-6xl font-bold text-orange-500 mb-2">{gameState.score}/10</p>
          <p className="text-xl text-orange-200 mb-8">
            {getScoreMessage(gameState.score)}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
            >
              Start Over
            </button>
            <button
              onClick={onBackToMenu}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState.currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8 text-center">
          <p className="text-orange-200">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ScoreDisplay score={gameState.score} round={gameState.round} />

      <QuestionCard
        mode={mode}
        key={isQuizQuestion(gameState.currentQuestion)
          ? gameState.currentQuestion.sentence.id
          : gameState.currentQuestion.word.id}
        question={gameState.currentQuestion}
        onAnswerSelect={handleAnswerSelect}
        selectedAnswer={gameState.selectedAnswer}
        hasAnswered={gameState.hasAnswered}
      />

      {gameState.hasAnswered && (
        <div className="mt-6 text-center">
          <button
            onClick={handleNext}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
          >
            {gameState.round === 10 ? 'See Results' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}
