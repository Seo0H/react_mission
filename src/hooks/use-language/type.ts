export type Languages = 'ko' | 'en';

export type LanguagesContents<Type extends string | string[] = string> = Record<Languages, Type>;
