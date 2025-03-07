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
import { useCartStore } from '../../store/cartStore';

export const NavBar: FC = () => {
  const location = useLocation();

  const cartState = useCartStore();

  return (
    <div className={`${location.pathname.includes('make-order')?'hidden':''} h-[68px] w-full border-t border-[0.5px] border-gray40 flex items-center justify-center gap-8 fixed bottom-0 bg-gray15`}>
      <Link to="/" className="navItem">
        {location.pathname === '/' ? <MainpageICActive /> : <MainpageIC />}
      </Link>
      <Link to="cart" className="navItem relative">
        {location.pathname.includes('cart') ? <CartICActive /> : <CartIC />}
        {cartState.products.length > 0 && (
          <div className="absolute w-[11px] h-[11px] bg-systemRed rounded-full top-[-3px] right-[-3px]"></div>
        )}
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
