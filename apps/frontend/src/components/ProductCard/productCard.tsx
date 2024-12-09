import { FC } from 'react';
import { Link } from 'react-router-dom';

export const ProductCard: FC<{
  product: {
    id: number;
    title: string;
    image: string;
    favorite: boolean;
    price?: number;
    discountPrice?: number;
  };
}> = ({ product }) => {
  return (
    <div className="mb-2 flex flex-col justify-between items-start">
      <Link
        to=""
        className={`productCard border-gray20 flex flex-col gap-3`}
        key={product.id}
      >
        <div className="productCardImg relative flex flex-col items-center justify-center overflow-hidden">
          <button>
            <img
              className="absolute top-2 right-2"
              src={`${product.favorite ? 'heart_active.svg' : 'heart.svg'}`}
              alt="like"
            />
          </button>
          <img
            className=""
            src={product.image.length === 0 ? 'empty_img.svg' : product.image}
            alt="coffee"
          />
        </div>
        <p className="mt-3 text-[16px] leading-[20.8px] font-normal w-[168px]">
          {product.title}
        </p>
      </Link>
      {product.price && (
        <div className="flex items-center gap-1 px-4 py-1 bg-gray20 mt-4 rounded-[20px] text-[16px] leading-6 font-medium">
          {product.discountPrice && (
            <p className="discount relative text-[11px] leading-[11px] text-systemOrange">
              {product.discountPrice}₽
            </p>
          )}
          <p className={`${product.discountPrice ? 'text-systemGreen' : ''}`}>
            {product.price}₽
          </p>
          <img src="/plus-icon-gray.svg" alt="add" />
        </div>
      )}
    </div>
  );
};
