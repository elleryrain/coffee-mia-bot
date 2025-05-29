import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { ShortItem, ShortItemWithCost } from '../../api/generated/users/model';
import {
  useAddFavoriteItem,
  useRemoveFavoriteItem,
} from '../../api/generated/users/default';
import { RefetchOptions } from '@tanstack/react-query';

export const ProductCard: FC<{
  product: ShortItem | ShortItemWithCost;
  refechFn: (options?: RefetchOptions) => Promise<unknown>;
}> = ({ product, refechFn }) => {
  const cartState = useCartStore();

  const addToFavourite = useAddFavoriteItem();
  const deleteFromFavourite = useRemoveFavoriteItem();

  return (
    <div className="mb-2 flex flex-col justify-between items-start w-[calc((100%-24px)/2)]">
      <div className="relative max-w-[150px]">
        <button
          className="absolute top-2 right-2 z-20"
          onClick={async () => {
            if (product.favorite) {
              await deleteFromFavourite.mutateAsync({
                data: { itemId: product.id },
              });
              refechFn();
            } else {
              await addToFavourite.mutateAsync({
                data: { itemId: product.id },
              });
              refechFn();
            }
          }}
        >
          <img
            // className="absolute top-2 right-2"
            src={`${product.favorite ? 'heart_active.svg' : 'heart.svg'}`}
            alt="like"
          />
        </button>
        <Link
          to={`/products/${product.id}`}
          className={`productCard border-gray20 flex flex-col gap-3`}
        >
          <div className="productCardImg relative flex flex-col items-center justify-center overflow-hidden">
            <img
              className=""
              src={
                product.image !== null && product.image.length > 1
                  ? product.image
                  : '/empty_img.svg'
              }
              alt="coffee"
            />
          </div>
          <p className="text-[16px] leading-[20.8px] font-normal w-[168px]">
            {product.title}
          </p>
        </Link>
      </div>
      {'cost' in product && (
        <button
          onClick={() => {
            cartState.addProduct({
              name: product.title,
              quantity: '',
              count: 1,
              image: product.image ?? undefined,
              id: String(product.id),
              price: product.discountCost ? product.discountCost : product.cost,
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
