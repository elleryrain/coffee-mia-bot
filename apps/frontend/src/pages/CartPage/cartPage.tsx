import { FC } from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../../components';
import { Link } from 'react-router-dom';

export const CartPage: FC = () => {
  const cartState = useCartStore();

  return (
    <>
      <div className={`container flex justify-between items-center pt-2 pb-4 `}>
        <h1 className="text-[24px] leading-[26.4px] font-semibold">Корзина</h1>
        {cartState.totalPrice !== 0 && (
          <div className="text-[20px] leading-[22px] font-semibold py-2 px-4 bg-gray15 rounded-lg">
            {cartState.totalPrice} ₽
          </div>
        )}
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      {cartState.products.length > 0 && (
        <div className="container flex flex-col justify-center gap-3 min-h-[calc(100vh-135px)]">
          {cartState.products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}

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
      )}
      {cartState.products.length === 0 && (
        <div className="w-full flex justify-center items-center h-[calc(100vh-126.4px)] relative overflow-hidden">
          <div className="rounded-full bg-[rgba(255,246,241,1)] w-[535px] h-[535px] absolute flex items-center justify-center">
            <div className="flex flex-col w-[353px] h-[353px] items-center justify-center bg-[rgba(255,238,229,1)] rounded-full ">
              <img src="/cart_new.svg" alt="empty" className="w-[147px]" />
              <p className="text-[rgba(255,179,136,1)] w-[213px] text-[14px] leading-[16.8px] font-normal text-center mt-4">
                Покупайте кофе с доставкой, всего в несколько кликов
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
