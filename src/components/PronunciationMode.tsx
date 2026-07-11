import { useState, useEffect, useRef, useCallback } from "react";
import { pronunciationPhrases, PronunciationPhrase } from "../data/pronunciationPhrases";
import { checkAnswer, AnswerResult } from "../utils/normalise";

interface PronunciationModeProps {
  onBackToMenu: () => void;
}

const ROUNDS = 10;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SR: any = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;

function pickRandom(usedIds: Set<number>): PronunciationPhrase | null {
  const available = pronunciationPhrases.filter(p => !usedIds.has(p.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function getScoreMessage(score: number): string {
  const messages = [
    "Mon Dieu! Even the microphone was confused!",
    "1/10... The mic heard something... French-adjacent!",
    "2/10... C'est un début! Keep talking!",
    "3/10... Getting clearer! Practice makes parfait!",
    "4/10... The French recognizer is warming to you!",
    "5/10... Halfway! Your mouth is on the right track!",
    "6/10... Pas mal! The computer understood most of that!",
    "7/10... Bien parlé! Sounding more French by the minute!",
    "8/10... Très bien! Almost accent-perfect... well, almost!",
    "9/10... Presque parfait! One tiny mumble!",
    "10/10... Magnifique! Are you secretly French?!",
  ];
  return messages[score];
}


export function PronunciationMode({ onBackToMenu }: PronunciationModeProps) {
  const supported = !!SR;
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentItem, setCurrentItem] = useState<PronunciationPhrase | null>(null);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [answerResult, setAnswerResult] = useState<AnswerResult>("wrong");
  const [listenError, setListenError] = useState<string | null>(null);
  const [showSelfScore, setShowSelfScore] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const frVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const LISTEN_TIMEOUT_MS = 8000;

  function clearListenTimeout() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function speak(text: string) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    if (frVoiceRef.current) u.voice = frVoiceRef.current;
    window.speechSynthesis.speak(u);
  }

  useEffect(() => {
    function loadFrVoice() {
      const voices = window.speechSynthesis.getVoices();
      frVoiceRef.current =
        voices.find(v => v.lang === "fr-FR") ??
        voices.find(v => v.lang.startsWith("fr")) ??
        null;
    }
    loadFrVoice();
    window.speechSynthesis.addEventListener("voiceschanged", loadFrVoice);
    loadNextItem(new Set());
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadFrVoice);
      window.speechSynthesis.cancel();
      clearListenTimeout();
      recognitionRef.current?.abort();
    };
  }, []);

  function loadNextItem(ids: Set<number>) {
    const item = pickRandom(ids);
    const next = item ?? pronunciationPhrases[Math.floor(Math.random() * pronunciationPhrases.length)];
    setCurrentItem(next);
    setUsedIds(new Set([...ids, next.id]));
    setTranscript("");
    setInterimTranscript("");
    setHasResult(false);
    setAnswerResult("wrong");
    setListenError(null);
    setShowSelfScore(false);
    setIsListening(false);
  }

  const startListening = useCallback(() => {
    if (!SR || !currentItem) return;
    recognitionRef.current?.abort();
    clearListenTimeout();
    setListenError(null);
    setInterimTranscript("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = true; // live transcription for perceived speed
    recognition.maxAlternatives = 5;
    recognitionRef.current = recognition;

    let gotResult = false;

    // Safety net: if the API stalls (flaky network), never let the UI hang on
    // "Listening…". Reset the clock on each burst of speech, cut it off if silent.
    function armTimeout() {
      clearListenTimeout();
      timeoutRef.current = window.setTimeout(() => {
        setListenError("That took too long — check your connection and try again, or score yourself below.");
        try { recognition.abort(); } catch { /* already stopped */ }
      }, LISTEN_TIMEOUT_MS);
    }

    recognition.onstart = () => {
      setIsListening(true);
      armTimeout();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let final: any = null;
      for (let i = 0; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) final = res;
        else interim += res[0].transcript;
      }

      if (interim && !final) {
        setInterimTranscript(interim);
        armTimeout(); // still hearing speech — extend the deadline
        return;
      }

      if (!final) return;
      gotResult = true;
      clearListenTimeout();

      const count: number = final.length;
      const alternatives: string[] = Array.from({ length: count }, (_, i) =>
        final[i].transcript as string
      );

      let bestResult: AnswerResult = "wrong";
      let bestTranscript = alternatives[0] ?? "";

      for (const alt of alternatives) {
        const r = checkAnswer(alt, currentItem.french);
        if (r === "correct") { bestResult = "correct"; bestTranscript = alt; break; }
        if (r === "accent_only" && bestResult === "wrong") { bestResult = "accent_only"; bestTranscript = alt; }
      }

      setInterimTranscript("");
      setTranscript(bestTranscript);
      setAnswerResult(bestResult);
      setHasResult(true);
      setIsListening(false);

      if (bestResult === "wrong") {
        setTimeout(() => speak(currentItem.french), 400);
      }
      if (bestResult !== "wrong") setScore(s => s + 1);
    };

    recognition.onerror = (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      clearListenTimeout();
      setIsListening(false);
      setInterimTranscript("");
      const code: string = event.error ?? "";
      if (code === "not-allowed") {
        setListenError("Microphone access denied — please allow it in browser settings.");
      } else if (code === "network") {
        setListenError("Speech recognition had a connection blip — try again or score yourself below.");
      } else if (code === "no-speech") {
        setListenError("No speech detected. Speak clearly and try again.");
      } else if (code === "aborted") {
        // Deliberate stop/timeout — any message is already set; stay quiet otherwise.
      } else {
        setListenError(`Error (${code || "unknown"}) — try again.`);
      }
    };

    recognition.onend = () => {
      clearListenTimeout();
      setIsListening(false);
      setInterimTranscript("");
      if (!gotResult) {
        setListenError(prev => prev ?? "Didn't catch that — try again, or score yourself below.");
      }
    };

    try {
      recognition.start();
    } catch {
      // start() throws InvalidStateError if a session is somehow still active.
      clearListenTimeout();
      setIsListening(false);
      setListenError("Couldn't start the microphone — try again, or score yourself below.");
    }
  }, [currentItem]);

  function handleNext() {
    clearListenTimeout();
    recognitionRef.current?.abort();
    if (round === ROUNDS) {
      setIsGameComplete(true);
    } else {
      setRound(r => r + 1);
      loadNextItem(usedIds);
    }
  }

  function handleRestart() {
    clearListenTimeout();
    recognitionRef.current?.abort();
    window.speechSynthesis.cancel();
    setRound(1);
    setScore(0);
    setIsGameComplete(false);
    loadNextItem(new Set());
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
          <p className="text-orange-200 mb-6">Loading...</p>
          <button onClick={onBackToMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg">
            Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score bar */}
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-4 mb-4 flex justify-between items-center">
        <span className="text-orange-300 font-semibold">Round {round}/{ROUNDS}</span>
        <span className="text-orange-300 font-semibold">Score: {score}</span>
      </div>

      {/* Question card */}
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8">

        {/* French phrase + listen button */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex-1" />
          <p className="text-white text-4xl font-bold text-center flex-1">{currentItem.french}</p>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => speak(currentItem.french)}
              title="Hear pronunciation"
              className="text-2xl hover:scale-110 transition-transform active:scale-95"
            >
              🔊
            </button>
          </div>
        </div>

        {/* Phonetic guide */}
        <p className="text-orange-400/70 text-center text-lg mb-8 tracking-wide">{currentItem.phonetic}</p>

        {/* Browser not supported warning */}
        {!supported && (
          <div className="bg-yellow-900/40 border-2 border-yellow-600 rounded-lg p-4 mb-6 text-center">
            <p className="text-yellow-300 font-semibold">Speech recognition requires Chrome or Edge.</p>
            <p className="text-yellow-200 text-sm mt-1">Use 🔊 to hear the phrase, then advance with Next.</p>
          </div>
        )}

        {/* Listening indicator + live transcription */}
        {isListening && (
          <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-orange-200 font-medium">Listening...</span>
            </div>
            {interimTranscript && (
              <p className="text-orange-300 italic text-lg min-h-[1.75rem]">"{interimTranscript}"</p>
            )}
          </div>
        )}

        {/* Self-assessment panel — shown on error, or any time the user opts in */}
        {(listenError || showSelfScore) && !hasResult && (
          <div className="mb-6 p-4 rounded-lg border-2 bg-yellow-900/40 border-yellow-600">
            {listenError && <p className="text-yellow-300 font-semibold mb-3">{listenError}</p>}
            <p className="text-yellow-200 text-sm mb-3">Listen with 🔊, say it aloud, then score yourself:</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setAnswerResult("correct"); setHasResult(true); setScore(s => s + 1); }}
                className="flex-1 bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                ✓ Got it!
              </button>
              <button
                onClick={() => { setAnswerResult("wrong"); setHasResult(true); setTimeout(() => speak(currentItem.french), 200); }}
                className="flex-1 bg-red-800 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                ✗ Missed it
              </button>
            </div>
          </div>
        )}

        {/* Feedback after result */}
        {hasResult && (
          <div className={`mb-6 p-4 rounded-lg border-2 ${
            answerResult !== "wrong" ? "bg-green-900/40 border-green-600" : "bg-red-900/40 border-red-600"
          }`}>
            {answerResult !== "wrong" ? (
              <p className="text-green-400 font-semibold text-lg">Bien dit!</p>
            ) : (
              <>
                <p className="text-red-400 font-semibold text-lg">Not quite!</p>
                <p className="text-orange-200 mt-1 text-sm">
                  I heard: <span className="font-bold text-white">{transcript || "..."}</span>
                </p>
                <p className="text-orange-200 text-sm">
                  Should be: <span className="font-bold text-white">{currentItem.french}</span>
                </p>
              </>
            )}
            <button onClick={() => speak(currentItem.french)}
              className="mt-2 text-sm text-orange-300 hover:text-orange-100 underline">
              🔊 Hear it again
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-4">
          {supported && !hasResult && (
            <button
              onClick={isListening ? () => recognitionRef.current?.abort() : startListening}
              className={`flex-1 font-semibold py-3 rounded-lg transition-colors shadow-lg text-white ${
                isListening ? "bg-red-700 hover:bg-red-800" : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isListening ? "⏹ Stop" : "🎤 Say it!"}
            </button>
          )}
          {(hasResult || !supported) && (
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

        {/* Always-available escape hatch when the mic won't cooperate */}
        {supported && !hasResult && !isListening && !listenError && !showSelfScore && (
          <button
            onClick={() => setShowSelfScore(true)}
            className="mt-3 w-full text-sm text-orange-300/80 hover:text-orange-100 underline"
          >
            Mic not cooperating? Score yourself instead
          </button>
        )}
      </div>

      <p className="text-center text-orange-400/50 text-xs mt-3">Press 🔊 to hear the correct pronunciation at any time</p>

      <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-700/40 rounded-lg text-center">
        <p className="text-yellow-500/70 text-xs">
          🧪 Experimental — speech recognition depends on your browser and network settings and may not always work.
        </p>
      </div>
    </div>
  );
}
