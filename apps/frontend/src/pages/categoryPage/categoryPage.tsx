import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SubCategory } from '../../components';
import { productsList } from '../../mocks/mockSubCategories';

export const CategoryPage: FC<{
  nameCategory: string;
  iconLink: string;
  color: string;
  subCategoryId: string;
}> = ({ nameCategory, subCategoryId, iconLink, color }) => {
  return (
    <div className={`${color}`}>
      <Link to=".." className="ml-2 flex items-center gap-1 mb-7 pt-6">
        <img src="/arrow-left-white.svg" alt="back" />
        <p className="text-white text-[17px] leading-[20.29px] font-normal">
          Назад
        </p>
      </Link>
      <div className="flex gap-3 ml-5 pb-8">
        <img src={iconLink} alt={nameCategory} />
        <h1 className="text-white text-[33px] leading-[36px] font-semibold">
          {nameCategory}
        </h1>
      </div>
      <div className="flex flex-col gap-6 bg-transparent">
        {productsList[subCategoryId].map((category) => (
          <SubCategory
            title={category.nameCategory}
            description={category.description}
            products={category.items}
          />
        ))}
      </div>
    </div>
  );
};
