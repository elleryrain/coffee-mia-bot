import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '../pages';
import { App } from '../app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{path: '', element: <MainPage/>},{ path: '/cart' }, { path: '/favourites' }, { path: 'profile' }],
  },
]);
