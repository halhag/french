import { useState } from "react";
import { QuizMode } from "./types/quiz";
import { Quiz } from "./components/Quiz";
import { ModeSelector } from "./components/ModeSelector";
import { ReadingMode } from "./components/ReadingMode";
import { MatchMode } from "./components/MatchMode";
import { ConjugationMode } from "./components/ConjugationMode";
import { TimeWordMode } from "./components/TimeWordMode";
import { PronunciationMode } from "./components/PronunciationMode";

function App() {
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);

  const handleModeSelect = (mode: QuizMode) => {
    setSelectedMode(mode);
  };

  const handleBackToMenu = () => {
    setSelectedMode(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
            French
          </h1>
          <p className="text-orange-200 text-lg">
            {selectedMode === null && "Choose your learning mode"}
            {selectedMode === "sentences" && "Test your French comprehension skills"}
            {selectedMode === "words" && "Build your French vocabulary"}
            {selectedMode === "reading" && "Read real French content"}
            {selectedMode === "match" && "Match French words to English"}
            {selectedMode === "conjugation" && "Conjugate French verbs from English"}
            {selectedMode === "timewords" && "Practice time words and phrases"}
            {selectedMode === "pronunciation" && "Say it out loud — practice French pronunciation"}
          </p>
        </header>

        {selectedMode === null ? (
          <ModeSelector onModeSelect={handleModeSelect} />
        ) : selectedMode === "reading" ? (
          <ReadingMode onBackToMenu={handleBackToMenu} />
        ) : selectedMode === "match" ? (
          <MatchMode onBackToMenu={handleBackToMenu} />
        ) : selectedMode === "conjugation" ? (
          <ConjugationMode onBackToMenu={handleBackToMenu} />
        ) : selectedMode === "timewords" ? (
          <TimeWordMode onBackToMenu={handleBackToMenu} />
        ) : selectedMode === "pronunciation" ? (
          <PronunciationMode onBackToMenu={handleBackToMenu} />
        ) : (
          <Quiz mode={selectedMode} onBackToMenu={handleBackToMenu} />
        )}
      </div>
    </div>
  );
}

export default App;
