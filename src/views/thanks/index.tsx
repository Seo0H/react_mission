import { TitleSubtitleButtonLayout } from '@/components/layout/hading-sub-button';
import { HomeLink } from '@/components/link/home-link';
import { useLanguageContext } from '@/hooks/use-language/language-context';

import * as Contents from './constants';

const ThanksPage = () => {
  const { lang } = useLanguageContext();
  return <TitleSubtitleButtonLayout heading={Contents.heading[lang]} sub={Contents.sub[lang]} button={<HomeLink />} />;
};

export default ThanksPage;
