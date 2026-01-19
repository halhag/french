import { useState } from 'react';
import { QuizMode } from './types/quiz';
import { Quiz } from './components/Quiz';
import { ModeSelector } from './components/ModeSelector';

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
            French Quiz
          </h1>
          <p className="text-orange-200 text-lg">
            {selectedMode === null && "Choose your learning mode"}
            {selectedMode === 'sentences' && "Test your French comprehension skills"}
            {selectedMode === 'words' && "Build your French vocabulary"}
          </p>
        </header>

        {selectedMode === null ? (
          <ModeSelector onModeSelect={handleModeSelect} />
        ) : (
          <Quiz mode={selectedMode} onBackToMenu={handleBackToMenu} />
        )}
      </div>
    </div>
  );
}

export default App;
