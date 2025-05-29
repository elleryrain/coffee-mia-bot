import { FC } from 'react';
import { ProductCard } from '../../components';
import { useGetNewItems } from '../../api/generated/users/default';

export const NewProductsPage: FC = () => {
  const { data: items, refetch: refetchFn, isError } = useGetNewItems();

  return (
    <div>
      <div className="container ">
        <h1 className="text-[24px] leading-[26.4px] font-semibold pt-2 pb-4">
          Новинки
        </h1>
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      {items?.length !== 0 && (
        <div className="container pt-10 flex flex-wrap gap-6">
          {items?.map((item) => (
            <ProductCard key={item.id} refechFn={refetchFn} product={item} />
          ))}
        </div>
      )}
      {(items?.length === 0 || isError) && (
        <p className="relative left-4 top-[-25px] text-[18px] font-medium">
          Здесь пока пусто
        </p>
      )}
    </div>
  );
};
