import { Suspense, lazy } from 'react';

import { Outlet, RouteObject, redirect } from 'react-router-dom';

import { GlobalLayout } from '@/components/layout/global';
import { LoadingSpinner } from '@/components/loading';
import { AuthProvider } from '@/hooks/use-auth/auth-context';
import { LanguageProvider } from '@/hooks/use-language/language-context';
import { AdminProvider } from '@/provider/admin/context';
import { loaders } from '@/routes/loaders';

const MainPage = lazy(() => import('@/views/main/index'));
const ErrorPage = lazy(() => import('@/views/error/index'));
const FormPage = lazy(() => import('@/views/form/index'));
const NoTargetPage = lazy(() => import('@/views/no-target/index'));
const ThanksPage = lazy(() => import('@/views/thanks/index'));
const LoginPage = lazy(() => import('@/views/login/index'));
const MyPage = lazy(() => import('@/views/mypage/index'));

const FormListPage = lazy(() => import('@/views/admin/form-list'));
const ModifyPage = lazy(() => import('@/views/admin/modify-form'));

const AdminHeader = lazy(() => import('@/components/admin/header'));

export const routes: RouteObject[] = [
  {
    element: (
      <LanguageProvider>
        <AuthProvider>
          <GlobalLayout>
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </GlobalLayout>
        </AuthProvider>
      </LanguageProvider>
    ),
    children: [
      {
        path: '/*',
        loader: () => redirect('/'),
      },
      {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'question/:id',
        element: <FormPage />,
        loader: loaders.formLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'no_target',
        element: <NoTargetPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'thanks',
        element: <ThanksPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'admin',
        element: (
          <AdminProvider>
            <AdminHeader />
            <Outlet />
          </AdminProvider>
        ),
        errorElement: <ErrorPage />,
        children: [
          { path: '', loader: () => redirect('/admin/form-list') },
          { path: 'form-list', element: <FormListPage /> },
          { path: 'modify-form/:id', element: <ModifyPage /> },
        ],
      },
    ],
  },
];
