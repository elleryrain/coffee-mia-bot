import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartIC, FavouriteIC, MainpageIC, ProfileIC } from './navIcons';

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <div className="h-[68px] w-full border-t border-[0.5px] border-gray40 flex items-center justify-center gap-8 fixed bottom-0 bg-gray15">
      <Link
        to="/"
        className={`navItem ${location.pathname === '/' ? '' : 'mainPageIC'}`}
      >
        <MainpageIC />
      </Link>
      <Link
        to="cart"
        className={`navItem ${
          location.pathname.includes('cart') ? 'navItemActive' : ''
        }`}
      >
        <CartIC />
      </Link>
      <Link
        to="favourites"
        className={`navItem ${
          location.pathname.includes('favourites') ? 'navItemActive' : ''
        }`}
      >
        <FavouriteIC />
      </Link>
      <Link
        to="profile"
        className={`navItem ${
          location.pathname.includes('profile') ? 'navItemActive' : ''
        }`}
      >
        <ProfileIC />
      </Link>
    </div>
  );
};
