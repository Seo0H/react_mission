import { useEffect } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { languageOptionContents } from '@/components/lang/constants';
import { userBrowserLanguage } from '@/hooks/use-language/constants';

import type { Languages } from '@/hooks/use-language/type';

/**
 * @param initialValue 초기 언어 값. 미제공될 경우 브라우저 설정 언어로 적용됨
 * @returns `lang` - 현재 설정된 언어
 * @returns `langParams` - 현재 설정된 언어를 query parameter에 적용 가능한 형식으로 제공. `lang=:lang` 형식
 * @returns `handleLanguageChange` - lang을 변환하는 핸들러
 *
 * @description 언어를 설정하는 커스텀 훅.마운팅 시, `initialValue` 또는 브라우저의 기본 언어 값을 사용해 자동으로
 * url 의 쿼리 파라미터 `lang` 설정 ( ex. example.com?lang=ko ) `useNavigate`을 이용해 초기 마운팅 시 url 을
 * 강제로 수정하기에 router loader 의 재 트리거가 발생하기에 사용 시 주의가 필요함.
 */
export const useLanguage = (initialValue?: Languages) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({ lang: initialValue ?? userBrowserLanguage });
  let lang = (searchParams.get('lang') ? searchParams.get('lang') : userBrowserLanguage) as Languages; // TODO: Languages 에 설정된 언어 이외의 언어일 경우 예외 처리 필요
  let langParams = searchParams.toString();

  useEffect(() => {
    navigate({ pathname: location.pathname, search: `?lang=${lang}` });
  }, [lang]);

  const handleLanguageChange = (lang: Languages) => {
    setSearchParams({ lang });
  };

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
