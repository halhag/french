export function normalise(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['''ʼ`´]/g, '')
    .replace(/-/g, ' ')
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export type AnswerResult = 'correct' | 'accent_only' | 'wrong';

export function checkAnswer(input: string, answer: string, alternatives: string[] = []): AnswerResult {
  const normInput = normalise(input);
  const allAnswers = [answer, ...alternatives];
  const normAnswers = allAnswers.map(normalise);

  if (normAnswers.includes(normInput)) return 'correct';

  const stripped = stripAccents(normInput);
  if (normAnswers.map(stripAccents).includes(stripped)) return 'accent_only';

  return 'wrong';
}
