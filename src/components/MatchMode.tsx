import { useState, useEffect, useCallback } from 'react';
import { words } from '../data/words';

interface MatchModeProps {
  onBackToMenu: () => void;
}

interface MatchPair {
  id: number;
  french: string;
  english: string;
  matched: boolean;
}

const LIVES_START = 3;
const PAIR_COUNT = 7;
const LS_KEY = 'french-match-highscores';

const MATCH_POOL = words.filter(w =>
  w.partOfSpeech === 'noun' ||
  w.partOfSpeech === 'verb' ||
  w.partOfSpeech === 'adjective' ||
  w.partOfSpeech === 'adverb'
);

function loadTopScores(): number[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveScore(score: number): number[] {
  const scores = loadTopScores();
  scores.push(score);
  scores.sort((a, b) => b - a);
  const top3 = scores.slice(0, 3);
  localStorage.setItem(LS_KEY, JSON.stringify(top3));
  return top3;
}

function pickPairs(usedIds: Set<number>): MatchPair[] {
  const available = MATCH_POOL.filter(w => !usedIds.has(w.id));
  const pool = available.length >= PAIR_COUNT ? available : MATCH_POOL; // reset if exhausted
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, PAIR_COUNT).map(w => ({
    id: w.id,
    french: w.french,
    english: w.correctEnglish,
    matched: false
  })).sort((a, b) => a.french.localeCompare(b.french, 'fr'));
}

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MatchMode({ onBackToMenu }: MatchModeProps) {
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  const [englishOrder, setEnglishOrder] = useState<number[]>([]);
  const [selectedFrenchId, setSelectedFrenchId] = useState<number | null>(null);
  const [wrongIds, setWrongIds] = useState<{ frenchId: number; englishId: number } | null>(null);
  const [lives, setLives] = useState(LIVES_START);
  const [score, setScore] = useState(0);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [isGameOver, setIsGameOver] = useState(false);
  const [topScores, setTopScores] = useState<number[]>(loadTopScores);

  const loadNewPairs = useCallback((currentUsedIds: Set<number>) => {
    const newPairs = pickPairs(currentUsedIds);
    setPairs(newPairs);
    setEnglishOrder(shuffleIndices(PAIR_COUNT));
    setSelectedFrenchId(null);
    setWrongIds(null);
  }, []);

  useEffect(() => {
    loadNewPairs(new Set());
  }, [loadNewPairs]);

  const handleFrenchClick = (id: number) => {
    if (wrongIds) return; // ignore clicks during flash
    const pair = pairs.find(p => p.id === id);
    if (!pair || pair.matched) return;
    setSelectedFrenchId(prev => prev === id ? null : id);
  };

  const handleEnglishClick = (pairIndex: number) => {
    if (wrongIds) return; // ignore clicks during flash
    if (selectedFrenchId === null) return;
    const clickedPair = pairs[pairIndex];
    if (clickedPair.matched) return;

    if (clickedPair.id === selectedFrenchId) {
      // Correct match
      const newPairs = pairs.map(p =>
        p.id === selectedFrenchId ? { ...p, matched: true } : p
      );
      const newScore = score + 1;
      setPairs(newPairs);
      setScore(newScore);
      setSelectedFrenchId(null);

      const newUsedIds = new Set([...usedIds, selectedFrenchId]);
      setUsedIds(newUsedIds);

      if (newPairs.every(p => p.matched)) {
        setTimeout(() => loadNewPairs(newUsedIds), 400);
      }
    } else {
      // Wrong match — flash both red
      setWrongIds({ frenchId: selectedFrenchId, englishId: clickedPair.id });
      const newLives = lives - 1;
      setLives(newLives);
      setTimeout(() => {
        setWrongIds(null);
        setSelectedFrenchId(null);
        if (newLives === 0) {
          const updated = saveScore(score);
          setTopScores(updated);
          setIsGameOver(true);
        }
      }, 700);
    }
  };

  const handlePlayAgain = () => {
    const newUsedIds = new Set<number>();
    setUsedIds(newUsedIds);
    setScore(0);
    setLives(LIVES_START);
    setIsGameOver(false);
    loadNewPairs(newUsedIds);
  };

  const frenchBtnClass = (pair: MatchPair) => {
    const base = 'w-full text-left px-4 py-3 rounded-lg border-2 font-medium transition-all duration-150 ';
    if (pair.matched) return base + 'invisible';
    if (wrongIds?.frenchId === pair.id) return base + 'bg-red-800 border-red-500 text-red-100';
    if (selectedFrenchId === pair.id) return base + 'bg-orange-700 border-orange-400 text-white';
    return base + 'bg-gray-700 border-gray-600 text-orange-100 hover:border-orange-500 hover:bg-gray-600';
  };

  const englishBtnClass = (pair: MatchPair) => {
    const base = 'w-full text-left px-4 py-3 rounded-lg border-2 font-medium transition-all duration-150 ';
    if (pair.matched) return base + 'invisible';
    if (wrongIds?.englishId === pair.id) return base + 'bg-red-800 border-red-500 text-red-100';
    if (selectedFrenchId !== null && !pair.matched) return base + 'bg-gray-700 border-gray-500 text-blue-100 hover:border-blue-400 hover:bg-gray-600 cursor-pointer';
    return base + 'bg-gray-700 border-gray-600 text-blue-100';
  };

  if (isGameOver) {
    return (
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8 max-w-md mx-auto text-center">
        <h2 className="text-3xl font-bold text-orange-400 mb-2">Game Over</h2>
        <p className="text-orange-200 text-xl mb-6">Score: <span className="font-bold text-white">{score}</span></p>

        <div className="mb-6">
          <h3 className="text-orange-400 font-semibold mb-3">Top Scores</h3>
          <div className="space-y-2">
            {topScores.length === 0 && <p className="text-gray-400 text-sm">No scores yet</p>}
            {topScores.map((s, i) => (
              <div key={i} className="flex justify-between px-4 py-2 bg-gray-700 rounded-lg">
                <span className="text-orange-300">#{i + 1}</span>
                <span className={s === score && i === topScores.indexOf(score) ? 'text-white font-bold' : 'text-orange-100'}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={handlePlayAgain} className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors">
            Play Again
          </button>
          <button onClick={onBackToMenu} className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 text-2xl">
          {Array.from({ length: LIVES_START }).map((_, i) => (
            <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
          ))}
        </div>
        <div className="text-center">
          <span className="text-orange-200 text-sm">Score</span>
          <div className="text-3xl font-bold text-orange-400">{score}</div>
        </div>
        <div className="text-right">
          <span className="text-gray-400 text-sm">Best</span>
          <div className="text-lg font-semibold text-gray-300">{topScores[0] ?? 0}</div>
        </div>
      </div>

      {/* Word columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* French column */}
        <div className="space-y-2">
          {pairs.map(pair => (
            <button
              key={pair.id}
              onClick={() => handleFrenchClick(pair.id)}
              className={frenchBtnClass(pair)}
              disabled={pair.matched || !!wrongIds}
            >
              {pair.french}
            </button>
          ))}
        </div>

        {/* English column (shuffled order) */}
        <div className="space-y-2">
          {englishOrder.map(pairIdx => {
            const pair = pairs[pairIdx];
            return (
              <button
                key={pair.id}
                onClick={() => handleEnglishClick(pairIdx)}
                className={englishBtnClass(pair)}
                disabled={pair.matched || !!wrongIds || selectedFrenchId === null}
              >
                {pair.english}
              </button>
            );
          })}
        </div>
      </div>

      {/* Back to menu */}
      <div className="mt-6 text-center">
        <button onClick={onBackToMenu} className="px-5 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors text-sm">
          Back to Menu
        </button>
      </div>
    </div>
  );
}
