import type { Languages } from '@/hooks/use-language/type';

export const userBrowserLanguage = navigator.language.split('-')[0] as Languages;
