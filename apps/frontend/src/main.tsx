import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './base.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
// import { SDKProvider } from '@telegram-apps/sdk-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// console.log(`[ENV]:`, import.meta.env);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
