import { FC } from 'react';
import { ProductCard } from '../../components';
import { useGetPopularItems } from '../../api/generated/users/default';
import { useNavigate } from 'react-router-dom';

export const PopularPage: FC = () => {
  const { data: items, refetch: refetchFn } = useGetPopularItems();

  const navigate = useNavigate();

  return (
    <div>
      <div className="container ">
        {/* <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-1 pt-3"
        >
          <img src="/arrow-left-black.svg" alt="back" />
          <p className="text-[17px] leading-[20.29px] font-normal">Назад</p>
        </button> */}
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
        <p className="relative left-4 top-[-25px] text-[18px] font-medium">
          Здесь пока пусто
        </p>
      )}
    </div>
  );
};
