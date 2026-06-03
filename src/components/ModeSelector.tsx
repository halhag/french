import { QuizMode } from '../types/quiz';

interface ModeSelectorProps {
  onModeSelect: (mode: QuizMode) => void;
}

export function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          Choose Your Challenge
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sentences Mode Card */}
          <button
            onClick={() => onModeSelect('sentences')}
            className="group bg-gray-700 border-2 border-orange-500 rounded-lg p-6 hover:bg-gray-600 hover:border-orange-400 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-orange-300 mb-2">
              Sentences
            </h3>
            <p className="text-orange-200 mb-4">
              Translate complete French sentences to English
            </p>
            <div className="text-sm text-orange-300">
              <div>• 200 sentences</div>
              <div>• Context-based learning</div>
              <div>• Grammar in action</div>
            </div>
          </button>

          {/* Words Mode Card */}
          <button
            onClick={() => onModeSelect('words')}
            className="group bg-gray-700 border-2 border-orange-500 rounded-lg p-6 hover:bg-gray-600 hover:border-orange-400 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-orange-300 mb-2">
              Words
            </h3>
            <p className="text-orange-200 mb-4">
              Build vocabulary with individual words and phrases
            </p>
            <div className="text-sm text-orange-300">
              <div>• 1000 words</div>
              <div>• Focused vocabulary</div>
              <div>• Quick practice</div>
            </div>
          </button>

          {/* Reading Mode Card */}
          <button
            onClick={() => onModeSelect('reading')}
            className="group bg-gray-700 border-2 border-orange-500 rounded-lg p-6 hover:bg-gray-600 hover:border-orange-400 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-orange-300 mb-2">
              Reading
            </h3>
            <p className="text-orange-200 mb-4">
              Read real French news with translations
            </p>
            <div className="text-sm text-orange-300">
              <div>• Live from Le Monde</div>
              <div>• French + English</div>
              <div>• Real-world content</div>
            </div>
          </button>

          {/* Match Mode Card */}
          <button
            onClick={() => onModeSelect('match')}
            className="group bg-gray-700 border-2 border-orange-500 rounded-lg p-6 hover:bg-gray-600 hover:border-orange-400 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-2xl font-bold text-orange-300 mb-2">
              Match
            </h3>
            <p className="text-orange-200 mb-4">
              Match French words to their English translations
            </p>
            <div className="text-sm text-orange-300">
              <div>• 3 lives</div>
              <div>• Endless play</div>
              <div>• High score table</div>
            </div>
          </button>

          {/* Time Words Mode Card */}
          <button
            onClick={() => onModeSelect('timewords')}
            className="group bg-gray-700 border-2 border-orange-500 rounded-lg p-6 hover:bg-gray-600 hover:border-orange-400 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-2xl font-bold text-orange-300 mb-2">
              Time Words
            </h3>
            <p className="text-orange-200 mb-4">
              Practice time words, phrases and full sentences
            </p>
            <div className="text-sm text-orange-300">
              <div>• 3 drill types</div>
              <div>• Translation &amp; fill-in-blank</div>
              <div>• 10 questions per round</div>
            </div>
          </button>

          {/* Conjugation Mode Card */}
          <button
            onClick={() => onModeSelect('conjugation')}
            className="group bg-gray-700 border-2 border-orange-500 rounded-lg p-6 hover:bg-gray-600 hover:border-orange-400 transition-all duration-200 active:scale-95"
          >
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-2xl font-bold text-orange-300 mb-2">
              Conjugation
            </h3>
            <p className="text-orange-200 mb-4">
              Type French verb conjugations from English prompts
            </p>
            <div className="text-sm text-orange-300">
              <div>• 10 verbs, present &amp; past</div>
              <div>• Type your answer</div>
              <div>• 10 questions per round</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
