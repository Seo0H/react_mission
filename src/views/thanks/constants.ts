import type { LanguagesContents } from '@/hooks/use-language/type';

export const heading: LanguagesContents = {
  ko: '조사가 종료되었습니다.',
  en: 'The survey has ended.',
};

export const sub: LanguagesContents<string[]> = {
  ko: ['참여해 주셔서 감사합니다.'],
  en: ['Thank you for participating.'],
};
