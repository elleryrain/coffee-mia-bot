import { FC } from 'react';
import { CartProduct, useCartStore } from '../../store/cartStore';

export const CartItem: FC<{ product: CartProduct }> = ({ product }) => {
  const cartState = useCartStore();

  return (
    <div className="rounded-3xl border-gray20 border-1 p-4">
      <div className="flex gap-3 mb-4">
        <img
          src={`${product.image ? product.image : '/empty_img.svg'}`}
          alt="coffee"
          className="w-[116px] h-[116px] object-contain border-gray20 border-1 rounded-xl"
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] leading-[16.8px]">{product.name}</p>
            {product.description && (
              <p className="text-tetriaryBlack text-[14px] leading-[16.8px]">
                {product.description}
              </p>
            )}
            <p className="text-tetriaryBlack text-[14px] leading-[16.8px]">
              {product.quantity}
            </p>
          </div>
          <p className="text-[18px] leading-[19.8px] font-semibold">
            {product.price}₽
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <button className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center">
            <img
              src={`${
                product.isFavourite ? '/heart_active.svg' : '/heart.svg'
              }`}
              alt="like"
            />
          </button>
          <button
            onClick={() => {
              cartState.deleteProduct(product.id);
            }}
            className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center"
          >
            <img src="/trashbin-icon.svg" alt="delete" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center"
            onClick={() => {
              cartState.changeCount(product.id, -1);
            }}
          >
            <img src="/minus-icon.svg" alt="minus" />
          </button>
          <span className="w-8 h-8 rounded-lg bg-systemOrange text-[20px] leading-[22px] flex justify-center items-center">
            {product.count}
          </span>
          <button
            className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center"
            onClick={() => {
              cartState.changeCount(product.id, 1);
            }}
          >
            <img src="/plus-icon-gray.svg" alt="plus" />
          </button>
        </div>
      </div>
    </div>
  );
};
