import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="overflow-y-auto h-[calc(100vh-68px)] scroll !px-0">
        <Outlet />
      </div>
      <NavBar />
    </QueryClientProvider>
  );
}
