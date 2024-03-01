import { TitleSubtitleButtonLayout } from '@/components/layout/hading-sub-button';
import { EnterableLink } from '@/components/link/enterable-link';
import { useLanguageContext } from '@/hooks/use-language/language-context';
import * as Contents from '@/views/main/constants';

import styles from './main.module.css';

const MainPage = () => {
  const { lang } = useLanguageContext();
  const url = `/question/common`;

  return (
    <TitleSubtitleButtonLayout
      heading={Contents.header[lang]}
      sub={Contents.subText[lang]}
      button={<EnterableLink url={url} className={styles['start-btn']} contents={Contents.link} />}
    />
  );
};

export default MainPage;
