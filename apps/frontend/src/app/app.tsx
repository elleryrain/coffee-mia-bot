import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

export function App() {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
}
