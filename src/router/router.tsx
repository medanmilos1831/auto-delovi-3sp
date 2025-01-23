import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../components';
import { HomePage, CategoryPage, ProductPage, AboutPage } from '../pages';

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
          path: `/:category`,
          element: <CategoryPage />,
        },
        {
          path: `/:category/:product`,
          element: <ProductPage />,
        },
        {
          path: '/o-nama',
          element: <AboutPage />,
        },
        // {
        //   path: `/:program/:category/:product`,
        //   element: <ProductPage />,
        // },
      ],
    },
    {
      path: '*',
      element: <>nema</>,
    },
  ],
  {
    basename: '/auto-delovi-3sp/',
  }
);
