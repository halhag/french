export interface PronunciationPhrase {
  id: number;
  french: string;
  phonetic: string;
}

export const pronunciationPhrases: PronunciationPhrase[] = [
  // Morning routine
  { id: 1,  french: "le matin",               phonetic: "luh ma-TAN" },
  { id: 2,  french: "je me lève",              phonetic: "zhuh muh LEV" },
  { id: 3,  french: "avant sept heures",       phonetic: "a-VAHN set UR" },
  { id: 4,  french: "je prends mon café",      phonetic: "zhuh prahn mon ka-FAY" },
  { id: 5,  french: "en silence",              phonetic: "on see-LAHNS" },
  { id: 6,  french: "je lis un peu",           phonetic: "zhuh lee uhn PUH" },
  { id: 7,  french: "le journal",              phonetic: "luh zhoor-NAL" },
  { id: 8,  french: "un livre",                phonetic: "uhn LEEVR" },
  { id: 9,  french: "je prends ma douche",     phonetic: "zhuh prahn ma DOOSH" },
  { id: 10, french: "je m'habille",            phonetic: "zhuh ma-BEE" },
  { id: 11, french: "je suis prêt",            phonetic: "zhuh swee PREH" },
  { id: 12, french: "en vingt minutes",        phonetic: "on van mee-NÜT" },
  { id: 13, french: "une bonne façon",         phonetic: "ün bon fa-SON" },
  { id: 14, french: "commencer la journée",    phonetic: "ko-mahn-SAY la zhoor-NAY" },

  // Train to France
  { id: 15, french: "l'année dernière",        phonetic: "la-NAY dair-NYAIR" },
  { id: 16, french: "j'ai pris le train",      phonetic: "zhay pree luh TRAN" },
  { id: 17, french: "jusqu'en France",         phonetic: "zhüs-kohn FRAHNS" },
  { id: 18, french: "j'ai vu des villes",      phonetic: "zhay vü day VEEL" },
  { id: 19, french: "des rues",                phonetic: "day RÜ" },
  { id: 20, french: "des musées",              phonetic: "day mü-ZAY" },
  { id: 21, french: "j'ai bu du café",         phonetic: "zhay bü dü ka-FAY" },
  { id: 22, french: "dans un petit bar",       phonetic: "don uhn puh-TEE bar" },
  { id: 23, french: "près de la gare",         phonetic: "preh duh la GAR" },
  { id: 24, french: "depuis le train",         phonetic: "duh-PWEE luh TRAN" },
  { id: 25, french: "était magnifique",        phonetic: "ay-tay man-yee-FEEK" },
  { id: 26, french: "je veux voyager",         phonetic: "zhuh vuh voy-a-ZHAY" },
  { id: 27, french: "plus souvent",            phonetic: "plü soo-VAHN" },
  { id: 28, french: "de voir le monde",        phonetic: "duh vwar luh MOND" },

  // Cooking
  { id: 29, french: "cuisiner le soir",        phonetic: "kwee-zee-NAY luh SWAR" },
  { id: 30, french: "de la soupe",             phonetic: "duh la SOOP" },
  { id: 31, french: "du poulet",               phonetic: "dü poo-LAY" },
  { id: 32, french: "avec des légumes",        phonetic: "a-VEK day lay-GÜM" },
  { id: 33, french: "je prépare du poisson",   phonetic: "zhuh pray-PAR dü pwa-SON" },
  { id: 34, french: "c'est bon pour la santé", phonetic: "say bon poor la sahn-TAY" },
  { id: 35, french: "j'adore le fromage",      phonetic: "zha-DOR luh fro-MAZH" },
  { id: 36, french: "et le pain",              phonetic: "ay luh PAN" },
  { id: 37, french: "on mange très bien",      phonetic: "on mahnzh treh BYAN" },

  // Work day
  { id: 38, french: "je commence ma journée",  phonetic: "zhuh ko-MAHNS ma zhoor-NAY" },
  { id: 39, french: "au bureau",               phonetic: "oh bü-ROH" },
  { id: 40, french: "vers neuf heures",        phonetic: "vair nuf UR" },
  { id: 41, french: "je lis mes emails",       phonetic: "zhuh lee may ee-MAYL" },
  { id: 42, french: "je prépare des réunions", phonetic: "zhuh pray-PAR day ray-ün-YON" },
  { id: 43, french: "avec mes collègues",      phonetic: "a-VEK may ko-LEG" },
  { id: 44, french: "c'est parfois compliqué", phonetic: "say par-FWA kom-plee-KAY" },
  { id: 45, french: "ce que je fais",          phonetic: "suh kuh zhuh FAY" },
  { id: 46, french: "à midi",                  phonetic: "a mee-DEE" },
  { id: 47, french: "avec des amis",           phonetic: "a-VEK day za-MEE" },
  { id: 48, french: "au café",                 phonetic: "oh ka-FAY" },
  { id: 49, french: "je rentre chez moi",      phonetic: "zhuh RAHNTR shay MWA" },
  { id: 50, french: "fatigué mais content",    phonetic: "fa-tee-GAY meh kon-TAHN" },

  // Weekend / nature
  { id: 51, french: "le week-end",             phonetic: "luh week-END" },
  { id: 52, french: "j'aime me promener",      phonetic: "zhem muh pro-muh-NAY" },
  { id: 53, french: "dans la forêt",           phonetic: "don la fo-REH" },
  { id: 54, french: "je peux rester",          phonetic: "zhuh puh res-TAY" },
  { id: 55, french: "des heures dehors",       phonetic: "day zur duh-OR" },
  { id: 56, french: "c'est ce que j'aime",     phonetic: "say suh kuh ZHEM" },
  { id: 57, french: "le mieux",                phonetic: "luh MYUH" },
  { id: 58, french: "je fais du vélo",         phonetic: "zhuh fay dü VAY-lo" },
  { id: 59, french: "je nage",                 phonetic: "zhuh NAZH" },
  { id: 60, french: "dans le lac",             phonetic: "don luh LAK" },
  { id: 61, french: "je suis heureux",         phonetic: "zhuh swee uh-RUH" },
  { id: 62, french: "dans la nature",          phonetic: "don la na-TÜR" },
  { id: 63, french: "en hiver",                phonetic: "on ee-VAIR" },
  { id: 64, french: "je fais du ski",          phonetic: "zhuh fay dü SKEE" },
  { id: 65, french: "bien sûr",                phonetic: "byan SÜR" },
];
