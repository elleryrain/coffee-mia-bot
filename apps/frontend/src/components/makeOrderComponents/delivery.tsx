import { Input, Tab, Tabs } from '@nextui-org/react';
import { FC, Ref } from 'react';
import { useIMask } from 'react-imask';
import { useOrderStore } from '../../store/orderStore';

export const Delivery: FC = () => {
  const orderStore = useOrderStore();

  const tabsStyle = {
    base: 'w-full mt-8 pb-2',
    tabList: 'w-full bg-gray20 p-[2px] rounded-[8px]',
    tab: 'bg-transparent text-[16px] leading-[19.09px] font-medium',
    cursor: '!bg-white shadow-none rounded-[6px]',
  };

  const inputStyles = {
    label: 'text-[16px] leading=[17.6px] font-semibold',
    inputWrapper: 'hover:!bg-gray20',
    innerWrapper: 'bg-gray20 pl-3 py-2',
  };

  const { ref, value, setValue } = useIMask({ mask: '+{7}(900)000-00-00' });

  return (
    <div className="container">
      <Tabs classNames={tabsStyle}>
        <Tab key="courier" title="Курьер">
          курьер
        </Tab>
        <Tab key="CDEK" title="CDEK">
          <div className="pt-8">
            <Input
              classNames={inputStyles}
              value={orderStore.deliveryInfo.first_name}
              onChange={(e) =>
                orderStore.setDeliveryInfo({
                  ...orderStore.deliveryInfo,
                  first_name: e.target.value,
                })
              }
              labelPlacement="outside"
              label="Фамилия"
              placeholder="Введите фамилию"
            />
            <Input
              className="!mt-12"
              classNames={inputStyles}
              labelPlacement="outside"
              label="Имя"
              placeholder="Введите имя"
            />
            <Input
              className="!mt-12"
              classNames={inputStyles}
              labelPlacement="outside"
              label="Отчество"
              placeholder="Введите отчество"
            />
            <Input
              ref={ref as Ref<HTMLInputElement>}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="!mt-12"
              classNames={inputStyles}
              labelPlacement="outside"
              label="Телефон"
              placeholder="Введите телефон"
              type="phone"
            />
            <Input
              ref={ref as Ref<HTMLInputElement>}
              className="!mt-12"
              classNames={inputStyles}
              labelPlacement="outside"
              label="Адрес отделения CDEK"
              placeholder="Введите адрес отделения CDEK"
              type="text"
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
