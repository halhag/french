import { useState } from 'react';
import { QuizQuestionType, QuizMode } from '../types/quiz';
import { AnswerButton } from './AnswerButton';
import { ResultFeedback } from './ResultFeedback';
import { isQuizQuestion, isWordQuestion } from '../utils/quizLogic';

interface QuestionCardProps {
  mode: QuizMode;
  question: QuizQuestionType;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  hasAnswered: boolean;
}

export function QuestionCard({
  mode,
  question,
  onAnswerSelect,
  selectedAnswer,
  hasAnswered
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

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

  // Get a full French translation for the incorrect English option (sentences mode)
  const getFrenchHintForSentence = (englishOption: string): string => {
    if (!isQuizQuestion(question)) return "(different French)";

    const lower = englishOption.toLowerCase();

    // Care/worry/play patterns
    if (lower.includes("she takes care of her children")) return "Elle s'occupe de ses enfants";
    if (lower.includes("she worries about her children")) return "Elle s'inquiète pour ses enfants";
    if (lower.includes("she plays with her children")) return "Elle joue avec ses enfants";
    if (lower.includes("he takes care")) return "Il s'occupe de...";
    if (lower.includes("he worries")) return "Il s'inquiète de...";

    // "Get used to" vs "like" patterns
    if (lower.includes("i got used to the climate")) return "Je me suis habitué au climat";
    if (lower.includes("i like the climate")) return "J'aime le climat";
    if (lower.includes("i'm living in this climate")) return "Je vis dans ce climat";
    if (lower.includes("got used to waking up early")) return "Je me suis habitué à me lever tôt";
    if (lower.includes("got used to going to bed late")) return "Je me suis habitué à me coucher tard";
    if (lower.includes("like") && lower.includes("waking") || lower.includes("wake")) return "J'aime me lever tôt";

    // Basic verb patterns with pronouns
    if (lower.includes("i want a black cat")) return "Je veux un chat noir";
    if (lower.includes("i like marie")) return "J'aime Marie";
    if (lower.includes("marie is calling me")) return "Marie m'appelle";
    if (lower.includes("i have a black dog")) return "J'ai un chien noir";
    if (lower.includes("i have a black cat")) return "J'ai un chat noir";

    // Weather complete sentences
    if (lower.includes("it's snowing") || lower.includes("it is snowing")) return "Il neige";
    if (lower.includes("it's raining") || lower.includes("it is raining")) return "Il pleut";
    if (lower.includes("it's cold today") || lower.includes("it is cold today")) return "Il fait froid aujourd'hui";
    if (lower.includes("it's hot today")) return "Il fait chaud aujourd'hui";
    if (lower.includes("weather is nice")) return "Il fait beau";

    // "Avoir" expressions full sentences
    if (lower.includes("i'm afraid")) return "J'ai peur";
    if (lower.includes("i'm hungry")) return "J'ai faim";
    if (lower.includes("i'm thirsty")) return "J'ai soif";
    if (lower.includes("i'm cold") || lower.includes("i am cold")) return "J'ai froid";
    if (lower.includes("i'm hot")) return "J'ai chaud";
    if (lower.includes("i'm right")) return "J'ai raison";
    if (lower.includes("i'm wrong") || lower.includes("she's wrong")) return "Elle a tort / J'ai tort";
    if (lower.includes("she's right")) return "Elle a raison";
    if (lower.includes("she's afraid")) return "Elle a peur";

    // Time expressions - complete sentences
    if (lower.includes("i just finished my homework")) return "Je viens de finir mes devoirs";
    if (lower.includes("i'm about to finish my homework")) return "Je suis sur le point de finir mes devoirs";
    if (lower.includes("i started my homework")) return "J'ai commencé mes devoirs";
    if (lower.includes("just left")) return "vient de partir";
    if (lower.includes("just arrived")) return "vient d'arriver";
    if (lower.includes("about to leave")) return "sur le point de partir";

    // Past/future complete phrases
    if (lower.includes("yesterday")) return "...hier";
    if (lower.includes("tomorrow")) return "...demain";
    if (lower.includes("last night")) return "...hier soir";
    if (lower.includes("this morning")) return "...ce matin";
    if (lower.includes("this evening")) return "...ce soir";

    // Movement verbs - full phrases
    if (lower.includes("go home now") || lower.includes("better go home")) return "Je ferais mieux de rentrer maintenant";
    if (lower.includes("stay here now")) return "Je ferais mieux de rester ici";
    if (lower.includes("want to go home")) return "Je veux rentrer";

    // Learning/teaching
    if (lower.includes("she learned spanish")) return "Elle a appris l'espagnol";
    if (lower.includes("she's learning spanish")) return "Elle apprend l'espagnol";
    if (lower.includes("she's teaching spanish")) return "Elle enseigne l'espagnol";

    // State verbs
    if (lower.includes("looks") && lower.includes("happy")) return "Il/Elle a l'air content(e)";
    if (lower.includes("looks") && lower.includes("sad")) return "Il/Elle a l'air triste";
    if (lower.includes("looks") && lower.includes("angry")) return "Il/Elle a l'air en colère";
    if (lower.includes("looks") && lower.includes("worried")) return "Il/Elle a l'air inquiet/inquiète";
    if (lower.includes("looks") && lower.includes("bored")) return "Il/Elle a l'air de s'ennuyer";
    if (lower.includes("looks") && lower.includes("excited")) return "Il/Elle a l'air excité(e)";
    if (lower.includes("looks") && lower.includes("surprised")) return "Il/Elle a l'air surpris(e)";
    if (lower.includes("looks") && lower.includes("disappointed")) return "Il/Elle a l'air déçu(e)";
    if (lower.includes("looks") && lower.includes("confused")) return "Il/Elle a l'air confus(e)";

    // Feel vs look
    if (lower.includes("feels") && lower.includes("happy")) return "Il/Elle se sent content(e)";
    if (lower.includes("doesn't feel happy")) return "Il/Elle ne se sent pas content(e)";

    // Early/late complete
    if (lower.includes("woke up early")) return "Je me suis réveillé(e) tôt";
    if (lower.includes("woke up late") || lower.includes("i woke up late")) return "Je me suis réveillé(e) en retard";
    if (lower.includes("went to bed late")) return "Je me suis couché(e) tard";

    // Generic fallback with context from the sentence
    return "(would be different French)";
  };

  // Get hint for words mode - use the French translations stored in the word data
  const getFrenchHintForWord = (englishOption: string): string => {
    if (!isWordQuestion(question)) {
      return "(autre mot français)";
    }

    // Find the index of this option in the incorrect options array
    const incorrectIndex = question.word.incorrectOptions.indexOf(englishOption);

    // If found, return the corresponding French translation
    if (incorrectIndex !== -1 && question.word.incorrectOptionsFrench) {
      return question.word.incorrectOptionsFrench[incorrectIndex];
    }

    return "(autre mot français)";
  };

  // Get the French text and prompt based on mode
  const frenchText = isQuizQuestion(question) ? question.sentence.french : question.word.french;
  const promptText = mode === 'sentences' ? "Translate to English:" : "What does this mean in English?";
  const incorrectOptions = isQuizQuestion(question) ? question.sentence.incorrectOptions : question.word.incorrectOptions;

  return (
    <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-sm text-orange-300 mb-2">{promptText}</p>
        <p className="text-2xl md:text-3xl font-bold text-orange-100 text-center">
          {frenchText}
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
        <>
          <ResultFeedback
            isCorrect={selectedAnswer === question.correctAnswer}
            correctAnswer={question.correctAnswer}
          />

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-orange-400 hover:text-orange-300 underline text-sm font-medium"
            >
              {showExplanation ? '▲ Hide explanation' : '▼ Show explanation'}
            </button>
          </div>

          {showExplanation && (
            <div className="mt-4 p-4 bg-gray-700 border border-orange-500 rounded-lg">
              <h3 className="text-orange-400 font-semibold mb-3">Breakdown:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-orange-300 font-medium min-w-[80px]">French:</span>
                  <span className="text-orange-100">{frenchText}</span>
                </div>

                {/* Show additional metadata for words */}
                {mode === 'words' && isWordQuestion(question) && (
                  <>
                    {question.word.partOfSpeech && (
                      <div className="flex">
                        <span className="text-orange-300 font-medium min-w-[80px]">Type:</span>
                        <span className="text-orange-100 capitalize">{question.word.partOfSpeech}</span>
                      </div>
                    )}
                    {question.word.gender && (
                      <div className="flex">
                        <span className="text-orange-300 font-medium min-w-[80px]">Gender:</span>
                        <span className="text-orange-100 capitalize">{question.word.gender}</span>
                      </div>
                    )}
                  </>
                )}

                <div className="flex">
                  <span className="text-green-400 font-medium min-w-[80px]">Correct:</span>
                  <span className="text-green-100">{question.correctAnswer}</span>
                </div>

                <div className="border-t border-gray-600 pt-2 mt-2">
                  <p className="text-orange-300 font-medium mb-2">Why the other options are wrong:</p>
                  {incorrectOptions.map((option, index) => (
                    <div key={index} className="ml-4 mb-3">
                      <div className="flex">
                        <span className="text-red-400 mr-2">•</span>
                        <div className="flex-1">
                          <div className="text-red-200">{option}</div>
                          <div className="mt-1 text-xs text-gray-400 italic">
                            → {mode === 'sentences'
                              ? getFrenchHintForSentence(option)
                              : getFrenchHintForWord(option)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
