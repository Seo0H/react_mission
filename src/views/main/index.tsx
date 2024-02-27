import { Link } from '@/components/common/link';

import { LanguageSelector } from '@/components/lang/lang-selector';
import { useLanguage } from '@/hooks/use-language/use-language';

const MainPage = () => {
  const { langParams } = useLanguage();

  return (
    <>
      설문 시작하기
      <Link to={`/question/common?${langParams}`}>Start</Link>
      <LanguageSelector />
    </>
  );
};

export default MainPage;
