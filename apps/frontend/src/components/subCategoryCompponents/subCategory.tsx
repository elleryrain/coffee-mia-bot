import { FC } from 'react';
import { ProductCard } from '../ProductCard/productCard';
import { ShortItem, ShortItemWithCost } from '../../api/generated/users/model';

export const SubCategory: FC<{
  title?: string;
  description?: string;
  products?: ShortItem[] | ShortItemWithCost[];
}> = ({ products, title, description }) => {
  return (
    <div className="w-full bg-white rounded-2xl pb-8 last:rounded-b-none">
      <div className="container">
        <h2 className="text-[22px] leading-[24.2px] font-semibold pt-5">
          {title}
        </h2>
        {description && (
          <p className="text-[14px] leading-[16.8px] text-secondaryBlack mt-2 pb-2">
            {description}
          </p>
        )}
        <div className="flex flex-wrap gap-6 mt-6">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};
