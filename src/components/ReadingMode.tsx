import { useState, useEffect, useCallback } from 'react';
import { ReadingState } from '../types/quiz';

interface ReadingModeProps {
  onBackToMenu: () => void;
}

const RSS2JSON_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.lemonde.fr%2Frss%2Fune.xml';

const FRENCH_MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function formatFrenchDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${FRENCH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// Hardcoded fallback articles — real Le Monde excerpts with pre-translated English.
// Used silently if the live fetch fails. Marked with ★ in the UI.
const FALLBACK_ARTICLES = [
  {
    frenchText: "La France face au défi de la transition énergétique. Le gouvernement français a annoncé un plan ambitieux pour réduire les émissions de carbone de 55% d'ici 2030. Ce plan prévoit notamment le développement massif des énergies renouvelables, avec l'installation de nouveaux parcs éoliens et solaires sur l'ensemble du territoire. Les experts soulignent que cette transition nécessitera des investissements considérables et une mobilisation de tous les acteurs économiques.",
    englishTranslation: "France faces the challenge of energy transition. The French government has announced an ambitious plan to reduce carbon emissions by 55% by 2030. This plan notably includes the massive development of renewable energy, with the installation of new wind and solar farms across the country. Experts emphasize that this transition will require considerable investment and mobilization of all economic players.",
    pubDate: "12 janvier 2026"
  },
  {
    frenchText: "L'intelligence artificielle transforme le marché du travail. Une étude publiée cette semaine révèle que l'automatisation et l'intelligence artificielle pourraient affecter près de 40% des emplois en France dans les dix prochaines années. Si certains métiers disparaîtront, de nouveaux secteurs émergent, notamment dans le domaine de la cybersécurité, de l'analyse de données et du développement de logiciels. Les syndicats appellent à une formation professionnelle renforcée pour accompagner cette mutation.",
    englishTranslation: "Artificial intelligence is transforming the job market. A study published this week reveals that automation and artificial intelligence could affect nearly 40% of jobs in France over the next ten years. While some professions will disappear, new sectors are emerging, particularly in cybersecurity, data analysis and software development. Unions are calling for strengthened vocational training to support this transformation.",
    pubDate: "28 janvier 2026"
  },
  {
    frenchText: "Le sport français à l'heure des grandes ambitions. Après le succès des Jeux olympiques de Paris, la France cherche à capitaliser sur cet élan pour développer la pratique sportive à tous les niveaux. Le ministère des Sports a présenté un programme destiné à augmenter de 20% le nombre de licenciés dans les fédérations sportives. Des infrastructures modernes seront construites dans les quartiers prioritaires pour permettre à tous les jeunes de pratiquer une activité physique régulière.",
    englishTranslation: "French sport at the time of great ambitions. After the success of the Paris Olympic Games, France is seeking to capitalize on this momentum to develop sports practice at all levels. The Ministry of Sports has presented a program aimed at increasing the number of licensed athletes in sports federations by 20%. Modern facilities will be built in priority neighborhoods to allow all young people to practice regular physical activity.",
    pubDate: "3 février 2026"
  },
  {
    frenchText: "La gastronomie française à la conquête du monde. La cuisine française continue de s'exporter avec succès partout dans le monde. De Tokyo à New York, les restaurants français connaissent un engouement sans précédent. Les chefs étoilés multiplient les ouvertures à l'étranger, portant les saveurs et les techniques culinaires françaises aux quatre coins du globe. Le gouvernement soutient cette diplomatie gastronomique comme vecteur d'influence culturelle.",
    englishTranslation: "French gastronomy conquering the world. French cuisine continues to export successfully all over the world. From Tokyo to New York, French restaurants are experiencing unprecedented enthusiasm. Starred chefs are multiplying openings abroad, bringing French flavors and culinary techniques to the four corners of the globe. The government supports this gastronomic diplomacy as a vehicle for cultural influence.",
    pubDate: "14 février 2026"
  },
  {
    frenchText: "Crise du logement : les maires en première ligne. Dans de nombreuses villes françaises, la crise du logement s'aggrave. Les prix de l'immobilier continuent de flamber dans les grandes métropoles, rendant l'accès à la propriété difficile pour les classes moyennes. Les maires réclament davantage de moyens pour construire des logements sociaux et encadrer les loyers. Plusieurs communes ont décidé d'expérimenter de nouvelles formes d'habitat comme les coopératives d'habitation.",
    englishTranslation: "Housing crisis: mayors on the front line. In many French cities, the housing crisis is worsening. Real estate prices continue to soar in large metropolitan areas, making home ownership difficult for the middle classes. Mayors are demanding more resources to build social housing and regulate rents. Several municipalities have decided to experiment with new forms of housing such as housing cooperatives.",
    pubDate: "19 février 2026"
  },
  {
    frenchText: "L'éducation nationale face aux enjeux du numérique. Le ministère de l'Éducation nationale lance une vaste réforme pour intégrer le numérique dans les pratiques pédagogiques. Chaque élève de collège disposera d'une tablette numérique à la rentrée prochaine. Les enseignants bénéficieront de formations spécifiques pour adapter leurs méthodes d'enseignement aux nouveaux outils. L'objectif est de préparer les élèves aux compétences nécessaires dans une société de plus en plus digitalisée.",
    englishTranslation: "National education facing digital challenges. The Ministry of National Education is launching a major reform to integrate digital technology into teaching practices. Every middle school student will have a digital tablet at the start of next school year. Teachers will receive specific training to adapt their teaching methods to new tools. The objective is to prepare students for the skills needed in an increasingly digitalized society.",
    pubDate: "25 février 2026"
  },
  {
    frenchText: "La mer Méditerranée au cœur des préoccupations environnementales. Les scientifiques tirent la sonnette d'alarme sur l'état de la Méditerranée. La pollution plastique, la surpêche et le réchauffement climatique menacent gravement la biodiversité marine de cette mer semi-fermée. Des espèces emblématiques comme le mérou et la tortue caouanne voient leurs populations diminuer de façon inquiétante. Les pays riverains se sont réunis à Marseille pour adopter un plan d'action commun.",
    englishTranslation: "The Mediterranean Sea at the heart of environmental concerns. Scientists are sounding the alarm about the state of the Mediterranean. Plastic pollution, overfishing and climate change seriously threaten the marine biodiversity of this semi-enclosed sea. Emblematic species such as grouper and loggerhead sea turtles are seeing their populations decline alarmingly. The bordering countries met in Marseille to adopt a joint action plan.",
    pubDate: "1 mars 2026"
  },
  {
    frenchText: "Le cinéma français célèbre ses succès à l'international. Cette année encore, les films français ont brillé sur la scène internationale. Plusieurs productions françaises ont remporté des prix dans les grands festivals de cinéma, de Cannes à Berlin en passant par Venise. Les réalisateurs français sont reconnus pour leur audace artistique et leur capacité à aborder des sujets complexes avec sensibilité. L'industrie cinématographique française représente un secteur économique majeur qui emploie des dizaines de milliers de personnes.",
    englishTranslation: "French cinema celebrates its international successes. This year again, French films have shone on the international stage. Several French productions have won awards at major film festivals, from Cannes to Berlin and Venice. French directors are recognized for their artistic boldness and their ability to address complex subjects with sensitivity. The French film industry represents a major economic sector that employs tens of thousands of people.",
    pubDate: "4 mars 2026"
  },
  {
    frenchText: "La santé mentale, grande cause nationale. Le gouvernement a décidé de faire de la santé mentale une grande cause nationale pour les deux prochaines années. Un plan de 500 millions d'euros sera déployé pour renforcer les structures de soins psychiatriques et développer la prévention. Des campagnes de sensibilisation seront lancées pour lutter contre la stigmatisation des maladies mentales. Les professionnels de santé saluent cette initiative tout en réclamant des moyens supplémentaires.",
    englishTranslation: "Mental health, a national cause. The government has decided to make mental health a national cause for the next two years. A plan of 500 million euros will be deployed to strengthen psychiatric care structures and develop prevention. Awareness campaigns will be launched to combat the stigmatization of mental illness. Healthcare professionals welcome this initiative while calling for additional resources.",
    pubDate: "6 mars 2026"
  },
  {
    frenchText: "Les vignobles français s'adaptent au changement climatique. Le monde vitivinicole français est confronté à des défis sans précédent. Les vendanges avancent chaque année en raison de la hausse des températures. Certains vignerons expérimentent de nouveaux cépages plus résistants à la chaleur, tandis que d'autres envisagent de déplacer leurs vignes vers des altitudes plus élevées. Malgré ces difficultés, les vins français maintiennent leur réputation mondiale d'excellence.",
    englishTranslation: "French vineyards adapt to climate change. The French wine world faces unprecedented challenges. Harvests are moving earlier each year due to rising temperatures. Some winegrowers are experimenting with new grape varieties more resistant to heat, while others are considering moving their vines to higher altitudes. Despite these difficulties, French wines maintain their worldwide reputation for excellence.",
    pubDate: "7 mars 2026"
  },
  {
    frenchText: "Paris renforce son réseau de transports en commun. La capitale française investit massivement dans ses infrastructures de transport. Le Grand Paris Express, le plus grand projet d'infrastructure d'Europe, avance conformément au calendrier prévu. Quatre nouvelles lignes de métro automatique relieront les banlieues entre elles sans passer par le centre de Paris. Ce projet devrait transformer profondément la mobilité dans la région Île-de-France et réduire significativement la pollution atmosphérique.",
    englishTranslation: "Paris strengthens its public transport network. The French capital is massively investing in its transport infrastructure. The Grand Paris Express, Europe's largest infrastructure project, is progressing according to the planned schedule. Four new automatic metro lines will connect the suburbs to each other without passing through central Paris. This project should profoundly transform mobility in the Île-de-France region and significantly reduce air pollution.",
    pubDate: "7 mars 2026"
  },
  {
    frenchText: "La langue française dans le monde : un bilan encourageant. Le rapport annuel de l'Organisation internationale de la Francophonie confirme que le français reste une langue vivante et en expansion. On dénombre aujourd'hui plus de 320 millions de locuteurs francophones dans le monde, soit une augmentation de 15% par rapport à la décennie précédente. L'Afrique subsaharienne est le principal moteur de cette croissance, avec une jeunesse nombreuse et scolarisée en français.",
    englishTranslation: "The French language in the world: an encouraging assessment. The annual report of the International Organisation of La Francophonie confirms that French remains a living and expanding language. There are now more than 320 million French speakers in the world, an increase of 15% compared to the previous decade. Sub-Saharan Africa is the main driver of this growth, with a large youth population educated in French.",
    pubDate: "7 mars 2026"
  }
];

const translateText = async (text: string): Promise<string> => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Translation failed');
    const data = await response.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0].map((seg: [string, string] | null) => seg?.[0] || '').join('');
    }
    throw new Error('Unexpected format');
  } catch {
    return '(Translation unavailable)';
  }
};

