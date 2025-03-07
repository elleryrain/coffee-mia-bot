import { FC, useState } from 'react';
import { useCartStore } from '../../store/cartStore';

export type PurchasedProduct = {
  name: string;
  description?: string;
  quantity: string;
  image?: string;
  id: string;
  link_id?: string;
  price: number;
};

export const PurchasedItem: FC<{ item: PurchasedProduct }> = ({ item }) => {
  const cartStore = useCartStore();

  const [text, setText] = useState('Добавить в корзину');

  return (
    <div className="max-w-[360px] w-full rounded-3xl border-gray20 border-1 p-4 flex flex-col gap-4">
      <div className="flex gap-3">
        <img
          src={`${item.image ? item.image : '/empty_img.svg'}`}
          alt="coffee"
          className="w-[116px] h-[116px] object-contain border-gray20 border-1 rounded-xl"
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] leading-[16.8px]">{item.name}</p>
            {item.description && (
              <p className="text-tetriaryBlack text-[14px] leading-[16.8px]">
                {item.description}
              </p>
            )}
            <p className="text-tetriaryBlack text-[14px] leading-[16.8px]">
              {item.quantity}
            </p>
          </div>
          <p className="text-[18px] leading-[19.8px] font-semibold">
            {item.price}₽
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          cartStore.addProduct({ ...item, count: 1 });
          setText('Добавлено в корзину');
        }}
        className="update-button font-semibold !mb-0"
      >
        {text}
      </button>
    </div>
  );
};
