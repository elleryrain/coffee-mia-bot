import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CartIC,
  CartICActive,
  FavouriteIC,
  FavouriteICActive,
  MainpageIC,
  MainpageICActive,
  ProfileIC,
  ProfileICActive,
} from './navIcons';

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <div className="h-[68px] w-full border-t border-[0.5px] border-gray40 flex items-center justify-center gap-8 fixed bottom-0 bg-gray15">
      <Link to="/" className="navItem">
        {location.pathname === '/' ? <MainpageICActive /> : <MainpageIC />}
      </Link>
      <Link to="cart" className="navItem">
        {location.pathname.includes('cart') ? <CartICActive /> : <CartIC />}
      </Link>
      <Link to="favourites" className="navItem">
        {location.pathname.includes('favourites') ? (
          <FavouriteICActive />
        ) : (
          <FavouriteIC />
        )}
      </Link>
      <Link to="profile" className="navItem">
        {location.pathname.includes('profile') ? (
          <ProfileICActive />
        ) : (
          <ProfileIC />
        )}
      </Link>
    </div>
  );
};
