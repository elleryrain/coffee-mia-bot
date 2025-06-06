import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { tabsStyle } from '../../next-ui-styles';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { useCreateUserOrder } from '../../api/generated/users/default';

export const Payment: FC = () => {
  const cartStore = useCartStore();
  const orderStore = useOrderStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 1000);
    }
  }, [isOpen]);

  const { mutateAsync } = useCreateUserOrder();

  return (
    <div className="container flex-grow flex flex-col">
      <Tabs classNames={tabsStyle}>
        <Tab
          key="number"
          title="По номеру"
          className="flex-grow flex flex-col justify-between"
        >
          <div className="border border-gray20 rounded-xl p-4">
            <p className="py-2 px-3 text-[22px] leading-[24.2px] bg-orange10 mb-6 rounded-lg">
              {cartStore.totalPrice + 0} ₽ {/*// добавление цены доставки */}
            </p>
            <div className="flex gap-2 items-center mb-3">
              <p className="px-3 py-2 bg-gray15 rounded-lg">
                +7 (906) 755-87-08
              </p>
              <Popover
                placement="bottom"
                isOpen={isOpen}
                onOpenChange={(e) => {
                  setIsOpen(e);
                  if (e) {
                    navigator.clipboard.writeText('+7(906)755-87-08');
                  }
                }}
              >
                <PopoverTrigger className="outline-none">
                  <button className="p-3 bg-gray15 rounded-lg">
                    <img src="/copy-ic.svg" alt="" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-gray15 rounded-md shadow-light text-[12px]
                "
                >
                  Номер скопирован
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3 items-start">
              <p className="px-3 py-2 bg-gray15 rounded-lg text-tetriaryBlack">
                Юрий Сергеевич К.
              </p>
              <div className="flex gap-2">
                <img className="bank_logo" src="/tbank.png" alt="t-bank" />
                <img className="bank_logo" src="/sber.png" alt="sber" />
                <img className="bank_logo" src="/ozon.png" alt="ozon-bank" />
                <img className="bank_logo" src="/alfa.png" alt="alfa" />
                <img className="bank_logo" src="/raif.png" alt="raif" />
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              await mutateAsync({
                data: {
                  items: cartStore.products.map((e) => {
                    return {
                      itemId: Number(e.id.split('_')[0]),
                      itemVarId: Number(e.id.split('_')[1]),
                      grindingTypeId: Number(e.id.split('_')[2]),
                      count: e.count,
                    };
                  }),
                  cdekDelivery:
                    orderStore.deliveyType === 'CDEK'
                      ? orderStore.cdekDeliveryInfo
                      : undefined,
                  courierDelivery:
                    orderStore.deliveyType === 'courier'
                      ? {
                          ...orderStore.courierDeliveryInfo,
                          date: orderStore.courierDeliveryInfo.date?.toString(),
                          time: orderStore.courierDeliveryInfo.time?.toString(),
                        }
                      : undefined,
                  typeDelivery: orderStore.deliveyType ?? 'courier',
                  typePayment: 'sbp',
                },
              });
              cartStore.clear();
              orderStore.setPaymentType('number');
              orderStore.setStep(3);
              navigate('../ready');
            }}
            className={`w-full bg-orange10 border-[rgba(255,230,208,1)] border text-primaryBlack flex items-center
                          justify-center py-4 mt-8 mb-8 font-semibold text-[16px] leading-[17.6px] rounded-xl shadow-light
                          active:bg-orange60 active:border-systemOrange active:text-white`}
          >
            Я оплатил
          </button>
        </Tab>
        <Tab
          key="juridical"
          title="Для юр.лиц"
          className="flex-grow flex flex-col justify-between gap-4"
        >
          <div className="flex flex-col items-center mt-12">
            <img src="/orange-doc-ic.svg" alt="documents" />
            <p className="text-[16px] leading-[19.2px] text-tetriaryBlack text-center w-[232px]">
              Если вы юр.лицо мы можем отправить вам накладную для оплаты
            </p>
          </div>
          <button
            onClick={async () => {
              await mutateAsync({
                data: {
                  items: cartStore.products.map((e) => {
                    return {
                      itemId: Number(e.id.split('_')[0]),
                      itemVarId: Number(e.id.split('_')[1]),
                      grindingTypeId: Number(e.id.split('_')[2]),
                      count: e.count,
                    };
                  }),
                  cdekDelivery:
                    orderStore.deliveyType === 'CDEK'
                      ? orderStore.cdekDeliveryInfo
                      : undefined,
                  courierDelivery:
                    orderStore.deliveyType === 'courier'
                      ? {
                          ...orderStore.courierDeliveryInfo,
                          date: orderStore.courierDeliveryInfo.date?.toString(),
                          time: orderStore.courierDeliveryInfo.time?.toString(),
                        }
                      : undefined,
                  typeDelivery: orderStore.deliveyType ?? 'courier',
                  typePayment: 'invoice',
                },
              });
              cartStore.clear();
              orderStore.setPaymentType('juridical');
              orderStore.setStep(3);
              navigate('../ready');
            }}
            className={`w-full bg-orange10 border-[rgba(255,230,208,1)] border text-primaryBlack flex items-center
                      justify-center py-4 mt-8 mb-8 font-semibold text-[16px] leading-[17.6px] rounded-xl shadow-light
                      active:bg-orange60 active:border-systemOrange active:text-white`}
          >
            Выслать накладную
          </button>
        </Tab>
      </Tabs>
    </div>
  );
};
