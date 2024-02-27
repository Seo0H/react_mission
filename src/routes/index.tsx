import { RouteObject } from 'react-router-dom';

import { GlobalLayout } from '@/components/layout/global/global-layout';
import { LanguageProvider } from '@/hooks/use-language/language-context';
import { loaders } from '@/routes/loaders';
import ErrorPage from '@/views/error';
import FormPage from '@/views/form';
import MainPage from '@/views/main';
import NoTargetPage from '@/views/no-target';
import ThanksPage from '@/views/thanks';

export const routes: RouteObject[] = [
  {
    element: (
      <LanguageProvider>
        <GlobalLayout />
      </LanguageProvider>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/question/:id',
        element: <FormPage />,
        loader: loaders.formLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/no_target',
        element: <NoTargetPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/thanks',
        element: <ThanksPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
