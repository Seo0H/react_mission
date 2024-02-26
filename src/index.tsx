import React from 'react';

import './style/global.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { GlobalLayout } from '@/components/layout/layout';
import { routes } from '@/routes';
import { setCssVariable } from '@/style/set-css-variable';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter(routes);

setCssVariable();

root.render(
  <React.StrictMode>
    <GlobalLayout>
      <RouterProvider router={router} />
    </GlobalLayout>
  </React.StrictMode>,
);
