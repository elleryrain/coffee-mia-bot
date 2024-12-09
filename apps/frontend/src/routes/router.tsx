import { createBrowserRouter } from 'react-router-dom';

import { CategoryPage, MainPage } from '../pages';
import { App } from '../app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <MainPage /> },
      { path: '/cart' },
      { path: '/favourites' },
      { path: 'profile' },
      {
        path: 'grain',
        element: (
          <CategoryPage
            color="bg-systemOrange"
            nameCategory="Зерно"
            iconLink="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/coffee.svg"
            subCategoryId="grainSubCategories"
          />
        ),
      },
      {
        path: 'dripPacks',
        element: (
          <CategoryPage
            color="bg-systemBlue"
            nameCategory="Дрипы"
            iconLink="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/drips.svg"
            subCategoryId="dripPacksSubCategories"
          />
        ),
      },
      {
        path: 'other',
        element: (
          <CategoryPage
            color="bg-systemGreen"
            nameCategory="Штуки"
            iconLink="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/other.svg"
            subCategoryId="otherSubCategories"
          />
        ),
      },
    ],
  },
]);
