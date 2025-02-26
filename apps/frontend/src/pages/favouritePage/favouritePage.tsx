import { FC } from 'react';
import { useGetFavoriteItems } from '../../api/generated/users/default';
import { ProductCard } from '../../components';

export const FavouritePage: FC = () => {
  const { data, refetch: refetchFn } = useGetFavoriteItems();

  return (
    <div>
      <div className="container ">
        <h1 className="text-[24px] leading-[26.4px] font-semibold pt-4 pb-4">
          Избранное
        </h1>
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      <div className="container pt-10 flex flex-wrap gap-6">
        {data?.map((item) => (
          <ProductCard product={item} refechFn={refetchFn} />
        ))}
      </div>
      {data?.length === 0 && (
        <div className="w-full h-full flex justify-center items-center min-h-[calc(100vh-166.4px)]">
          <div className="flex flex-col items-center p-6 bg-gray15 rounded-[32px]">
            <img src="/heart.svg" alt="empty" className="w-[100px] h-[100px]" />
            <p className="text-tetriaryBlack text-[14px] leading-[16.8px] font-normal">
              Здесь пока пусто
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
