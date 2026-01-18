interface ResultFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
}

export function ResultFeedback({ isCorrect, correctAnswer }: ResultFeedbackProps) {
  if (isCorrect) {
    return (
      <div className="mt-4 p-4 bg-green-900 border-2 border-green-500 rounded-lg">
        <p className="text-green-100 font-semibold text-center">
          ✓ Correct!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-red-900 border-2 border-red-500 rounded-lg">
      <p className="text-red-100 font-semibold">
        ✗ Incorrect
      </p>
      <p className="text-red-200 mt-2">
        Correct answer: <span className="font-semibold">{correctAnswer}</span>
      </p>
    </div>
  );
}
