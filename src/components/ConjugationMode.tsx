import { useState, useEffect, useRef } from "react";
import { conjugations, ConjugationItem } from "../data/conjugations";
import { checkAnswer, AnswerResult } from "../utils/normalise";

interface ConjugationModeProps {
  onBackToMenu: () => void;
}

const ROUNDS = 10;

type TenseFilter = "present" | "all";

function getPool(filter: TenseFilter): ConjugationItem[] {
  return filter === "present"
    ? conjugations.filter(c => c.tense === "present")
    : conjugations;
}

function pickRandom(usedIds: Set<number>, pool: ConjugationItem[]): ConjugationItem | null {
  const available = pool.filter(c => !usedIds.has(c.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function getScoreMessage(score: number): string {
  const messages = [
    "Mon Dieu! The verbs won this round...",
    "1/10... Je ne conjugue pas?",
    "2/10... You're conjugating... something!",
    "3/10... Getting warmer! Practice makes parfait!",
    "4/10... La grammaire vous attend!",
    "5/10... Halfway! Neither past nor present — just determined!",
    "6/10... Pas mal! The verbs are bending to your will!",
    "7/10... Bien conjugué! Almost fluent!",
    "8/10... Très bien! Les verbes vous obéissent!",
    "9/10... Presque parfait! One tiny slip!",
    "10/10... Bravo! Are you secretly a French grammar teacher?!",
  ];
  return messages[score];
}

export function ConjugationMode({ onBackToMenu }: ConjugationModeProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [tenseFilter, setTenseFilter] = useState<TenseFilter>("present");
  const [currentItem, setCurrentItem] = useState<ConjugationItem | null>(null);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [userInput, setUserInput] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult>("wrong");
  const [isGameComplete, setIsGameComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadNextItem(new Set(), tenseFilter);
  }, []);

  useEffect(() => {
    if (!hasSubmitted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentItem, hasSubmitted]);

  function loadNextItem(ids: Set<number>, filter: TenseFilter) {
    const pool = getPool(filter);
    const item = pickRandom(ids, pool);
    if (!item) {
      const fresh = pool[Math.floor(Math.random() * pool.length)];
      setCurrentItem(fresh);
      setUsedIds(new Set([fresh.id]));
    } else {
      setCurrentItem(item);
      setUsedIds(new Set([...ids, item.id]));
    }
    setUserInput("");
    setHasSubmitted(false);
    setAnswerResult("wrong");
  }

  function handleFilterChange(filter: TenseFilter) {
    if (filter === tenseFilter) return;
    setTenseFilter(filter);
    setRound(1);
    setScore(0);
    setIsGameComplete(false);
    loadNextItem(new Set(), filter);
  }

  function handleSubmit() {
    if (!currentItem || hasSubmitted) return;
    const result = checkAnswer(userInput, currentItem.french);
    setAnswerResult(result);
    setHasSubmitted(true);
    if (result !== "wrong") setScore(s => s + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (!hasSubmitted) handleSubmit();
      else handleNext();
    }
  }

  function handleNext() {
    if (round === ROUNDS) {
      setIsGameComplete(true);
    } else {
      setRound(r => r + 1);
      loadNextItem(usedIds, tenseFilter);
    }
  }

  function handleRestart() {
    setRound(1);
    setScore(0);
    setIsGameComplete(false);
    loadNextItem(new Set(), tenseFilter);
  }

  if (isGameComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">Round Complete!</h2>
          <p className="text-6xl font-bold text-orange-500 mb-2">{score}/{ROUNDS}</p>
          <p className="text-xl text-orange-200 mb-8">{getScoreMessage(score)}</p>
          <div className="flex justify-center gap-4">
            <button onClick={handleRestart}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg">
              Try Again
            </button>
            <button onClick={onBackToMenu}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg">
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentItem) {
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
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-2 mb-4 flex gap-2">
        <button
          onClick={() => handleFilterChange("present")}
          className={`flex-1 font-semibold py-2 rounded-lg transition-colors ${
            tenseFilter === "present"
              ? "bg-orange-600 text-white shadow"
              : "bg-gray-700 text-orange-200 hover:bg-gray-600"
          }`}>
          Present only
        </button>
        <button
          onClick={() => handleFilterChange("all")}
          className={`flex-1 font-semibold py-2 rounded-lg transition-colors ${
            tenseFilter === "all"
              ? "bg-orange-600 text-white shadow"
              : "bg-gray-700 text-orange-200 hover:bg-gray-600"
          }`}>
          All tenses
        </button>
      </div>

      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-4 mb-4 flex justify-between items-center">
        <span className="text-orange-300 font-semibold">Round {round}/{ROUNDS}</span>
        <span className="text-orange-300 font-semibold">Score: {score}</span>
      </div>

      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8">
        <p className="text-orange-400 text-sm font-medium text-center mb-1 uppercase tracking-wide">
          {currentItem.verbEnglish}
        </p>
        <p className="text-white text-4xl font-bold text-center mb-8">
          {currentItem.english}
        </p>

        <label className="block text-orange-300 text-sm font-medium mb-2">
          Type the French conjugation:
        </label>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={hasSubmitted}
          placeholder="e.g. je parle"
          className="w-full bg-gray-700 border-2 border-gray-600 focus:border-orange-500 rounded-lg px-4 py-3 text-white text-lg outline-none transition-colors disabled:opacity-60"
        />

        {hasSubmitted && (
          <div className={`mt-4 p-4 rounded-lg border-2 ${
            answerResult === "correct"     ? "bg-green-900/40 border-green-600" :
            answerResult === "accent_only" ? "bg-yellow-900/40 border-yellow-600" :
            "bg-red-900/40 border-red-600"
          }`}>
            {answerResult === "correct" && (
              <p className="text-green-400 font-semibold text-lg">Correct!</p>
            )}
            {answerResult === "accent_only" && (
              <>
                <p className="text-yellow-400 font-semibold text-lg">Correct — but watch your accent marks!</p>
                <p className="text-orange-200 mt-1">
                  You wrote: <span className="font-bold text-white">{userInput.trim()}</span>
                </p>
                <p className="text-orange-200">
                  Should be: <span className="font-bold text-white">{currentItem.french}</span>
                </p>
                <p className="text-yellow-300/70 text-sm mt-2">
                  Accent marks: accent aigu (é), accent grave (è/à/ù), accent circonflexe (ê/â/î/ô/û), tréma (ë/ï), cédille (ç)
                </p>
              </>
            )}
            {answerResult === "wrong" && (
              <>
                <p className="text-red-400 font-semibold text-lg">Not quite!</p>
                <p className="text-orange-200 mt-1">
                  Correct answer: <span className="font-bold text-white">{currentItem.french}</span>
                </p>
              </>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {!hasSubmitted ? (
            <button onClick={handleSubmit} disabled={userInput.trim() === ""}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors shadow-lg">
              Submit
            </button>
          ) : (
            <button onClick={handleNext}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg">
              {round === ROUNDS ? "See Results" : "Next"}
            </button>
          )}
          <button onClick={onBackToMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg">
            Menu
          </button>
        </div>
      </div>

      <p className="text-center text-orange-400/50 text-xs mt-3">Press Enter to submit or advance</p>
    </div>
  );
}
