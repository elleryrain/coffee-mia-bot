import { FC } from 'react';
import { Carousel } from '../Carousel/carousel';
import { items } from '../../mocks/mockItems';
import { Link } from 'react-router-dom';

export const Popular: FC = () => {
  return (
    <div className="ml-[calc((100vw-376px)/2)] mt-12 mb-10">
      <div className="flex justify-between mb-4 w-[calc(100vw-16px)] px-4">
        <h2 className="font-semibold text-[22px] leading-[24.2px]">
          Часто покупают
        </h2>
        <Link
          className="flex w-[140px] justify-between text-gray50 text-[17px] leading-[18.7px]"
          to="popular"
        >
          Смотреть все
          <img src="/arrow_right.svg" alt="arrow" />
        </Link>
      </div>
      <Carousel items={items} />
    </div>
  );
};
