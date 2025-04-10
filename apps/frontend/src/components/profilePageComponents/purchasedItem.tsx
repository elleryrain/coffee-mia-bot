import { FC, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useGetApiUserOrder } from '../../api/generated/users/default';
import { GetApiUserOrder200Item } from '../../api/generated/users/model';

export type PurchasedProduct = {
  name: string;
  description?: string;
  quantity: string;
  image?: string;
  id: string;
  link_id?: string;
  price: number;
};

export const PurchasedItem: FC<{ item: GetApiUserOrder200Item }> = ({
  item,
}) => {
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
            {item.grindingType && (
              <p className="text-tetriaryBlack text-[14px] leading-[16.8px]">
                {item.grindingType}
              </p>
            )}
            <p className="text-tetriaryBlack text-[14px] leading-[16.8px]">
              {(item?.weight ?? 0) >= 1000
                ? (item?.weight ?? 0) / 1000
                : item.weight}{' '}
              {(item.weight ?? 0) >= 1000 ? 'кг' : 'г'}
            </p>
          </div>
          <p className="text-[18px] leading-[19.8px] font-semibold">
            {item.cost}₽
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          cartStore.addProduct({
            name: item.name ?? '',
            description: item.grindingType ?? '',
            quantity:
              (item?.weight ?? 0) >= 1000
                ? (item?.weight ?? 0) / 1000 + ' кг'
                : item.weight + ' г',
            image: item.image ?? '',
            id: `${item.id}_${item.idItemVar}_${item.idGrindingType}`,
            link_id: item.id?.toString() ?? '',
            price: item.cost ?? 0,
            count: 1,
          });
          setText('Добавлено в корзину');
        }}
        className="update-button font-semibold !mb-0"
      >
        {text}
      </button>
    </div>
  );
};
