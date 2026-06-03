export interface TimeWordItem {
  id: number;
  drill: 1 | 2 | 3;
  prompt: string;
  promptHint?: string;
  answer: string;
  alternatives?: string[];
}

export const timeWords: TimeWordItem[] = [
  // --- Drill 1: English → French translation ---
  { id: 1,  drill: 1, prompt: 'yesterday',                   answer: 'hier' },
  { id: 2,  drill: 1, prompt: 'today',                       answer: "aujourd'hui" },
  { id: 3,  drill: 1, prompt: 'tomorrow',                    answer: 'demain' },
  { id: 4,  drill: 1, prompt: 'this morning',                answer: 'ce matin' },
  { id: 5,  drill: 1, prompt: 'this afternoon',              answer: 'cet après-midi' },
  { id: 6,  drill: 1, prompt: 'this evening',                answer: 'ce soir' },
  { id: 7,  drill: 1, prompt: 'early',                       answer: 'tôt' },
  { id: 8,  drill: 1, prompt: 'late',                        answer: 'tard' },
  { id: 9,  drill: 1, prompt: 'late (behind schedule)',      answer: 'en retard' },
  { id: 10, drill: 1, prompt: 'on time',                     answer: "à l'heure" },
  { id: 11, drill: 1, prompt: 'see you tomorrow',            answer: 'à demain' },
  { id: 12, drill: 1, prompt: 'see you soon',                answer: 'à bientôt' },
  { id: 13, drill: 1, prompt: 'see you later',               answer: 'à plus tard' },
  { id: 14, drill: 1, prompt: 'see you in a little while',   answer: 'à tout à l\'heure' },
  { id: 15, drill: 1, prompt: 'in the morning',              answer: 'le matin' },
  { id: 16, drill: 1, prompt: 'in the evening',              answer: 'le soir' },
  { id: 17, drill: 1, prompt: 'at night',                    answer: 'la nuit' },

  // --- Drill 2: Fill in the blank ---
  { id: 18, drill: 2, prompt: '___, je me réveille à 7h.',              promptHint: '(this morning)',             answer: 'ce matin' },
  { id: 19, drill: 2, prompt: '___, je me suis réveillé à 8h.',         promptHint: '(yesterday)',                answer: 'hier' },
  { id: 20, drill: 2, prompt: '___, j\'ai un cours de français.',       promptHint: '(today)',                    answer: "aujourd'hui" },
  { id: 21, drill: 2, prompt: '___, c\'est mardi.',                     promptHint: '(tomorrow)',                 answer: 'demain' },
  { id: 22, drill: 2, prompt: 'Je vais faire les courses, ___.',        promptHint: '(this afternoon)',           answer: 'cet après-midi' },
  { id: 23, drill: 2, prompt: 'Le soir, je me couche ___.',             promptHint: '(late)',                     answer: 'tard' },
  { id: 24, drill: 2, prompt: 'J\'arrive au travail ___.',              promptHint: '(early)',                    answer: 'tôt' },
  { id: 25, drill: 2, prompt: '___, je dors.',                          promptHint: '(at night)',                 answer: 'la nuit' },
  { id: 26, drill: 2, prompt: 'Je vais regarder un film ___.',          promptHint: '(this evening)',             answer: 'ce soir' },
  { id: 27, drill: 2, prompt: 'Je vais déjeuner, ___ !',               promptHint: '(see you later)',            answer: 'à plus tard' },
  { id: 28, drill: 2, prompt: 'Je rentre à la maison, ___ !',          promptHint: '(see you in a little while)', answer: "à tout à l'heure" },

  // --- Drill 3: Translate the sentence ---
  { id: 29, drill: 3, prompt: 'Yesterday, I worked a lot.',
    answer: "Hier, j'ai travaillé beaucoup." },

  { id: 30, drill: 3, prompt: 'Today, I have a French lesson.',
    answer: "Aujourd'hui, j'ai une leçon de français.",
    alternatives: ["Aujourd'hui, j'ai un cours de français."] },

  { id: 31, drill: 3, prompt: "Tomorrow, it's Sunday.",
    answer: "Demain, c'est dimanche." },

  { id: 32, drill: 3, prompt: 'This morning I drank coffee before my lesson.',
    answer: "Ce matin, j'ai bu un café avant mon cours." },

  { id: 33, drill: 3, prompt: 'This afternoon I go for a walk in the park.',
    answer: 'Cet après-midi, je me promène dans le parc.' },

  { id: 34, drill: 3, prompt: 'This evening, I cook dinner and read a book.',
    answer: 'Ce soir, je cuisine le dîner et je lis un livre.',
    alternatives: ['Ce soir, je prépare le dîner et je lis un livre.'] },

  { id: 35, drill: 3, prompt: 'At night, I sleep well.',
    answer: 'La nuit, je dors bien.' },

  { id: 36, drill: 3, prompt: 'I go to bed late because I love reading.',
    answer: "Je me couche tard parce que j'adore lire.",
    alternatives: ["Je me couche tard parce que j'aime lire."] },

  { id: 37, drill: 3, prompt: 'I arrive at work early.',
    answer: "J'arrive au travail tôt." },

  { id: 38, drill: 3, prompt: 'I am late for the lesson!',
    answer: 'Je suis en retard pour le cours.' },

  { id: 39, drill: 3, prompt: "I'm going to rest now, see you tomorrow!",
    answer: 'Je vais me reposer maintenant, à demain !' },

  { id: 40, drill: 3, prompt: "I'm going to have lunch, see you later!",
    answer: 'Je vais déjeuner, à plus tard.' },

  { id: 41, drill: 3, prompt: "I'm going back home, see you in a little while!",
    answer: "Je rentre chez moi, à tout à l'heure." },

  { id: 42, drill: 3, prompt: "I'm going to Paris, see you soon!",
    answer: 'Je vais à Paris, à bientôt !' },

  { id: 43, drill: 3, prompt: 'Yesterday the weather was beautiful.',
    answer: 'Hier, le temps était beau.',
    alternatives: ['Il faisait beau.'] },
];
