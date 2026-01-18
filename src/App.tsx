import { Quiz } from './components/Quiz';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
            French Quiz
          </h1>
          <p className="text-orange-200 text-lg">
            Test your French comprehension skills
          </p>
        </header>

        <Quiz />
      </div>
    </div>
  );
}

export default App;
