import { useSearchParams } from 'react-router-dom';

import { Link } from '@/components/common/link';

import { LanguageSelector } from '@/components/lang/lang-selector';

const MainPage = () => {
  const [searchParams] = useSearchParams();
  return (
    <>
      설문 시작하기
      <Link to={`/question/common?${searchParams.toString()}`}>Start</Link>
      <LanguageSelector />
    </>
  );
};

export default MainPage;
