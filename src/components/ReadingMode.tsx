import { useState, useEffect, useCallback } from 'react';
import { ReadingState } from '../types/quiz';

interface ReadingModeProps {
  onBackToMenu: () => void;
}

const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?'
];

const LE_MONDE_RSS = 'https://www.lemonde.fr/rss/une.xml';

export function ReadingMode({ onBackToMenu }: ReadingModeProps) {
  const [state, setState] = useState<ReadingState>({
    frenchText: '',
    englishTranslation: '',
    source: '',
    isLoading: true,
    error: null
  });

  const extractTextFromRSS = (xml: string): { text: string; title: string } | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const items = doc.querySelectorAll('item');

      if (items.length === 0) return null;

      // Pick a random article from the feed
      const randomIndex = Math.floor(Math.random() * Math.min(items.length, 15));
      const item = items[randomIndex];

      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';

      // Clean HTML from description
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const cleanDescription = tempDiv.textContent || tempDiv.innerText || '';

      // Combine title and description for more content
      const fullText = `${title}. ${cleanDescription}`.trim();

      if (!fullText || fullText.length < 20) return null;

      return { text: fullText, title };
    } catch {
      return null;
    }
  };

  const translateText = async (text: string): Promise<string> => {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=en&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data = await response.json();

      // The response is an array where the first element contains translation segments
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedText = data[0]
          .map((segment: [string, string] | null) => segment?.[0] || '')
          .join('');
        return translatedText;
      }

      throw new Error('Unexpected translation response format');
    } catch {
      return '(Translation unavailable)';
    }
  };

  const fetchContent = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    let xmlContent: string | null = null;

    // Try each CORS proxy until one works
    for (const proxy of CORS_PROXIES) {
      try {
        const url = proxy + encodeURIComponent(LE_MONDE_RSS);
        const response = await fetch(url);

        if (!response.ok) continue;

        const data = await response.json();

        // Different proxies return data differently
        if (data.contents) {
          xmlContent = data.contents;
          break;
        } else if (typeof data === 'string') {
          xmlContent = data;
          break;
        }
      } catch {
        // Try next proxy
        continue;
      }
    }

    if (!xmlContent) {
      setState({
        frenchText: '',
        englishTranslation: '',
        source: '',
        isLoading: false,
        error: 'Could not fetch content from Le Monde. Please try again.'
      });
      return;
    }

    const extracted = extractTextFromRSS(xmlContent);

    if (!extracted) {
      setState({
        frenchText: '',
        englishTranslation: '',
        source: '',
        isLoading: false,
        error: 'Could not extract content. Please try again.'
      });
      return;
    }

    // Translate the text
    const translation = await translateText(extracted.text);

    setState({
      frenchText: extracted.text,
      englishTranslation: translation,
      source: 'Le Monde',
      isLoading: false,
      error: null
    });
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (state.isLoading) {
    return (
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-orange-200">Loading French content...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <p className="text-red-400 mb-4">{state.error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={fetchContent}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBackToMenu}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-6 md:p-8">
      {/* French Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wide mb-3">
          French
        </h3>
        <div className="bg-gray-700 border border-orange-500/30 rounded-lg p-4">
          <p className="text-orange-100 text-lg leading-relaxed">
            {state.frenchText}
          </p>
        </div>
      </div>

      {/* English Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">
          English Translation
        </h3>
        <div className="bg-gray-700 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-100 text-lg leading-relaxed">
            {state.englishTranslation}
          </p>
        </div>
      </div>

      {/* Source */}
      <p className="text-gray-400 text-sm text-center mb-6">
        Source: {state.source}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={fetchContent}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors"
        >
          Load Another
        </button>
        <button
          onClick={onBackToMenu}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}
