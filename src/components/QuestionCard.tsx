import { useState } from 'react';
import { QuizQuestionType, QuizMode } from '../types/quiz';
import { AnswerButton } from './AnswerButton';
import { ResultFeedback } from './ResultFeedback';
import { isQuizQuestion, isWordQuestion } from '../utils/quizLogic';

interface QuestionCardProps {
  mode: QuizMode;
  question: QuizQuestionType;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  hasAnswered: boolean;
}

export function QuestionCard({
  mode,
  question,
  onAnswerSelect,
  selectedAnswer,
  hasAnswered
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const getButtonState = (answer: string): 'default' | 'selected' | 'correct' | 'incorrect' => {
    if (!hasAnswered) {
      return 'default';
    }

    if (answer === question.correctAnswer) {
      return 'correct';
    }

    if (answer === selectedAnswer) {
      return 'incorrect';
    }

    return 'default';
  };

  // Get French translation for incorrect English option (sentences mode) - uses stored data
  const getFrenchHintForSentence = (englishOption: string): string => {
    if (!isQuizQuestion(question)) {
      return "(autre phrase française)";
    }

    // Find the index of this option in the incorrect options array
    const incorrectIndex = question.sentence.incorrectOptions.indexOf(englishOption);

    // If found, return the corresponding French translation
    if (incorrectIndex !== -1 && question.sentence.incorrectOptionsFrench) {
      return question.sentence.incorrectOptionsFrench[incorrectIndex];
    }

    return "(autre phrase française)";
  };

  // Get hint for words mode - use the French translations stored in the word data
  const getFrenchHintForWord = (englishOption: string): string => {
    if (!isWordQuestion(question)) {
      return "(autre mot français)";
    }

    // Find the index of this option in the incorrect options array
    const incorrectIndex = question.word.incorrectOptions.indexOf(englishOption);

    // If found, return the corresponding French translation
    if (incorrectIndex !== -1 && question.word.incorrectOptionsFrench) {
      return question.word.incorrectOptionsFrench[incorrectIndex];
    }

    return "(autre mot français)";
  };

  // Get the French text and prompt based on mode
  const frenchText = isQuizQuestion(question) ? question.sentence.french : question.word.french;
  const promptText = mode === 'sentences' ? "Translate to English:" : "What does this mean in English?";
  const incorrectOptions = isQuizQuestion(question) ? question.sentence.incorrectOptions : question.word.incorrectOptions;

  return (
    <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-sm text-orange-300 mb-2">{promptText}</p>
        <p className="text-2xl md:text-3xl font-bold text-orange-100 text-center">
          {frenchText}
        </p>
      </div>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            text={answer}
            onClick={() => onAnswerSelect(answer)}
            state={getButtonState(answer)}
            disabled={hasAnswered}
          />
        ))}
      </div>

      {hasAnswered && (
        <>
          <ResultFeedback
            isCorrect={selectedAnswer === question.correctAnswer}
            correctAnswer={question.correctAnswer}
          />

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-orange-400 hover:text-orange-300 underline text-sm font-medium"
            >
              {showExplanation ? '▲ Hide explanation' : '▼ Show explanation'}
            </button>
          </div>

          {showExplanation && (
            <div className="mt-4 p-4 bg-gray-700 border border-orange-500 rounded-lg">
              <h3 className="text-orange-400 font-semibold mb-3">Breakdown:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-orange-300 font-medium min-w-[80px]">French:</span>
                  <span className="text-orange-100">{frenchText}</span>
                </div>

                {/* Show additional metadata for words */}
                {mode === 'words' && isWordQuestion(question) && (
                  <>
                    {question.word.partOfSpeech && (
                      <div className="flex">
                        <span className="text-orange-300 font-medium min-w-[80px]">Type:</span>
                        <span className="text-orange-100 capitalize">{question.word.partOfSpeech}</span>
                      </div>
                    )}
                    {question.word.gender && (
                      <div className="flex">
                        <span className="text-orange-300 font-medium min-w-[80px]">Gender:</span>
                        <span className="text-orange-100 capitalize">{question.word.gender}</span>
                      </div>
                    )}
                  </>
                )}

                <div className="flex">
                  <span className="text-green-400 font-medium min-w-[80px]">Correct:</span>
                  <span className="text-green-100">{question.correctAnswer}</span>
                </div>

                <div className="border-t border-gray-600 pt-2 mt-2">
                  <p className="text-orange-300 font-medium mb-2">Why the other options are wrong:</p>
                  {incorrectOptions.map((option, index) => (
                    <div key={index} className="ml-4 mb-3">
                      <div className="flex">
                        <span className="text-red-400 mr-2">•</span>
                        <div className="flex-1">
                          <div className="text-red-200">{option}</div>
                          <div className="mt-1 text-xs text-gray-400 italic">
                            → {mode === 'sentences'
                              ? getFrenchHintForSentence(option)
                              : getFrenchHintForWord(option)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
