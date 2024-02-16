import { RouteObject } from 'react-router-dom';

import { loaders } from '@/routes/loaders';
import App from '@/views';
import ErrorPage from '@/views/error';
import NoTargetPage from '@/views/no-target';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader: loaders.mainPage,
    errorElement: <ErrorPage />,
  },
  {
    path: '/no_target',
    element: <NoTargetPage />,
    errorElement: <ErrorPage />,
  },
];
