interface ScoreDisplayProps {
  score: number;
  round: number;
}

export function ScoreDisplay({ score, round }: ScoreDisplayProps) {
  return (
    <div className="flex justify-between items-center mb-6 text-lg font-semibold">
      <div className="text-orange-200">
        Round: <span className="text-orange-400">{round}/10</span>
      </div>
      <div className="text-orange-200">
        Score: <span className="text-orange-400">{score}</span>
      </div>
    </div>
  );
}
