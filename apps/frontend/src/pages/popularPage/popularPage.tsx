import { FC } from 'react';
import { ProductCard } from '../../components';
import { useGetPopularItems } from '../../api/generated/users/default';

export const PopularPage: FC = () => {

  const { data: items, refetch: refetchFn} = useGetPopularItems();

  return (
    <div>
      <div className="container ">
        <h1 className="text-[24px] leading-[26.4px] font-semibold pt-2 pb-4">
          Часто покупают
        </h1>
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      {items?.length !== 0 && (
        <div className="container pt-10 flex flex-wrap gap-6">
          {items?.map((item) => (
            <ProductCard refechFn={refetchFn} product={item} />
          ))}
        </div>
      )}
      {items?.length === 0 && (
        <p className="absolute left-4 bottom-[-35px] text-[18px] font-medium">
          Здесь пока пусто
        </p>
      )}
    </div>
  );
};
