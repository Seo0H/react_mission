import type { Content } from '@/constants/type';

export type Languages = 'ko' | 'en';

export const userBrowserLanguage = navigator.language.split('-')[0] as Languages;

export const languageOptionContents: Content<Languages>[] = [
  {
    key: crypto.randomUUID(),
    value: 'ko',
    visual: '한국어',
  },
  {
    key: crypto.randomUUID(),
    value: 'en',
    visual: 'English',
  },
];
