export interface ConjugationItem {
  id: number;
  verbEnglish: string;
  english: string;
  french: string;
}

export const conjugations: ConjugationItem[] = [
  // ÊTRE — present
  { id: 1,  verbEnglish: 'to be', english: 'I am',       french: 'je suis' },
  { id: 2,  verbEnglish: 'to be', english: 'you are',    french: 'tu es' },
  { id: 3,  verbEnglish: 'to be', english: 'he/she is',  french: 'il est' },
  { id: 4,  verbEnglish: 'to be', english: 'we are',     french: 'nous sommes' },
  { id: 5,  verbEnglish: 'to be', english: 'you are (formal/plural)', french: 'vous êtes' },
  { id: 6,  verbEnglish: 'to be', english: 'they are',   french: 'ils sont' },
  // ÊTRE — imparfait
  { id: 7,  verbEnglish: 'to be', english: 'I was',      french: "j'étais" },
  { id: 8,  verbEnglish: 'to be', english: 'you were',   french: 'tu étais' },
  { id: 9,  verbEnglish: 'to be', english: 'he/she was', french: 'il était' },
  { id: 10, verbEnglish: 'to be', english: 'we were',    french: 'nous étions' },
  { id: 11, verbEnglish: 'to be', english: 'you were (formal/plural)', french: 'vous étiez' },
  { id: 12, verbEnglish: 'to be', english: 'they were',  french: 'ils étaient' },

  // AVOIR — present
  { id: 13, verbEnglish: 'to have', english: 'I have',       french: "j'ai" },
  { id: 14, verbEnglish: 'to have', english: 'you have',     french: 'tu as' },
  { id: 15, verbEnglish: 'to have', english: 'he/she has',   french: 'il a' },
  { id: 16, verbEnglish: 'to have', english: 'we have',      french: 'nous avons' },
  { id: 17, verbEnglish: 'to have', english: 'you have (formal/plural)', french: 'vous avez' },
  { id: 18, verbEnglish: 'to have', english: 'they have',    french: 'ils ont' },
  // AVOIR — passé composé
  { id: 19, verbEnglish: 'to have', english: 'I have had',       french: "j'ai eu" },
  { id: 20, verbEnglish: 'to have', english: 'you have had',     french: 'tu as eu' },
  { id: 21, verbEnglish: 'to have', english: 'he/she has had',   french: 'il a eu' },
  { id: 22, verbEnglish: 'to have', english: 'we have had',      french: 'nous avons eu' },
  { id: 23, verbEnglish: 'to have', english: 'you have had (formal/plural)', french: 'vous avez eu' },
  { id: 24, verbEnglish: 'to have', english: 'they have had',    french: 'ils ont eu' },

  // HABITER — present
  { id: 25, verbEnglish: 'to live', english: 'I live',       french: "j'habite" },
  { id: 26, verbEnglish: 'to live', english: 'you live',     french: 'tu habites' },
  { id: 27, verbEnglish: 'to live', english: 'he/she lives', french: 'il habite' },
  { id: 28, verbEnglish: 'to live', english: 'we live',      french: 'nous habitons' },
  { id: 29, verbEnglish: 'to live', english: 'you live (formal/plural)', french: 'vous habitez' },
  { id: 30, verbEnglish: 'to live', english: 'they live',    french: 'ils habitent' },
  // HABITER — passé composé
  { id: 31, verbEnglish: 'to live', english: 'I have lived',       french: "j'ai habité" },
  { id: 32, verbEnglish: 'to live', english: 'you have lived',     french: 'tu as habité' },
  { id: 33, verbEnglish: 'to live', english: 'he/she has lived',   french: 'il a habité' },
  { id: 34, verbEnglish: 'to live', english: 'we have lived',      french: 'nous avons habité' },
  { id: 35, verbEnglish: 'to live', english: 'you have lived (formal/plural)', french: 'vous avez habité' },
  { id: 36, verbEnglish: 'to live', english: 'they have lived',    french: 'ils ont habité' },

  // AIMER — present
  { id: 37, verbEnglish: 'to like/love', english: 'I like',       french: "j'aime" },
  { id: 38, verbEnglish: 'to like/love', english: 'you like',     french: 'tu aimes' },
  { id: 39, verbEnglish: 'to like/love', english: 'he/she likes', french: 'il aime' },
  { id: 40, verbEnglish: 'to like/love', english: 'we like',      french: 'nous aimons' },
  { id: 41, verbEnglish: 'to like/love', english: 'you like (formal/plural)', french: 'vous aimez' },
  { id: 42, verbEnglish: 'to like/love', english: 'they like',    french: 'ils aiment' },
  // AIMER — passé composé
  { id: 43, verbEnglish: 'to like/love', english: 'I have liked',       french: "j'ai aimé" },
  { id: 44, verbEnglish: 'to like/love', english: 'you have liked',     french: 'tu as aimé' },
  { id: 45, verbEnglish: 'to like/love', english: 'he/she has liked',   french: 'il a aimé' },
  { id: 46, verbEnglish: 'to like/love', english: 'we have liked',      french: 'nous avons aimé' },
  { id: 47, verbEnglish: 'to like/love', english: 'you have liked (formal/plural)', french: 'vous avez aimé' },
  { id: 48, verbEnglish: 'to like/love', english: 'they have liked',    french: 'ils ont aimé' },

  // ALLER — present
  { id: 49, verbEnglish: 'to go', english: 'I go',       french: 'je vais' },
  { id: 50, verbEnglish: 'to go', english: 'you go',     french: 'tu vas' },
  { id: 51, verbEnglish: 'to go', english: 'he/she goes', french: 'il va' },
  { id: 52, verbEnglish: 'to go', english: 'we go',      french: 'nous allons' },
  { id: 53, verbEnglish: 'to go', english: 'you go (formal/plural)', french: 'vous allez' },
  { id: 54, verbEnglish: 'to go', english: 'they go',    french: 'ils vont' },
  // ALLER — passé composé
  { id: 55, verbEnglish: 'to go', english: 'I went',     french: 'je suis allé' },
  { id: 56, verbEnglish: 'to go', english: 'you went',   french: 'tu es allé' },
  { id: 57, verbEnglish: 'to go', english: 'he went',    french: 'il est allé' },
  { id: 58, verbEnglish: 'to go', english: 'we went',    french: 'nous sommes allés' },
  { id: 59, verbEnglish: 'to go', english: 'you went (formal/plural)', french: 'vous êtes allés' },
  { id: 60, verbEnglish: 'to go', english: 'they went',  french: 'ils sont allés' },

  // VENIR — present
  { id: 61, verbEnglish: 'to come', english: 'I come',       french: 'je viens' },
  { id: 62, verbEnglish: 'to come', english: 'you come',     french: 'tu viens' },
  { id: 63, verbEnglish: 'to come', english: 'he/she comes', french: 'il vient' },
  { id: 64, verbEnglish: 'to come', english: 'we come',      french: 'nous venons' },
  { id: 65, verbEnglish: 'to come', english: 'you come (formal/plural)', french: 'vous venez' },
  { id: 66, verbEnglish: 'to come', english: 'they come',    french: 'ils viennent' },
  // VENIR — passé composé
  { id: 67, verbEnglish: 'to come', english: 'I came',       french: 'je suis venu' },
  { id: 68, verbEnglish: 'to come', english: 'you came',     french: 'tu es venu' },
  { id: 69, verbEnglish: 'to come', english: 'he came',      french: 'il est venu' },
  { id: 70, verbEnglish: 'to come', english: 'we came',      french: 'nous sommes venus' },
  { id: 71, verbEnglish: 'to come', english: 'you came (formal/plural)', french: 'vous êtes venus' },
  { id: 72, verbEnglish: 'to come', english: 'they came',    french: 'ils sont venus' },

  // PARLER — present
  { id: 73, verbEnglish: 'to speak', english: 'I speak',       french: 'je parle' },
  { id: 74, verbEnglish: 'to speak', english: 'you speak',     french: 'tu parles' },
  { id: 75, verbEnglish: 'to speak', english: 'he/she speaks', french: 'il parle' },
  { id: 76, verbEnglish: 'to speak', english: 'we speak',      french: 'nous parlons' },
  { id: 77, verbEnglish: 'to speak', english: 'you speak (formal/plural)', french: 'vous parlez' },
  { id: 78, verbEnglish: 'to speak', english: 'they speak',    french: 'ils parlent' },
  // PARLER — passé composé
  { id: 79, verbEnglish: 'to speak', english: 'I have spoken',       french: "j'ai parlé" },
  { id: 80, verbEnglish: 'to speak', english: 'you have spoken',     french: 'tu as parlé' },
  { id: 81, verbEnglish: 'to speak', english: 'he/she has spoken',   french: 'il a parlé' },
  { id: 82, verbEnglish: 'to speak', english: 'we have spoken',      french: 'nous avons parlé' },
  { id: 83, verbEnglish: 'to speak', english: 'you have spoken (formal/plural)', french: 'vous avez parlé' },
  { id: 84, verbEnglish: 'to speak', english: 'they have spoken',    french: 'ils ont parlé' },

  // FAIRE — present
  { id: 85, verbEnglish: 'to do/make', english: 'I do',       french: 'je fais' },
  { id: 86, verbEnglish: 'to do/make', english: 'you do',     french: 'tu fais' },
  { id: 87, verbEnglish: 'to do/make', english: 'he/she does', french: 'il fait' },
  { id: 88, verbEnglish: 'to do/make', english: 'we do',      french: 'nous faisons' },
  { id: 89, verbEnglish: 'to do/make', english: 'you do (formal/plural)', french: 'vous faites' },
  { id: 90, verbEnglish: 'to do/make', english: 'they do',    french: 'ils font' },
  // FAIRE — passé composé
  { id: 91, verbEnglish: 'to do/make', english: 'I have done',       french: "j'ai fait" },
  { id: 92, verbEnglish: 'to do/make', english: 'you have done',     french: 'tu as fait' },
  { id: 93, verbEnglish: 'to do/make', english: 'he/she has done',   french: 'il a fait' },
  { id: 94, verbEnglish: 'to do/make', english: 'we have done',      french: 'nous avons fait' },
  { id: 95, verbEnglish: 'to do/make', english: 'you have done (formal/plural)', french: 'vous avez fait' },
  { id: 96, verbEnglish: 'to do/make', english: 'they have done',    french: 'ils ont fait' },

  // TRAVAILLER — present
  { id: 97,  verbEnglish: 'to work', english: 'I work',       french: 'je travaille' },
  { id: 98,  verbEnglish: 'to work', english: 'you work',     french: 'tu travailles' },
  { id: 99,  verbEnglish: 'to work', english: 'he/she works', french: 'il travaille' },
  { id: 100, verbEnglish: 'to work', english: 'we work',      french: 'nous travaillons' },
  { id: 101, verbEnglish: 'to work', english: 'you work (formal/plural)', french: 'vous travaillez' },
  { id: 102, verbEnglish: 'to work', english: 'they work',    french: 'ils travaillent' },
  // TRAVAILLER — passé composé
  { id: 103, verbEnglish: 'to work', english: 'I have worked',       french: "j'ai travaillé" },
  { id: 104, verbEnglish: 'to work', english: 'you have worked',     french: 'tu as travaillé' },
  { id: 105, verbEnglish: 'to work', english: 'he/she has worked',   french: 'il a travaillé' },
  { id: 106, verbEnglish: 'to work', english: 'we have worked',      french: 'nous avons travaillé' },
  { id: 107, verbEnglish: 'to work', english: 'you have worked (formal/plural)', french: 'vous avez travaillé' },
  { id: 108, verbEnglish: 'to work', english: 'they have worked',    french: 'ils ont travaillé' },

  // S'APPELER — present only
  { id: 109, verbEnglish: 'to be called', english: 'my name is',        french: "je m'appelle" },
  { id: 110, verbEnglish: 'to be called', english: 'your name is',      french: "tu t'appelles" },
  { id: 111, verbEnglish: 'to be called', english: 'his/her name is',   french: "il s'appelle" },
  { id: 112, verbEnglish: 'to be called', english: 'our name is',       french: 'nous nous appelons' },
  { id: 113, verbEnglish: 'to be called', english: 'your name is (formal/plural)', french: 'vous vous appelez' },
  { id: 114, verbEnglish: 'to be called', english: 'their names are',   french: "ils s'appellent" },
];
