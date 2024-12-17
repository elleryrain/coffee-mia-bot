import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { ShortItem, ShortItemWithCost } from '../../api/generated/users/model';

export const ProductCard: FC<{
  product: ShortItem | ShortItemWithCost;
}> = ({ product }) => {
  const cartState = useCartStore();

  return (
    <div className="mb-2 flex flex-col justify-between items-start w-[calc((100%-24px)/2)]">
      <Link
        to={`/products/${product.id}`}
        className={`productCard border-gray20 flex flex-col gap-3`}
        key={product.id}
      >
        <div className="productCardImg relative flex flex-col items-center justify-center overflow-hidden">
          <button>
            <img
              className="absolute top-2 right-2"
              src={`${product.favorite ? '/heart_active.svg' : 'heart.svg'}`}
              alt="like"
            />
          </button>
          <img
            className=""
            src={product.image === null ? '/empty_img.svg' : product.image}
            alt="coffee"
          />
        </div>
        <p className="mt-3 text-[16px] leading-[20.8px] font-normal w-[168px]">
          {product.title}
        </p>
      </Link>
      {'cost' in product && (
        <button
          onClick={() => {
            cartState.addProduct({
              name: product.title,
              quantity: '100г',
              count: 1,
              image: product.image ?? undefined,
              isFavourite: product.favorite,
              id: product.id,
              price: product.cost,
            });
          }}
          className="flex items-center gap-1 px-4 py-1 bg-gray20 mt-4 rounded-[20px] text-[16px] leading-6 font-medium"
        >
          {product.discountCost && (
            <p className="discount relative text-[11px] leading-[11px] text-systemOrange">
              {product.discountCost}₽
            </p>
          )}
          <p className={`${product.discountCost ? 'text-systemGreen' : ''}`}>
            {product.cost}₽
          </p>
          <img src="/plus-icon-gray.svg" alt="add" />
        </button>
      )}
    </div>
  );
};
