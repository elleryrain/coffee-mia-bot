import { FC } from 'react';
import { OrdersHistory, UserContacts, UserInfo } from '../../components';

export const ProfilePage: FC = () => {
  return (
    <div>
      <div className="container ">
        <h1 className="text-[24px] leading-[26.4px] font-semibold pt-4 pb-4">
          Профиль
        </h1>
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      <div className="container mt-4">
        <UserInfo />
        <UserContacts />
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 mt-2 mb-2"></div>
      <div className="container">
        <OrdersHistory />
      </div>
    </div>
  );
};
