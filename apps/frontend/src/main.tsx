import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './base.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SDKProvider } from '@telegram-apps/sdk-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
// console.log(`[ENV]:`, import.meta.env);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
