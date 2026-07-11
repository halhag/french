export type Tense = 'present' | 'passe_compose' | 'imparfait';

export interface ConjugationItem {
  id: number;
  verbEnglish: string;
  english: string;
  french: string;
  tense: Tense;
}

export const conjugations: ConjugationItem[] = [
  // ÊTRE — present
  { id: 1,  verbEnglish: 'to be', english: 'I am',       french: 'je suis', tense: 'present' },
  { id: 2,  verbEnglish: 'to be', english: 'you are',    french: 'tu es', tense: 'present' },
  { id: 3,  verbEnglish: 'to be', english: 'he/she is',  french: 'il est', tense: 'present' },
  { id: 4,  verbEnglish: 'to be', english: 'we are',     french: 'nous sommes', tense: 'present' },
  { id: 5,  verbEnglish: 'to be', english: 'you are (formal/plural)', french: 'vous êtes', tense: 'present' },
  { id: 6,  verbEnglish: 'to be', english: 'they are',   french: 'ils sont', tense: 'present' },
  // ÊTRE — imparfait
  { id: 7,  verbEnglish: 'to be', english: 'I was',      french: "j'étais", tense: 'imparfait' },
  { id: 8,  verbEnglish: 'to be', english: 'you were',   french: 'tu étais', tense: 'imparfait' },
  { id: 9,  verbEnglish: 'to be', english: 'he/she was', french: 'il était', tense: 'imparfait' },
  { id: 10, verbEnglish: 'to be', english: 'we were',    french: 'nous étions', tense: 'imparfait' },
  { id: 11, verbEnglish: 'to be', english: 'you were (formal/plural)', french: 'vous étiez', tense: 'imparfait' },
  { id: 12, verbEnglish: 'to be', english: 'they were',  french: 'ils étaient', tense: 'imparfait' },

  // AVOIR — present
  { id: 13, verbEnglish: 'to have', english: 'I have',       french: "j'ai", tense: 'present' },
  { id: 14, verbEnglish: 'to have', english: 'you have',     french: 'tu as', tense: 'present' },
  { id: 15, verbEnglish: 'to have', english: 'he/she has',   french: 'il a', tense: 'present' },
  { id: 16, verbEnglish: 'to have', english: 'we have',      french: 'nous avons', tense: 'present' },
  { id: 17, verbEnglish: 'to have', english: 'you have (formal/plural)', french: 'vous avez', tense: 'present' },
  { id: 18, verbEnglish: 'to have', english: 'they have',    french: 'ils ont', tense: 'present' },
  // AVOIR — passé composé
  { id: 19, verbEnglish: 'to have', english: 'I have had',       french: "j'ai eu", tense: 'passe_compose' },
  { id: 20, verbEnglish: 'to have', english: 'you have had',     french: 'tu as eu', tense: 'passe_compose' },
  { id: 21, verbEnglish: 'to have', english: 'he/she has had',   french: 'il a eu', tense: 'passe_compose' },
  { id: 22, verbEnglish: 'to have', english: 'we have had',      french: 'nous avons eu', tense: 'passe_compose' },
  { id: 23, verbEnglish: 'to have', english: 'you have had (formal/plural)', french: 'vous avez eu', tense: 'passe_compose' },
  { id: 24, verbEnglish: 'to have', english: 'they have had',    french: 'ils ont eu', tense: 'passe_compose' },

  // HABITER — present
  { id: 25, verbEnglish: 'to live', english: 'I live',       french: "j'habite", tense: 'present' },
  { id: 26, verbEnglish: 'to live', english: 'you live',     french: 'tu habites', tense: 'present' },
  { id: 27, verbEnglish: 'to live', english: 'he/she lives', french: 'il habite', tense: 'present' },
  { id: 28, verbEnglish: 'to live', english: 'we live',      french: 'nous habitons', tense: 'present' },
  { id: 29, verbEnglish: 'to live', english: 'you live (formal/plural)', french: 'vous habitez', tense: 'present' },
  { id: 30, verbEnglish: 'to live', english: 'they live',    french: 'ils habitent', tense: 'present' },
  // HABITER — passé composé
  { id: 31, verbEnglish: 'to live', english: 'I have lived',       french: "j'ai habité", tense: 'passe_compose' },
  { id: 32, verbEnglish: 'to live', english: 'you have lived',     french: 'tu as habité', tense: 'passe_compose' },
  { id: 33, verbEnglish: 'to live', english: 'he/she has lived',   french: 'il a habité', tense: 'passe_compose' },
  { id: 34, verbEnglish: 'to live', english: 'we have lived',      french: 'nous avons habité', tense: 'passe_compose' },
  { id: 35, verbEnglish: 'to live', english: 'you have lived (formal/plural)', french: 'vous avez habité', tense: 'passe_compose' },
  { id: 36, verbEnglish: 'to live', english: 'they have lived',    french: 'ils ont habité', tense: 'passe_compose' },

  // AIMER — present
  { id: 37, verbEnglish: 'to like/love', english: 'I like',       french: "j'aime", tense: 'present' },
  { id: 38, verbEnglish: 'to like/love', english: 'you like',     french: 'tu aimes', tense: 'present' },
  { id: 39, verbEnglish: 'to like/love', english: 'he/she likes', french: 'il aime', tense: 'present' },
  { id: 40, verbEnglish: 'to like/love', english: 'we like',      french: 'nous aimons', tense: 'present' },
  { id: 41, verbEnglish: 'to like/love', english: 'you like (formal/plural)', french: 'vous aimez', tense: 'present' },
  { id: 42, verbEnglish: 'to like/love', english: 'they like',    french: 'ils aiment', tense: 'present' },
  // AIMER — passé composé
  { id: 43, verbEnglish: 'to like/love', english: 'I have liked',       french: "j'ai aimé", tense: 'passe_compose' },
  { id: 44, verbEnglish: 'to like/love', english: 'you have liked',     french: 'tu as aimé', tense: 'passe_compose' },
  { id: 45, verbEnglish: 'to like/love', english: 'he/she has liked',   french: 'il a aimé', tense: 'passe_compose' },
  { id: 46, verbEnglish: 'to like/love', english: 'we have liked',      french: 'nous avons aimé', tense: 'passe_compose' },
  { id: 47, verbEnglish: 'to like/love', english: 'you have liked (formal/plural)', french: 'vous avez aimé', tense: 'passe_compose' },
  { id: 48, verbEnglish: 'to like/love', english: 'they have liked',    french: 'ils ont aimé', tense: 'passe_compose' },

  // ALLER — present
  { id: 49, verbEnglish: 'to go', english: 'I go',       french: 'je vais', tense: 'present' },
  { id: 50, verbEnglish: 'to go', english: 'you go',     french: 'tu vas', tense: 'present' },
  { id: 51, verbEnglish: 'to go', english: 'he/she goes', french: 'il va', tense: 'present' },
  { id: 52, verbEnglish: 'to go', english: 'we go',      french: 'nous allons', tense: 'present' },
  { id: 53, verbEnglish: 'to go', english: 'you go (formal/plural)', french: 'vous allez', tense: 'present' },
  { id: 54, verbEnglish: 'to go', english: 'they go',    french: 'ils vont', tense: 'present' },
  // ALLER — passé composé
  { id: 55, verbEnglish: 'to go', english: 'I went',     french: 'je suis allé', tense: 'passe_compose' },
  { id: 56, verbEnglish: 'to go', english: 'you went',   french: 'tu es allé', tense: 'passe_compose' },
  { id: 57, verbEnglish: 'to go', english: 'he/she went', french: 'il est allé', tense: 'passe_compose' },
  { id: 58, verbEnglish: 'to go', english: 'we went',    french: 'nous sommes allés', tense: 'passe_compose' },
  { id: 59, verbEnglish: 'to go', english: 'you went (formal/plural)', french: 'vous êtes allés', tense: 'passe_compose' },
  { id: 60, verbEnglish: 'to go', english: 'they went',  french: 'ils sont allés', tense: 'passe_compose' },

  // VENIR — present
  { id: 61, verbEnglish: 'to come', english: 'I come',       french: 'je viens', tense: 'present' },
  { id: 62, verbEnglish: 'to come', english: 'you come',     french: 'tu viens', tense: 'present' },
  { id: 63, verbEnglish: 'to come', english: 'he/she comes', french: 'il vient', tense: 'present' },
  { id: 64, verbEnglish: 'to come', english: 'we come',      french: 'nous venons', tense: 'present' },
  { id: 65, verbEnglish: 'to come', english: 'you come (formal/plural)', french: 'vous venez', tense: 'present' },
  { id: 66, verbEnglish: 'to come', english: 'they come',    french: 'ils viennent', tense: 'present' },
  // VENIR — passé composé
  { id: 67, verbEnglish: 'to come', english: 'I came',       french: 'je suis venu', tense: 'passe_compose' },
  { id: 68, verbEnglish: 'to come', english: 'you came',     french: 'tu es venu', tense: 'passe_compose' },
  { id: 69, verbEnglish: 'to come', english: 'he/she came',  french: 'il est venu', tense: 'passe_compose' },
  { id: 70, verbEnglish: 'to come', english: 'we came',      french: 'nous sommes venus', tense: 'passe_compose' },
  { id: 71, verbEnglish: 'to come', english: 'you came (formal/plural)', french: 'vous êtes venus', tense: 'passe_compose' },
  { id: 72, verbEnglish: 'to come', english: 'they came',    french: 'ils sont venus', tense: 'passe_compose' },

  // PARLER — present
  { id: 73, verbEnglish: 'to speak', english: 'I speak',       french: 'je parle', tense: 'present' },
  { id: 74, verbEnglish: 'to speak', english: 'you speak',     french: 'tu parles', tense: 'present' },
  { id: 75, verbEnglish: 'to speak', english: 'he/she speaks', french: 'il parle', tense: 'present' },
  { id: 76, verbEnglish: 'to speak', english: 'we speak',      french: 'nous parlons', tense: 'present' },
  { id: 77, verbEnglish: 'to speak', english: 'you speak (formal/plural)', french: 'vous parlez', tense: 'present' },
  { id: 78, verbEnglish: 'to speak', english: 'they speak',    french: 'ils parlent', tense: 'present' },
  // PARLER — passé composé
  { id: 79, verbEnglish: 'to speak', english: 'I have spoken',       french: "j'ai parlé", tense: 'passe_compose' },
  { id: 80, verbEnglish: 'to speak', english: 'you have spoken',     french: 'tu as parlé', tense: 'passe_compose' },
  { id: 81, verbEnglish: 'to speak', english: 'he/she has spoken',   french: 'il a parlé', tense: 'passe_compose' },
  { id: 82, verbEnglish: 'to speak', english: 'we have spoken',      french: 'nous avons parlé', tense: 'passe_compose' },
  { id: 83, verbEnglish: 'to speak', english: 'you have spoken (formal/plural)', french: 'vous avez parlé', tense: 'passe_compose' },
  { id: 84, verbEnglish: 'to speak', english: 'they have spoken',    french: 'ils ont parlé', tense: 'passe_compose' },

  // FAIRE — present
  { id: 85, verbEnglish: 'to do/make', english: 'I do',       french: 'je fais', tense: 'present' },
  { id: 86, verbEnglish: 'to do/make', english: 'you do',     french: 'tu fais', tense: 'present' },
  { id: 87, verbEnglish: 'to do/make', english: 'he/she does', french: 'il fait', tense: 'present' },
  { id: 88, verbEnglish: 'to do/make', english: 'we do',      french: 'nous faisons', tense: 'present' },
  { id: 89, verbEnglish: 'to do/make', english: 'you do (formal/plural)', french: 'vous faites', tense: 'present' },
  { id: 90, verbEnglish: 'to do/make', english: 'they do',    french: 'ils font', tense: 'present' },
  // FAIRE — passé composé
  { id: 91, verbEnglish: 'to do/make', english: 'I have done',       french: "j'ai fait", tense: 'passe_compose' },
  { id: 92, verbEnglish: 'to do/make', english: 'you have done',     french: 'tu as fait', tense: 'passe_compose' },
  { id: 93, verbEnglish: 'to do/make', english: 'he/she has done',   french: 'il a fait', tense: 'passe_compose' },
  { id: 94, verbEnglish: 'to do/make', english: 'we have done',      french: 'nous avons fait', tense: 'passe_compose' },
  { id: 95, verbEnglish: 'to do/make', english: 'you have done (formal/plural)', french: 'vous avez fait', tense: 'passe_compose' },
  { id: 96, verbEnglish: 'to do/make', english: 'they have done',    french: 'ils ont fait', tense: 'passe_compose' },

  // TRAVAILLER — present
  { id: 97,  verbEnglish: 'to work', english: 'I work',       french: 'je travaille', tense: 'present' },
  { id: 98,  verbEnglish: 'to work', english: 'you work',     french: 'tu travailles', tense: 'present' },
  { id: 99,  verbEnglish: 'to work', english: 'he/she works', french: 'il travaille', tense: 'present' },
  { id: 100, verbEnglish: 'to work', english: 'we work',      french: 'nous travaillons', tense: 'present' },
  { id: 101, verbEnglish: 'to work', english: 'you work (formal/plural)', french: 'vous travaillez', tense: 'present' },
  { id: 102, verbEnglish: 'to work', english: 'they work',    french: 'ils travaillent', tense: 'present' },
  // TRAVAILLER — passé composé
  { id: 103, verbEnglish: 'to work', english: 'I have worked',       french: "j'ai travaillé", tense: 'passe_compose' },
  { id: 104, verbEnglish: 'to work', english: 'you have worked',     french: 'tu as travaillé', tense: 'passe_compose' },
  { id: 105, verbEnglish: 'to work', english: 'he/she has worked',   french: 'il a travaillé', tense: 'passe_compose' },
  { id: 106, verbEnglish: 'to work', english: 'we have worked',      french: 'nous avons travaillé', tense: 'passe_compose' },
  { id: 107, verbEnglish: 'to work', english: 'you have worked (formal/plural)', french: 'vous avez travaillé', tense: 'passe_compose' },
  { id: 108, verbEnglish: 'to work', english: 'they have worked',    french: 'ils ont travaillé', tense: 'passe_compose' },

  // S'APPELER — present only
  { id: 109, verbEnglish: 'to be called', english: 'my name is',        french: "je m'appelle", tense: 'present' },
  { id: 110, verbEnglish: 'to be called', english: 'your name is',      french: "tu t'appelles", tense: 'present' },
  { id: 111, verbEnglish: 'to be called', english: 'his/her name is',   french: "il s'appelle", tense: 'present' },
  { id: 112, verbEnglish: 'to be called', english: 'our name is',       french: 'nous nous appelons', tense: 'present' },
  { id: 113, verbEnglish: 'to be called', english: 'your name is (formal/plural)', french: 'vous vous appelez', tense: 'present' },
  { id: 114, verbEnglish: 'to be called', english: 'their names are',   french: "ils s'appellent", tense: 'present' },

  // POUVOIR — present
  { id: 115, verbEnglish: 'can / to be able', english: 'I can',       french: 'je peux', tense: 'present' },
  { id: 116, verbEnglish: 'can / to be able', english: 'you can',     french: 'tu peux', tense: 'present' },
  { id: 117, verbEnglish: 'can / to be able', english: 'he/she can',  french: 'il peut', tense: 'present' },
  { id: 118, verbEnglish: 'can / to be able', english: 'we can',      french: 'nous pouvons', tense: 'present' },
  { id: 119, verbEnglish: 'can / to be able', english: 'you can (formal/plural)', french: 'vous pouvez', tense: 'present' },
  { id: 120, verbEnglish: 'can / to be able', english: 'they can',    french: 'ils peuvent', tense: 'present' },
  // POUVOIR — passé composé
  { id: 121, verbEnglish: 'can / to be able', english: 'I was able to',       french: "j'ai pu", tense: 'passe_compose' },
  { id: 122, verbEnglish: 'can / to be able', english: 'you were able to',     french: 'tu as pu', tense: 'passe_compose' },
  { id: 123, verbEnglish: 'can / to be able', english: 'he/she was able to',   french: 'il a pu', tense: 'passe_compose' },
  { id: 124, verbEnglish: 'can / to be able', english: 'we were able to',      french: 'nous avons pu', tense: 'passe_compose' },
  { id: 125, verbEnglish: 'can / to be able', english: 'you were able to (formal/plural)', french: 'vous avez pu', tense: 'passe_compose' },
  { id: 126, verbEnglish: 'can / to be able', english: 'they were able to',    french: 'ils ont pu', tense: 'passe_compose' },

  // VOULOIR — present
  { id: 127, verbEnglish: 'to want', english: 'I want',       french: 'je veux', tense: 'present' },
  { id: 128, verbEnglish: 'to want', english: 'you want',     french: 'tu veux', tense: 'present' },
  { id: 129, verbEnglish: 'to want', english: 'he/she wants', french: 'il veut', tense: 'present' },
  { id: 130, verbEnglish: 'to want', english: 'we want',      french: 'nous voulons', tense: 'present' },
  { id: 131, verbEnglish: 'to want', english: 'you want (formal/plural)', french: 'vous voulez', tense: 'present' },
  { id: 132, verbEnglish: 'to want', english: 'they want',    french: 'ils veulent', tense: 'present' },
  // VOULOIR — passé composé
  { id: 133, verbEnglish: 'to want', english: 'I wanted',       french: "j'ai voulu", tense: 'passe_compose' },
  { id: 134, verbEnglish: 'to want', english: 'you wanted',     french: 'tu as voulu', tense: 'passe_compose' },
  { id: 135, verbEnglish: 'to want', english: 'he/she wanted',  french: 'il a voulu', tense: 'passe_compose' },
  { id: 136, verbEnglish: 'to want', english: 'we wanted',      french: 'nous avons voulu', tense: 'passe_compose' },
  { id: 137, verbEnglish: 'to want', english: 'you wanted (formal/plural)', french: 'vous avez voulu', tense: 'passe_compose' },
  { id: 138, verbEnglish: 'to want', english: 'they wanted',    french: 'ils ont voulu', tense: 'passe_compose' },

  // DEVOIR — present
  { id: 139, verbEnglish: 'must / to have to', english: 'I have to',       french: 'je dois', tense: 'present' },
  { id: 140, verbEnglish: 'must / to have to', english: 'you have to',     french: 'tu dois', tense: 'present' },
  { id: 141, verbEnglish: 'must / to have to', english: 'he/she has to',   french: 'il doit', tense: 'present' },
  { id: 142, verbEnglish: 'must / to have to', english: 'we have to',      french: 'nous devons', tense: 'present' },
  { id: 143, verbEnglish: 'must / to have to', english: 'you have to (formal/plural)', french: 'vous devez', tense: 'present' },
  { id: 144, verbEnglish: 'must / to have to', english: 'they have to',    french: 'ils doivent', tense: 'present' },
  // DEVOIR — passé composé
  { id: 145, verbEnglish: 'must / to have to', english: 'I had to',       french: "j'ai dû", tense: 'passe_compose' },
  { id: 146, verbEnglish: 'must / to have to', english: 'you had to',     french: 'tu as dû', tense: 'passe_compose' },
  { id: 147, verbEnglish: 'must / to have to', english: 'he/she had to',  french: 'il a dû', tense: 'passe_compose' },
  { id: 148, verbEnglish: 'must / to have to', english: 'we had to',      french: 'nous avons dû', tense: 'passe_compose' },
  { id: 149, verbEnglish: 'must / to have to', english: 'you had to (formal/plural)', french: 'vous avez dû', tense: 'passe_compose' },
  { id: 150, verbEnglish: 'must / to have to', english: 'they had to',    french: 'ils ont dû', tense: 'passe_compose' },

  // SAVOIR — present
  { id: 151, verbEnglish: 'to know', english: 'I know',       french: 'je sais', tense: 'present' },
  { id: 152, verbEnglish: 'to know', english: 'you know',     french: 'tu sais', tense: 'present' },
  { id: 153, verbEnglish: 'to know', english: 'he/she knows', french: 'il sait', tense: 'present' },
  { id: 154, verbEnglish: 'to know', english: 'we know',      french: 'nous savons', tense: 'present' },
  { id: 155, verbEnglish: 'to know', english: 'you know (formal/plural)', french: 'vous savez', tense: 'present' },
  { id: 156, verbEnglish: 'to know', english: 'they know',    french: 'ils savent', tense: 'present' },
  // SAVOIR — passé composé
  { id: 157, verbEnglish: 'to know', english: 'I knew',       french: "j'ai su", tense: 'passe_compose' },
  { id: 158, verbEnglish: 'to know', english: 'you knew',     french: 'tu as su', tense: 'passe_compose' },
  { id: 159, verbEnglish: 'to know', english: 'he/she knew',  french: 'il a su', tense: 'passe_compose' },
  { id: 160, verbEnglish: 'to know', english: 'we knew',      french: 'nous avons su', tense: 'passe_compose' },
  { id: 161, verbEnglish: 'to know', english: 'you knew (formal/plural)', french: 'vous avez su', tense: 'passe_compose' },
  { id: 162, verbEnglish: 'to know', english: 'they knew',    french: 'ils ont su', tense: 'passe_compose' },

  // PRENDRE — present
  { id: 163, verbEnglish: 'to take', english: 'I take',       french: 'je prends', tense: 'present' },
  { id: 164, verbEnglish: 'to take', english: 'you take',     french: 'tu prends', tense: 'present' },
  { id: 165, verbEnglish: 'to take', english: 'he/she takes', french: 'il prend', tense: 'present' },
  { id: 166, verbEnglish: 'to take', english: 'we take',      french: 'nous prenons', tense: 'present' },
  { id: 167, verbEnglish: 'to take', english: 'you take (formal/plural)', french: 'vous prenez', tense: 'present' },
  { id: 168, verbEnglish: 'to take', english: 'they take',    french: 'ils prennent', tense: 'present' },
  // PRENDRE — passé composé
  { id: 169, verbEnglish: 'to take', english: 'I took',       french: "j'ai pris", tense: 'passe_compose' },
  { id: 170, verbEnglish: 'to take', english: 'you took',     french: 'tu as pris', tense: 'passe_compose' },
  { id: 171, verbEnglish: 'to take', english: 'he/she took',  french: 'il a pris', tense: 'passe_compose' },
  { id: 172, verbEnglish: 'to take', english: 'we took',      french: 'nous avons pris', tense: 'passe_compose' },
  { id: 173, verbEnglish: 'to take', english: 'you took (formal/plural)', french: 'vous avez pris', tense: 'passe_compose' },
  { id: 174, verbEnglish: 'to take', english: 'they took',    french: 'ils ont pris', tense: 'passe_compose' },

  // VOIR — present
  { id: 175, verbEnglish: 'to see', english: 'I see',       french: 'je vois', tense: 'present' },
  { id: 176, verbEnglish: 'to see', english: 'you see',     french: 'tu vois', tense: 'present' },
  { id: 177, verbEnglish: 'to see', english: 'he/she sees', french: 'il voit', tense: 'present' },
  { id: 178, verbEnglish: 'to see', english: 'we see',      french: 'nous voyons', tense: 'present' },
  { id: 179, verbEnglish: 'to see', english: 'you see (formal/plural)', french: 'vous voyez', tense: 'present' },
  { id: 180, verbEnglish: 'to see', english: 'they see',    french: 'ils voient', tense: 'present' },
  // VOIR — passé composé
  { id: 181, verbEnglish: 'to see', english: 'I saw',       french: "j'ai vu", tense: 'passe_compose' },
  { id: 182, verbEnglish: 'to see', english: 'you saw',     french: 'tu as vu', tense: 'passe_compose' },
  { id: 183, verbEnglish: 'to see', english: 'he/she saw',  french: 'il a vu', tense: 'passe_compose' },
  { id: 184, verbEnglish: 'to see', english: 'we saw',      french: 'nous avons vu', tense: 'passe_compose' },
  { id: 185, verbEnglish: 'to see', english: 'you saw (formal/plural)', french: 'vous avez vu', tense: 'passe_compose' },
  { id: 186, verbEnglish: 'to see', english: 'they saw',    french: 'ils ont vu', tense: 'passe_compose' },

  // DIRE — present
  { id: 187, verbEnglish: 'to say', english: 'I say',       french: 'je dis', tense: 'present' },
  { id: 188, verbEnglish: 'to say', english: 'you say',     french: 'tu dis', tense: 'present' },
  { id: 189, verbEnglish: 'to say', english: 'he/she says', french: 'il dit', tense: 'present' },
  { id: 190, verbEnglish: 'to say', english: 'we say',      french: 'nous disons', tense: 'present' },
  { id: 191, verbEnglish: 'to say', english: 'you say (formal/plural)', french: 'vous dites', tense: 'present' },
  { id: 192, verbEnglish: 'to say', english: 'they say',    french: 'ils disent', tense: 'present' },
  // DIRE — passé composé
  { id: 193, verbEnglish: 'to say', english: 'I said',       french: "j'ai dit", tense: 'passe_compose' },
  { id: 194, verbEnglish: 'to say', english: 'you said',     french: 'tu as dit', tense: 'passe_compose' },
  { id: 195, verbEnglish: 'to say', english: 'he/she said',  french: 'il a dit', tense: 'passe_compose' },
  { id: 196, verbEnglish: 'to say', english: 'we said',      french: 'nous avons dit', tense: 'passe_compose' },
  { id: 197, verbEnglish: 'to say', english: 'you said (formal/plural)', french: 'vous avez dit', tense: 'passe_compose' },
  { id: 198, verbEnglish: 'to say', english: 'they said',    french: 'ils ont dit', tense: 'passe_compose' },

  // MANGER — present
  { id: 199, verbEnglish: 'to eat', english: 'I eat',       french: 'je mange', tense: 'present' },
  { id: 200, verbEnglish: 'to eat', english: 'you eat',     french: 'tu manges', tense: 'present' },
  { id: 201, verbEnglish: 'to eat', english: 'he/she eats', french: 'il mange', tense: 'present' },
  { id: 202, verbEnglish: 'to eat', english: 'we eat',      french: 'nous mangeons', tense: 'present' },
  { id: 203, verbEnglish: 'to eat', english: 'you eat (formal/plural)', french: 'vous mangez', tense: 'present' },
  { id: 204, verbEnglish: 'to eat', english: 'they eat',    french: 'ils mangent', tense: 'present' },
  // MANGER — passé composé
  { id: 205, verbEnglish: 'to eat', english: 'I ate',       french: "j'ai mangé", tense: 'passe_compose' },
  { id: 206, verbEnglish: 'to eat', english: 'you ate',     french: 'tu as mangé', tense: 'passe_compose' },
  { id: 207, verbEnglish: 'to eat', english: 'he/she ate',  french: 'il a mangé', tense: 'passe_compose' },
  { id: 208, verbEnglish: 'to eat', english: 'we ate',      french: 'nous avons mangé', tense: 'passe_compose' },
  { id: 209, verbEnglish: 'to eat', english: 'you ate (formal/plural)', french: 'vous avez mangé', tense: 'passe_compose' },
  { id: 210, verbEnglish: 'to eat', english: 'they ate',    french: 'ils ont mangé', tense: 'passe_compose' },

  // BOIRE — present
  { id: 211, verbEnglish: 'to drink', english: 'I drink',       french: 'je bois', tense: 'present' },
  { id: 212, verbEnglish: 'to drink', english: 'you drink',     french: 'tu bois', tense: 'present' },
  { id: 213, verbEnglish: 'to drink', english: 'he/she drinks', french: 'il boit', tense: 'present' },
  { id: 214, verbEnglish: 'to drink', english: 'we drink',      french: 'nous buvons', tense: 'present' },
  { id: 215, verbEnglish: 'to drink', english: 'you drink (formal/plural)', french: 'vous buvez', tense: 'present' },
  { id: 216, verbEnglish: 'to drink', english: 'they drink',    french: 'ils boivent', tense: 'present' },
  // BOIRE — passé composé
  { id: 217, verbEnglish: 'to drink', english: 'I drank',       french: "j'ai bu", tense: 'passe_compose' },
  { id: 218, verbEnglish: 'to drink', english: 'you drank',     french: 'tu as bu', tense: 'passe_compose' },
  { id: 219, verbEnglish: 'to drink', english: 'he/she drank',  french: 'il a bu', tense: 'passe_compose' },
  { id: 220, verbEnglish: 'to drink', english: 'we drank',      french: 'nous avons bu', tense: 'passe_compose' },
  { id: 221, verbEnglish: 'to drink', english: 'you drank (formal/plural)', french: 'vous avez bu', tense: 'passe_compose' },
  { id: 222, verbEnglish: 'to drink', english: 'they drank',    french: 'ils ont bu', tense: 'passe_compose' },

  // FINIR — present
  { id: 223, verbEnglish: 'to finish', english: 'I finish',       french: 'je finis', tense: 'present' },
  { id: 224, verbEnglish: 'to finish', english: 'you finish',     french: 'tu finis', tense: 'present' },
  { id: 225, verbEnglish: 'to finish', english: 'he/she finishes', french: 'il finit', tense: 'present' },
  { id: 226, verbEnglish: 'to finish', english: 'we finish',      french: 'nous finissons', tense: 'present' },
  { id: 227, verbEnglish: 'to finish', english: 'you finish (formal/plural)', french: 'vous finissez', tense: 'present' },
  { id: 228, verbEnglish: 'to finish', english: 'they finish',    french: 'ils finissent', tense: 'present' },
  // FINIR — passé composé
  { id: 229, verbEnglish: 'to finish', english: 'I finished',       french: "j'ai fini", tense: 'passe_compose' },
  { id: 230, verbEnglish: 'to finish', english: 'you finished',     french: 'tu as fini', tense: 'passe_compose' },
  { id: 231, verbEnglish: 'to finish', english: 'he/she finished',  french: 'il a fini', tense: 'passe_compose' },
  { id: 232, verbEnglish: 'to finish', english: 'we finished',      french: 'nous avons fini', tense: 'passe_compose' },
  { id: 233, verbEnglish: 'to finish', english: 'you finished (formal/plural)', french: 'vous avez fini', tense: 'passe_compose' },
  { id: 234, verbEnglish: 'to finish', english: 'they finished',    french: 'ils ont fini', tense: 'passe_compose' },
];
