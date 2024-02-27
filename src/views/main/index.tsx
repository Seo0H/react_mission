import { Link } from '@/components/common/link';

import { useLanguage } from '@/hooks/use-language/use-language';
import { mainPageContents } from '@/views/main/constants';

const MainPage = () => {
  const { lang, langParams } = useLanguage();

  return (
    <>
      {mainPageContents[lang]}
      <Link to={`/question/common?${langParams}`}>Start</Link>
    </>
  );
};

export default MainPage;
