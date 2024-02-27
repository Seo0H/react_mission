import { Languages } from '@/hooks/use-language/type';

import type { Content } from '@/constants/type';

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
