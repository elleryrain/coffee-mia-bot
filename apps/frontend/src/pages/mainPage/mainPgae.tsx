import { FC } from 'react';
import {
  Carousel,
  CatrgoriesList,
  Popular,
  TopCarousel,
} from '../../components';
import { useGetFavoriteItems } from '../../api/generated/users/default';
import { Link } from 'react-router-dom';

export const MainPage: FC = () => {
  const { data: favourite } = useGetFavoriteItems();

  return (
    <div>
      <TopCarousel />
      <CatrgoriesList />
      <Popular />
      {favourite && favourite.length > 0 && (
        <div className="ml-[calc((100vw-376px)/2)] mb-10">
          <div className="flex justify-between mb-4 w-[calc(100vw-16px)] px-4">
            <h2 className="font-semibold text-[22px] leading-[24.2px]">
              Избранное
            </h2>
            <Link
              className="flex w-[135px] justify-between font-light items-center text-gray50 text-[17px] leading-[18.7px]"
              to="favourites"
            >
              Смотреть все
              <img src="/arrow_right.svg" alt="arrow" />
            </Link>
          </div>
          <Carousel items={favourite} />
        </div>
      )}
    </div>
  );
};
