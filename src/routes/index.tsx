import { RouteObject, redirect } from 'react-router-dom';

import { loaders } from '@/routes/loaders';
import App from '@/views';
import ErrorPage from '@/views/error';
import NoTargetPage from '@/views/no-target';
import ThanksPage from '@/views/thanks';

export const routes: RouteObject[] = [
  {
    path: '/',
    loader: () => redirect('/question/common'),
    errorElement: <ErrorPage />,
  },
  {
    path: '/question/:id',
    element: <App />,
    loader: async ({ params }) => {
      if (!params.id) return new Response('params id is missing.', { status: 404 });
      return await loaders.mainPage(params?.id);
    },
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
