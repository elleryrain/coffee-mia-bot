import { FC } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

export const OrderPage: FC = () => {
  const location = useLocation();
  const orderStore = useOrderStore();
  const navigate = useNavigate();

  return (
    <>
      {orderStore.step !== 3 && (
        <Link to="/cart" className="ml-2 flex items-center gap-1 mb-3 py-3">
          <img src="/arrow-left-black.svg" alt="back" />
          <p
            className="text-[17px] leading-[20.29px] font-normal"
            onClick={() => navigate(-1)}
          >
            Назад
          </p>
        </Link>
      )}
      {orderStore.step === 3 && <div className="h-11"></div>}
      <div className="mt-2 gap-12 flex justify-center pb-2">
        <div className="flex flex-col items-center w-[57px]">
          <button
            onClick={() => {
              navigate('/make-order/delivery');
            }}
            disabled={orderStore.step === 3}
            className={`text-[24px] leading-[28.8px] w-[50px] h-[50px] rounded-full flex items-center justify-center mb-1 ${
              location.pathname.includes('delivery')
                ? 'bg-systemOrange text-white'
                : 'bg-gray20 text-gray70'
            }`}
          >
            1
          </button>
          <p
            className={`${
              location.pathname.includes('delivery')
                ? 'text-systemOrange'
                : 'text-gray50'
            }`}
          >
            Доставка
          </p>
        </div>
        <div className="flex flex-col items-center w-[57px]">
          <button
            onClick={() => {
              navigate('/make-order/payment');
            }}
            disabled={orderStore.step === 1 || orderStore.step === 3}
            className={`text-[24px] leading-[28.8px] w-[50px] h-[50px] rounded-full flex items-center justify-center mb-1 ${
              location.pathname.includes('payment')
                ? 'bg-systemOrange text-white'
                : 'bg-gray20 text-gray70'
            }`}
          >
            2
          </button>
          <p
            className={`${
              location.pathname.includes('payment')
                ? 'text-systemOrange'
                : 'text-gray50'
            }`}
          >
            Оплата
          </p>
        </div>
        <div className="flex flex-col items-center w-[57px]">
          <p
            className={`text-[24px] leading-[28.8px] w-[50px] h-[50px] rounded-full flex items-center justify-center mb-1 ${
              location.pathname.includes('ready')
                ? 'bg-systemOrange text-white'
                : 'bg-gray20 text-gray70'
            }`}
          >
            3
          </p>
          <p
            className={`${
              location.pathname.includes('ready')
                ? 'text-systemOrange'
                : 'text-gray50'
            }`}
          >
            Готово
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
};
