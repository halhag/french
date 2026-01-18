import { QuizQuestion } from '../types/quiz';
import { AnswerButton } from './AnswerButton';
import { ResultFeedback } from './ResultFeedback';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  hasAnswered: boolean;
}

export function QuestionCard({
  question,
  onAnswerSelect,
  selectedAnswer,
  hasAnswered
}: QuestionCardProps) {
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

  return (
    <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-sm text-orange-300 mb-2">Translate to English:</p>
        <p className="text-2xl md:text-3xl font-bold text-orange-100 text-center">
          {question.sentence.french}
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
        <ResultFeedback
          isCorrect={selectedAnswer === question.correctAnswer}
          correctAnswer={question.correctAnswer}
        />
      )}
    </div>
  );
}
