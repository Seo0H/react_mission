import { useEffect } from 'react';

import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { userBrowserLanguage, type Languages } from '@/constants/languages';
import { languageOptionContents } from '@/constants/languages';

/**
 * @param initialValue 초기 언어 값. 미제공될 경우 브라우저 설정 언어로 적용됨
 * @returns `lang` - 현재 설정된 언어
 * @returns `langParams` - 현재 설정된 언어를 query parameter에 적용 가능한 형식으로 제공. `lang=:lang` 형식
 * @returns `handleLanguageChange` - lang을 변환하는 핸들러
 *
 * @description 언어를 설정하는 커스텀 훅.마운팅 시, `initialValue` 또는 브라우저의 기본 언어 값을 사용해 자동으로
 * url 의 쿼리 파라미터 `lang` 설정 ( ex. example.com?lang=ko )
 */
export const useLanguage = (initialValue?: Languages) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams({ lang: initialValue ?? userBrowserLanguage });
  const lang = searchParams.get('lang');
  const langParams = searchParams.toString();

  useEffect(() => {
    navigate({ pathname: location.pathname, search: `?lang=${lang}` });
  }, [lang]);

  const handleLanguageChange = (lang: Languages) => {
    setSearchParams({ lang });
  };

  return { lang, langParams, handleLanguageChange };
};

export function isLanguageOptions(value: unknown): value is Languages {
  if (languageOptionContents.find((contents) => contents.value === value)) return true;
  return false;
}
