import { Outlet, useLocation } from 'react-router-dom';
import { NavBar } from '../components';
import { useGetApiUser } from '../api/generated/users/default';

export function App() {
  const {} = useGetApiUser();

  const location = useLocation();

  return (
    <>
      <div
        className={`overflow-y-auto ${
          location.pathname.includes('make-order')
            ? 'h-[100vh]'
            : 'h-[calc(100vh-68px)]'
        } scroll !px-0 flex flex-col`}
      >
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}
