import { createBrowserRouter } from 'react-router-dom';

import {
  CartPage,
  DripsPage,
  FavouritePage,
  GrainPage,
  MainPage,
  NewProductsPage,
  OrderPage,
  OtherPage,
  PopularPage,
  ProductPage,
  ProfilePage,
  RecomendationsPage,
} from '../pages';
import { App } from '../app/app';
import { Delivery, Payment, Ready } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <MainPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/favourites', element: <FavouritePage /> },
      { path: 'profile', element: <ProfilePage /> },
      {
        path: 'grain',
        element: (
          <GrainPage
            color="bg-systemOrange"
            nameCategory="Зерно"
            iconLink="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/coffee.svg"
          />
        ),
      },
      {
        path: 'dripPacks',
        element: (
          <DripsPage
            color="bg-systemBlue"
            nameCategory="Дрипы"
            iconLink="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/drips.svg"
          />
        ),
      },
      {
        path: 'other',
        element: (
          <OtherPage
            color="bg-systemGreen"
            nameCategory="Штуки"
            iconLink="https://s3.timeweb.cloud/87856c8c-be2455f8-6e00-42be-b141-b3450c1a9de4/icons/other.svg"
          />
        ),
      },
      {
        path: 'make-order',
        element: <OrderPage />,
        children: [
          { path: 'delivery', element: <Delivery /> },
          { path: 'payment', element: <Payment /> },
          { path: 'ready', element: <Ready /> },
        ],
      },
      {
        path: 'new-products',
        element: <NewProductsPage />,
      },
      {
        path: 'popular',
        element: <PopularPage />,
      },
      { path: 'recomendations', element: <RecomendationsPage /> },
      { path: 'products/:id', element: <ProductPage /> },
    ],
  },
]);
