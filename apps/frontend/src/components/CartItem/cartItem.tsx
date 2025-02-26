import { FC } from 'react';
import { CartProduct, useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import {
  useAddFavoriteItem,
  useGetFavoriteItems,
  useRemoveFavoriteItem,
} from '../../api/generated/users/default';

export const CartItem: FC<{ product: CartProduct }> = ({ product }) => {
  const cartState = useCartStore();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: favorites, refetch: refetchFn } = useGetFavoriteItems();

  const addToFavourite = useAddFavoriteItem();
  const deleteFromFavourite = useRemoveFavoriteItem();

  return (
    <div className="rounded-3xl border-gray20 border-1 p-4">
      <Link
        to={`/products/${product.link_id ? product.link_id : product.id}`}
        className="flex gap-3 mb-4"
      >
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
      </Link>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <button
            onClick={async () => {
              if (favorites?.find((e) => e.id === Number(product.link_id))) {
                await deleteFromFavourite.mutateAsync({
                  data: { itemId: Number(product.link_id) },
                });
                refetchFn();
              } else {
                await addToFavourite.mutateAsync({
                  data: { itemId: Number(product.link_id) },
                });
                refetchFn();
              }
            }}
            className={`w-8 h-8 rounded-lg ${'bg-gray20'} flex justify-center items-center active:bg-red10`}
          >
            <img
              src={`${
                favorites?.find((e) => e.id === Number(product.link_id))
                  ? '/heart_active.svg'
                  : '/heart-nobg.svg'
              }`}
              alt="like"
            />
          </button>
          <button
            onClick={onOpen}
            className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center active:bg-gray40"
          >
            <img src="/trashbin-icon.svg" alt="delete" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center active:bg-gray40"
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
            className="w-8 h-8 rounded-lg bg-gray20 flex justify-center items-center active:bg-gray40"
            onClick={() => {
              cartState.changeCount(product.id, 1);
            }}
          >
            <img src="/plus-icon-gray.svg" alt="plus" />
          </button>
        </div>
      </div>
      <Modal
        classNames={{
          base: 'w-[340px] rounded-3xl',
          wrapper: 'flex items-center justify-center',
          closeButton: 'hidden',
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
      >
        <ModalContent className="">
          {(onClose) => (
            <div className="p-8 flex flex-col gap-6">
              <p className="text-[20px] font-semibold leading-[22px]">
                Удалить товар из корзины?
              </p>
              <div className="flex gap-6">
                <button
                  className="py-4 px-8 rounded-xl shadow-light text-primaryBlack bg-orange10 border-[(255,230,208,1)] active:bg-orange60 active:border-systemOrange active:text-white"
                  onClick={onClose}
                >
                  Отмена
                </button>
                <button
                  className="py-4 px-8 rounded-xl shadow-light text-orange10 bg-systemRed border-red60 border-1 active:bg-red60 active:border-red60"
                  onClick={() => {
                    cartState.deleteProduct(product.id);
                    onClose();
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
