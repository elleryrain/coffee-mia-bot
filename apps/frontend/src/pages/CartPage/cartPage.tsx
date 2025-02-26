import { FC } from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../../components';
import { Link } from 'react-router-dom';

export const CartPage: FC = () => {
  const cartState = useCartStore();

  return (
    <>
      <div
        className={`container flex justify-between items-center pt-2 pb-4 mb-4 `}
      >
        <h1 className="text-[24px] leading-[26.4px]">Корзина</h1>
        {cartState.totalPrice !== 0 && (
          <div className="text-[20px] leading-[22px] font-semibold py-2 px-4 bg-gray15 rounded-lg">
            {cartState.totalPrice} ₽
          </div>
        )}
      </div>
      <div className="container flex flex-col justify-center gap-3 min-h-[calc(100vh-135px)]">
        {cartState.products.length > 0 &&
          cartState.products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        {cartState.products.length === 0 && (
          <div className="p-6 rounded-[32px] bg-gray15 self-center flex items-center justify-center flex-col">
            <img
              className="h-[100px] w-[100px]"
              src="/cart-ic.svg"
              alt="cart"
            />
            <p className="text-[14px] leading-[16.8px]">Здесь пока пусто</p>
          </div>
        )}
        {cartState.totalPrice > 0 && (
          <Link
            to="/make-order/delivery"
            className="text-[16px] font-semibold leading-[17.6px] justify-center fixed bottom-[92px] flex w-[calc(100vw-20px)] left-[10px] bg-orange10 gap-2 py-4 px-8 rounded-xl shadow-light active:bg-orange60 active:border-systemOrange active:text-white"
          >
            <p>{cartState.totalPrice} ₽</p>
            <p>Заказать</p>
          </Link>
        )}
      </div>
    </>
  );
};
