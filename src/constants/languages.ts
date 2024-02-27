export type Languages = 'ko' | 'en';

export const userBrowserLanguage = navigator.language.split('-')[0] as Languages;

interface LanguageContents {
  key: string;
  value: Languages;
  content: string;
}

export const languageOptionContents: LanguageContents[] = [
  {
    key: crypto.randomUUID(),
    value: 'ko',
    content: '한국어',
  },
  {
    key: crypto.randomUUID(),
    value: 'en',
    content: 'English',
  },
];
