import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { TitleSubtitleButtonLayout } from '@/components/layout/hading-sub-button';
import { HomeLink } from '@/components/link/home-link';
import { useLanguageContext } from '@/hooks/use-language/language-context';
import * as Contents from '@/views/error/constants';

const ErrorPage = () => {
  const { lang } = useLanguageContext();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <TitleSubtitleButtonLayout
        heading={Contents.header[lang]}
        sub={[`status: ${error.status} | ${error.data}`]}
        button={<HomeLink />}
      />
    );
  }

  throw error;
};

export default ErrorPage;
