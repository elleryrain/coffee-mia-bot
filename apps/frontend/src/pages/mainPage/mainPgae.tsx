import { FC } from 'react';
import { CatrgoriesList, Popular, TopCarousel } from '../../components';

export const MainPage: FC = () => {
  return (
    <div>
      <TopCarousel />
      <CatrgoriesList />
      <Popular />
    </div>
  );
};
