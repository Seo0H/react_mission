import { RouteObject } from 'react-router-dom';

import { loaders } from '@/routes/loaders';
import ErrorPage from '@/views/error';
import FormPage from '@/views/form';
import MainPage from '@/views/main';
import NoTargetPage from '@/views/no-target';
import ThanksPage from '@/views/thanks';

export const routes: RouteObject[] = [
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
  },
];
