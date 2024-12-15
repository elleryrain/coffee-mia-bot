import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { FC } from 'react';

export const TestPage: FC = () => {
  const { initData } = retrieveLaunchParams();

  return (
    <div>
      <p>{initData?.authDate.toLocaleDateString()}</p>
      <p>{initData?.user?.firstName}</p>
      <p>{initData?.user?.username}</p>
      <img src={initData?.user?.photoUrl} alt="" />
    </div>
  );
};
