import {
  DateInput,
  Input,
  Tab,
  Tabs,
  Textarea,
  TimeInput,
} from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { FC, Ref, useEffect, useState } from 'react';
import { useIMask } from 'react-imask';
import { useOrderStore } from '../../store/orderStore';
import { useNavigate } from 'react-router-dom';
import { dateInputStyles, inputStyles, tabsStyle } from '../../next-ui-styles';
import { useGetUserInfo } from '../../api/generated/users/default';

export const Delivery: FC = () => {
  const navigate = useNavigate();

  const orderStore = useOrderStore();

  const { data: user } = useGetUserInfo();

  const { ref, value, setValue } = useIMask({ mask: '+{7}(900)000-00-00' });
  const {
    ref: ref2,
    value: value2,
    setValue: setValue2,
  } = useIMask({ mask: '+{7}(900)000-00-00' });
  const [cdekDisabled, setCdekDisabled] = useState(true);
  const [courierDisabled, setCourierDisabled] = useState(true);
  const [selected, setSelected] = useState('courier');

  const getMaxDate = () => {
    const date = today(getLocalTimeZone());
    if (date.month === 12) {
      return date.set({ month: 1, year: date.year + 1 });
    }
    return date.set({ month: date.month + 1 });
  };

  useEffect(() => {
    if (orderStore.courierDeliveryInfo.phone.length !== 0) {
      setValue2(orderStore.courierDeliveryInfo.phone);
    }
    if (orderStore.cdekDeliveryInfo.phone.length !== 0) {
      setValue(orderStore.cdekDeliveryInfo.phone);
    }
    if (orderStore.deliveyType !== null) {
      setSelected(orderStore.deliveyType);
    }
  }, []);

  useEffect(() => {
    orderStore.setDeliveryInfo({
      ...orderStore.cdekDeliveryInfo,
      phone: value,
    });
  }, [value]);

  useEffect(() => {
    orderStore.setDeliveryInfo({
      ...orderStore.courierDeliveryInfo,
      phone: value2,
    });
  }, [value2]);

  useEffect(() => {
    if (
      value.length === 16 &&
      orderStore.cdekDeliveryInfo.first_name.length > 0 &&
      orderStore.cdekDeliveryInfo.last_name.length > 0 &&
      orderStore.cdekDeliveryInfo.middle_name.length > 0 &&
      orderStore.cdekDeliveryInfo.cdek_adress.length > 0
    ) {
      setCdekDisabled(false);
    } else {
      setCdekDisabled(true);
    }
  }, [
    orderStore.cdekDeliveryInfo.cdek_adress.length,
    orderStore.cdekDeliveryInfo.first_name.length,
    orderStore.cdekDeliveryInfo.last_name.length,
    orderStore.cdekDeliveryInfo.middle_name.length,
    value,
  ]);

  useEffect(() => {
    if (
      orderStore.courierDeliveryInfo.first_name.length > 0 &&
      orderStore.courierDeliveryInfo.telegram_nickname.length > 0 &&
      orderStore.courierDeliveryInfo.phone.length === 16 &&
      orderStore.courierDeliveryInfo.address.length > 0 &&
      orderStore.courierDeliveryInfo.date !== null &&
      orderStore.courierDeliveryInfo.time !== null
    ) {
      setCourierDisabled(false);
    } else {
      setCourierDisabled(true);
    }
  }, [
    orderStore.courierDeliveryInfo.address.length,
    orderStore.courierDeliveryInfo.date,
    orderStore.courierDeliveryInfo.first_name.length,
    orderStore.courierDeliveryInfo.phone.length,
    orderStore.courierDeliveryInfo.telegram_nickname.length,
    orderStore.courierDeliveryInfo.time,
  ]);

  useEffect(() => {
    // if (user?.phone) {
    //   setValue(user.phone);
    // }
    if (user) {
      orderStore.setDeliveryInfo({
        ...orderStore.courierDeliveryInfo,
        telegram_nickname: user.username,
        first_name: user.firstName,
      });
      orderStore.setDeliveryInfo({
        ...orderStore.cdekDeliveryInfo,
        first_name: user.firstName,
        last_name: user.lastName,
      });
    }
  }, [user]);

  return (
    <div className="container">
      <Tabs
        classNames={tabsStyle}
        onSelectionChange={(e) => setSelected(e as string)}
        selectedKey={selected}
      >
        <Tab key="courier" title="Курьер">
          <div className="pt-1">
            <p className="flex items-center gap-1 text-secondaryBlack text-[14px] leading-[16.8px] font-normal px-3 py-2 border border-gray20 rounded-lg mb-12">
              <img src="/info.svg" alt="" />
              Доставка курьером только по Москве
            </p>
            <Input
              classNames={inputStyles}
              value={orderStore.courierDeliveryInfo.first_name}
              onChange={(e) =>
                orderStore.setDeliveryInfo({
                  ...orderStore.courierDeliveryInfo,
                  first_name: e.target.value,
                })
              }
              labelPlacement="outside"
              label="Имя"
              placeholder="Введите имя"
            />
            <Input
              className="!mt-12"
              value={orderStore.courierDeliveryInfo.telegram_nickname}
              onChange={(e) =>
                orderStore.setDeliveryInfo({
                  ...orderStore.courierDeliveryInfo,
                  telegram_nickname: e.target.value,
                })
              }
              classNames={inputStyles}
              labelPlacement="outside"
              label="Никнейм в Telegram"
              placeholder="Введите никнейм"
            />
            <Input
              className="!mt-12"
              ref={ref2 as Ref<HTMLInputElement>}
              value={value2}
              onChange={(e) => {
                setValue2(e.target.value);
              }}
              classNames={inputStyles}
              labelPlacement="outside"
              label="Телефон"
              placeholder="+7"
              type="phone"
            />
            <Input
              className="!mt-12"
              value={orderStore.courierDeliveryInfo.address}
              onChange={(e) =>
                orderStore.setDeliveryInfo({
                  ...orderStore.courierDeliveryInfo,
                  address: e.target.value,
                })
              }
              classNames={inputStyles}
              labelPlacement="outside"
              label="Точный адрес доставки"
              placeholder="Введите адрес"
            />
            <div className="mt-6 flex gap-3">
              <DateInput
                classNames={dateInputStyles}
                label="Дата доставки"
                onChange={(e) => {
                  orderStore.setDeliveryInfo({
                    ...orderStore.courierDeliveryInfo,
                    date: e,
                  });
                }}
                value={orderStore.courierDeliveryInfo.date}
                labelPlacement="outside"
                minValue={today(getLocalTimeZone())}
                maxValue={getMaxDate()}
                errorMessage={(value) => {
                  if (value.validationDetails.rangeUnderflow) {
                    return 'Выберите дату не раньше сегодняшней';
                  } else if (value.validationDetails.rangeOverflow) {
                    return `Выберите дату не позже ${getMaxDate().toDate('+03:00').toLocaleDateString()}`;
                  } else {
                    return '';
                  }
                }}
              />
              <TimeInput
                classNames={dateInputStyles}
                label="Время доставки"
                labelPlacement="outside"
                value={orderStore.courierDeliveryInfo.time}
                onChange={(e) => {
                  orderStore.setDeliveryInfo({
                    ...orderStore.courierDeliveryInfo,
                    time: e,
                  });
                }}
              />
            </div>
            {/* {orderStore.courierDeliveryInfo.time?.toString()} */}
            {/* {orderStore.courierDeliveryInfo.date
              ?.toDate('+03:00')
              .toLocaleDateString()} */}
            <Textarea
              className="!mt-6"
              label="Комментарий"
              placeholder="Для дополнительной информации"
              labelPlacement="outside"
              classNames={inputStyles}
            />
            <p className="text-secondaryBlack text-[16px] leading-[20.8px] font-normal mt-6">
              Стоимость доставки:{' '}
              <span className="text-primaryBlack">500р</span>
            </p>

            <button
              onClick={() => {
                orderStore.setStep(2);
                orderStore.setDeliveryType('courier');
                navigate('/make-order/payment');
              }}
              disabled={courierDisabled}
              className={`w-full bg-orange10 border-[rgba(255,230,208,1)] border text-primaryBlack flex items-center
                          justify-center py-4 mt-8 mb-8 font-semibold text-[16px] leading-[17.6px] rounded-xl shadow-light 
                          disabled:shadow-none disabled:bg-gray20 disabled:text-gray50 disabled:border-gray15
                          active:bg-orange60 active:border-systemOrange active:text-white`}
            >
              Далее
            </button>
          </div>
        </Tab>
        <Tab key="CDEK" title="CDEK">
          <div className="pt-8">
            <Input
              classNames={inputStyles}
              value={orderStore.cdekDeliveryInfo.last_name}
              onChange={(e) =>
                orderStore.setDeliveryInfo({
                  ...orderStore.cdekDeliveryInfo,
                  last_name: e.target.value,
                })
              }
              labelPlacement="outside"
              label="Фамилия"
              placeholder="Введите фамилию"
            />
            <Input
              className="!mt-12"
              value={orderStore.cdekDeliveryInfo.first_name}
              onChange={(e) => {
                orderStore.setDeliveryInfo({
                  ...orderStore.cdekDeliveryInfo,
                  first_name: e.target.value,
                });
              }}
              classNames={inputStyles}
              labelPlacement="outside"
              label="Имя"
              placeholder="Введите имя"
            />
            <Input
              className="!mt-12"
              value={orderStore.cdekDeliveryInfo.middle_name}
              onChange={(e) => {
                orderStore.setDeliveryInfo({
                  ...orderStore.cdekDeliveryInfo,
                  middle_name: e.target.value,
                });
              }}
              classNames={inputStyles}
              labelPlacement="outside"
              label="Отчество"
              placeholder="Введите отчество"
            />
            <Input
              ref={ref as Ref<HTMLInputElement>}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="!mt-12"
              classNames={inputStyles}
              labelPlacement="outside"
              label="Телефон"
              placeholder="+7"
              type="phone"
            />
            <Input
              className="!mt-12"
              classNames={inputStyles}
              value={orderStore.cdekDeliveryInfo.cdek_adress}
              onChange={(e) => {
                orderStore.setDeliveryInfo({
                  ...orderStore.cdekDeliveryInfo,
                  cdek_adress: e.target.value,
                });
              }}
              labelPlacement="outside"
              label="Адрес отделения CDEK"
              placeholder="Введите адрес отделения CDEK"
              type="text"
            />
            <p className="text-secondaryBlack text-[16px] leading-[20.8px] font-normal mt-6">
              Стоимость CDEK: <span className="text-primaryBlack">500р</span>
            </p>
            <button
              onClick={() => {
                orderStore.setStep(2);
                orderStore.setDeliveryType('CDEK');
                navigate('/make-order/payment');
              }}
              disabled={cdekDisabled}
              className={`w-full bg-orange10 border-[rgba(255,230,208,1)] border text-primaryBlack flex items-center
                          justify-center py-4 mt-8 mb-8 font-semibold text-[16px] leading-[17.6px] rounded-xl shadow-light 
                          disabled:shadow-none disabled:bg-gray20 disabled:text-gray50 disabled:border-gray15`}
            >
              Далее
            </button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
