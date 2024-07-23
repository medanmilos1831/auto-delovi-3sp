import { RootLayout } from '@/components';
import { SPA_ROUTES } from '@/constants';
import {
  AboutPage,
  CategoryPage,
  ContactPage,
  HomePage,
  ProductPage,
  ProgramPage,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import { ProgramiPage } from 'src/pages/ProgramiPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: SPA_ROUTES.ABOUT_PAGE,
          element: <AboutPage />,
        },
        {
          path: `${SPA_ROUTES.PROGRAMS_PAGE}/:program`,
          element: <ProgramPage />,
        },
        {
          path: `${SPA_ROUTES.PROGRAMS_PAGE}/:program/:category`,
          element: <CategoryPage />,
        },
        {
          path: `${SPA_ROUTES.PROGRAMS_PAGE}/:program/:category/:product`,
          element: <ProductPage />,
        },
      ],
    },
    {
      path: '*',
      element: <>nema</>,
    },
  ],
  {
    // basename: '/auto-delovi-3sp',
  }
);
