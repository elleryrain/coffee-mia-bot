import { FC } from 'react';
import { useOrderStore } from '../../store/orderStore';
import { useNavigate } from 'react-router-dom';

export const Ready: FC = () => {
  const orderStore = useOrderStore();
  const navigate = useNavigate();

  return (
    <div className="container flex-grow flex flex-col justify-between">
      <div className="flex flex-col items-center mt-16">
        <img src="/clock-ic.svg" alt="clock" />
        <h1 className="text-[24px] leading-[26.4px] mt-4">
          {orderStore.paymentType === 'number' && 'Проверяем платеж'}
          {orderStore.paymentType === 'juridical' && 'Формируем накладную'}
        </h1>
        <p className="text-tetriaryBlack w-[232px] text-[16px] leading-[19.2px] mt-4 text-center">
          {orderStore.paymentType === 'number' &&
            'Пришлем вам уведомление, как все проверим'}
          {orderStore.paymentType === 'juridical' &&
            'Пришлем вам документы как только будет готово'}
        </p>
      </div>
      <button
        onClick={() => {
          orderStore.clearAll();
          navigate('/');
        }}
        className={`w-full bg-orange10 border-[rgba(255,230,208,1)] border text-primaryBlack flex items-center
                          justify-center py-4 mt-8 mb-8 font-semibold text-[16px] leading-[17.6px] rounded-xl shadow-light
                          active:bg-orange60 active:border-systemOrange active:text-white`}
      >
        Отлично
      </button>
    </div>
  );
};
