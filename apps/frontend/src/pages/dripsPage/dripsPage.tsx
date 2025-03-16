import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubCategory } from '../../components';
import { useGetDripPacks } from '../../api/generated/users/default';

export const DripsPage: FC<{
  nameCategory: string;
  iconLink: string;
  color: string;
}> = ({ nameCategory, iconLink, color }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch: refetchFn } = useGetDripPacks();

  return (
    <div className={`${color}`}>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="ml-2 flex items-center gap-1 mb-7 pt-6"
      >
        <img src="/arrow-left-white.svg" alt="back" />
        <p className="text-white text-[17px] leading-[20.29px] font-normal">
          Назад
        </p>
      </button>
      <div className="flex gap-3 ml-5 pb-8">
        <img src={iconLink} alt={nameCategory} />
        <h1 className="text-white text-[33px] leading-[36px] font-semibold">
          {nameCategory}
        </h1>
      </div>
      <div className="flex flex-col gap-6 bg-transparent relative">
        {data &&
          data.map((category) => (
            <SubCategory
              refechFn={refetchFn}
              title={category.nameCategory}
              description={category.description}
              products={category.items}
            />
          ))}
        {data && data.length === 0 && (
          <p className="absolute left-4 bottom-[-35px] text-[18px] font-medium">
            Здесь пока пусто
          </p>
        )}
      </div>
    </div>
  );
};