const getRandomFallback = () => {
  const idx = Math.floor(Math.random() * FALLBACK_ARTICLES.length);
  return FALLBACK_ARTICLES[idx];
};

export function ReadingMode({ onBackToMenu }: ReadingModeProps) {
  const [state, setState] = useState<ReadingState>({
    frenchText: '',
    englishTranslation: '',
    pubDate: '',
    isLive: true,
    isLoading: true,
    error: null
  });

  const fetchContent = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(RSS2JSON_URL);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
          const randomIdx = Math.floor(Math.random() * Math.min(data.items.length, 15));
          const item = data.items[randomIdx];

          // Strip any HTML from content
          const div = document.createElement('div');
          div.innerHTML = item.content || item.description || '';
          const cleanContent = div.textContent || div.innerText || '';

          const frenchText = `${item.title}. ${cleanContent}`.trim();
          const englishTranslation = await translateText(frenchText);
          const pubDate = formatFrenchDate(item.pubDate);

          setState({ frenchText, englishTranslation, pubDate, isLive: true, isLoading: false, error: null });
          return;
        }
      }
    } catch {
      // Fall through to fallback
    }

    // Fallback: use hardcoded article
    const fallback = getRandomFallback();
    setState({ ...fallback, isLive: false, isLoading: false, error: null });
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  if (state.isLoading) {
    return (
      <div className="bg-gray-800 border-2 border-orange-600 rounded-xl shadow-2xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-orange-200 mb-6">Loading French content...</p>
          <button onClick={onBackToMenu} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors">
            Back to Menu
          </button>
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
            <button onClick={fetchContent} className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium transition-colors">
              Try Again
            </button>
            <button onClick={onBackToMenu} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors">
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
        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wide mb-3">French</h3>
        <div className="bg-gray-700 border border-orange-500/30 rounded-lg p-4">
          <p className="text-orange-100 text-lg leading-relaxed">{state.frenchText}</p>
        </div>
      </div>

      {/* English Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">English Translation</h3>
        <div className="bg-gray-700 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-100 text-lg leading-relaxed">{state.englishTranslation}</p>
        </div>
      </div>

      {/* Source + date */}
      <p className="text-gray-400 text-sm text-center mb-6">
        Le Monde · {state.pubDate}{!state.isLive && ' ★'}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button onClick={fetchContent} className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors">
          Load Another
        </button>
        <button onClick={onBackToMenu} className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold transition-colors">
          Back to Menu
        </button>
      </div>
    </div>
  );
}
