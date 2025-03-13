import { FC } from 'react';
import { ProductCard } from '../../components';
import { items as data } from '../../mocks/mockItems';

export const RecomendationsPage: FC = () => {


  return (
    <div>
      <div className="container ">
        <h1 className="text-[24px] leading-[26.4px] font-semibold pt-2 pb-4">
          Рекомендуем
        </h1>
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      {data?.length !== 0 && (
        <div className="container pt-10 flex flex-wrap gap-6">
          {data?.map((item) => (
            <ProductCard product={item} />
          ))}
        </div>
      )}
      {data?.length === 0 && (
        <p className="absolute left-4 bottom-[-35px] text-[18px] font-medium">
          Здесь пока пусто
        </p>
      )}
    </div>
  );
};
