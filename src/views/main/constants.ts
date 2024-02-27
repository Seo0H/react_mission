import type { LanguagesContents } from '@/hooks/use-language/type';

export const header: LanguagesContents = {
  ko: '설문 시작하기',
  en: 'Start the survey',
};

export const subText: LanguagesContents<string[]> = {
  ko: ['주류 설문조사'],
  en: ['alcohol survey'],
};

export const link: LanguagesContents = {
  ko: '시작하기',
  en: 'Start',
};
