import { RouteObject, redirect } from 'react-router-dom';

import { GlobalLayout } from '@/components/layout/layout';
import { loaders } from '@/routes/loaders';
import ErrorPage from '@/views/error';
import FormPage from '@/views/form';
import MainPage from '@/views/main';
import NoTargetPage from '@/views/no-target';
import ThanksPage from '@/views/thanks';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/question/:id',
        element: <FormPage />,
        loader: loaders.formLoader,
      },
      {
        path: '/no_target',
        element: <NoTargetPage />,
      },
      {
        path: '/thanks',
        element: <ThanksPage />,
      },
    ],
  },
];
