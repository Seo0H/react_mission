import type { LanguagesContents } from '@/hooks/use-language/type';

export const heading: LanguagesContents = {
  ko: '앗..',
  en: 'Oops..',
};

export const sub: LanguagesContents<string[]> = {
  ko: ['당신은 설문조사 타겟이 아닙니다.'],
  en: ['You are not a survey target.'],
};
