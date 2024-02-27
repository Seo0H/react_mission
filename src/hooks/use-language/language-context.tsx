import { createContext, useContext } from 'react';

import { UseLanguageReturn, useLanguage } from '@/hooks/use-language/use-language';

const LanguagesContext = createContext<UseLanguageReturn | null>(null);

export const useLanguageContext = () => {
  const value = useContext(LanguagesContext);
  if (!value) throw new Error('useLanguageContext는 LanguageProvider 내부에서 사용되어야 합니다.');
  return value;
};

interface LanguageProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const LanguageProvider = (props: LanguageProviderProps) => {
  const { children } = props;
  const data = useLanguage();
  return <LanguagesContext.Provider value={data}>{children}</LanguagesContext.Provider>;
};
