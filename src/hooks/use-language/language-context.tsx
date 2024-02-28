import { createContext, useContext } from 'react';

import { UseLanguageReturn, useLanguage } from '@/hooks/use-language/use-language';

const LanguagesContext = createContext<UseLanguageReturn | null>(null);
/**
 * 전역 언어 설정 상태를 가져올 수 있는 커스텀 훅
 * useLanguage의 return 값과 동일한 값을 받을 수 있음
 */
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
