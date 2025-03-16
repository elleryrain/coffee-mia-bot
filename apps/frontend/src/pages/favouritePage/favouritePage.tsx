import { FC } from 'react';
import { useGetFavoriteItems } from '../../api/generated/users/default';
import { ProductCard } from '../../components';

export const FavouritePage: FC = () => {
  const { data, refetch: refetchFn } = useGetFavoriteItems();
  console.log(data);
  return (
    <div>
      <div className="container ">
        <h1 className="text-[24px] leading-[26.4px] font-semibold pt-2 pb-4">
          Избранное
        </h1>
      </div>
      <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 "></div>
      {data?.length !== 0 && (
        <div className="container pt-10 flex flex-wrap gap-6">
          {data?.map((item) => (
            <ProductCard product={item} refechFn={refetchFn} />
          ))}
        </div>
      )}
      {data?.length === 0 && (
        <div className="w-full flex justify-center items-center h-[calc(100vh-126.4px)] relative overflow-hidden">
          <div className="rounded-full bg-[rgba(255,246,241,1)] w-[535px] h-[535px] absolute flex items-center justify-center">
            <div className="flex flex-col w-[353px] h-[353px] items-center justify-center bg-[rgba(255,238,229,1)] rounded-full ">
              <img src="/heart_new.svg" alt="empty" className="w-[147px]" />
              <p className="text-[rgba(255,179,136,1)] w-[147px] text-[14px] leading-[16.8px] font-normal text-center mt-4">
                Добавьте сюда то, что вам по вкусу
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
