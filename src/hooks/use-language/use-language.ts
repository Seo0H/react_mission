import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

import { languageOptionContents } from '@/components/lang/constants';
import { userBrowserLanguage } from '@/hooks/use-language/constants';

import type { Languages } from '@/hooks/use-language/type';

/**
 * @param initialValue 초기 언어 값. 미제공될 경우 브라우저 설정 언어로 적용
 * @returns `lang` - 현재 설정된 언어
 * @returns `langParams` - 현재 설정된 언어를 query parameter에 적용 가능한 형식으로 제공. `lang=:lang` 형식
 * @returns `handleLanguageChange` - lang을 변환하는 핸들러
 *
 * @description 언어를 설정하는 커스텀 훅.마운팅 시, `initialValue` 또는 브라우저의 기본 언어 값을 사용해 자동으로
 * url 의 쿼리 파라미터 `lang` 설정. ( ex. example.com?lang=ko ) `useNavigate`을 이용해 **초기 마운팅 시
 * url 을 강제로 수정**하기에 router에 설정된 loader가 있다면 해당 loader의 재호출이 발생함.
 * **따라서 사용 시 주의가 필요**.
 */
export const useLanguage = (initialValue?: Languages) => {
  const [searchParams, setSearchParams] = useSearchParams({ lang: initialValue ?? userBrowserLanguage });
  let lang = (searchParams.get('lang') ? searchParams.get('lang') : userBrowserLanguage) as Languages;
  let langParams = searchParams.toString();

  const handleLanguageChange = useCallback(
    (lang: Languages) => {
      setSearchParams({ lang });
    },
    [lang],
  );

  // Languages에 설정된 언어 이외의 언어일 경우 기본 언어는 영어 (en)
  if (!isLanguageOptions(lang)) {
    lang = 'en';
    langParams = `lang=en`;
  }

  return { lang, langParams, handleLanguageChange };
};

export type UseLanguageReturn = ReturnType<typeof useLanguage>;

export function isLanguageOptions(value: unknown): value is Languages {
  if (languageOptionContents.find((contents) => contents.value === value)) return true;
  return false;
}
