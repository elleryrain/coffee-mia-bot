import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

export function App() {
  return (
    <>
      <div className="overflow-y-scroll h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}
