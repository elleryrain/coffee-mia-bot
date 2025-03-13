import { FC } from 'react';
import {
  Avatar,
  Input,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { modalStyles } from '../../next-ui-styles';
import { purchased } from '../../mocks/mockPurchased';
import { PurchasedItem } from './purchasedItem';
import { useGetApiUserOrder } from '../../api/generated/users/default';

export const OrdersHistory: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: purchasedItems } = useGetApiUserOrder();

  return (
    <div>
      <div className="py-3 px-1 flex justify-between items-center">
        <div className="flex gap-3">
          <img src="/clock-ic-small.svg" alt="" />
          <p className="text-tetriaryBlack">Купленные товары</p>
        </div>
        <button onClick={onOpen}>
          <img src="/arrow_right.svg" alt="" />
        </button>
        <Modal classNames={modalStyles} isOpen={isOpen} onClose={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <div className="container">
                  <button
                    className="text-systemOrange flex items-center gap-1 my-3"
                    onClick={onClose}
                  >
                    <img src="/arrow-left.svg" alt="" />
                    Назад
                  </button>
                  <p className="text-[24px] leading-[26.4px] font-semibold mt-4 mb-4">
                    Купленные товары
                  </p>
                </div>
                <div className="w-[100vw] h-0 border-b-[0.5px] border-gray40 mt-2 mb-2"></div>
                <div className="container mt-6 flex flex-col gap-3">
                  {purchased.map((item, index) => (
                    <PurchasedItem item={item} key={index} />
                  ))}
                </div>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
