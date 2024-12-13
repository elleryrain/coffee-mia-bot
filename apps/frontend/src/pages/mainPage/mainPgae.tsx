import { FC } from 'react';
import { CatrgoriesList, Popular, TopCarousel } from '../../components';
import { Link } from 'react-router-dom';

export const MainPage: FC = () => {
  return (
    <div>
      <Link to="test">test</Link>
      <TopCarousel />
      <CatrgoriesList />
      <Popular />
    </div>
  );
};
