import { DateValue, TimeInputValue } from '@nextui-org/react';
import { create } from 'zustand';
import { getLocalTimeZone, today } from '@internationalized/date';

const date = today(getLocalTimeZone());

export interface courierDelivery {
  first_name: string;
  telegram_nickname: string;
  phone: string;
  address: string;
  date: DateValue | null | undefined;
  time: TimeInputValue | null;
  comment?: string;
}

export interface cdekDelivery {
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  cdek_adress: string;
}

interface orderState {
  step: 1 | 2 | 3;
  cdekDeliveryInfo: cdekDelivery;
  courierDeliveryInfo: courierDelivery;
  deliveyType: 'CDEK' | 'courier' | null;
  paymentType: 'number' | 'juridical' | null;
  havePayed: boolean;
  paymentStatus: string;
  setDeliveryInfo: (info: courierDelivery | cdekDelivery) => void;
  setStep: (step: 1 | 2 | 3) => void;
  setDeliveryType: (type: 'CDEK' | 'courier') => void;
  setPaymentType: (type: 'number' | 'juridical') => void;
  clearAll: () => void;
}

export const useOrderStore = create<orderState>()((set) => ({
  step: 1,
  cdekDeliveryInfo: {
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    cdek_adress: '',
  },
  courierDeliveryInfo: {
    first_name: '',
    telegram_nickname: '',
    phone: '',
    address: '',
    date: date.set({ day: date.day + 1 }),
    time: null,
  },
  deliveyType: null,
  havePayed: false,
  paymentStatus: 'checking',
  paymentType: null,
  setDeliveryInfo: (info: courierDelivery | cdekDelivery) => {
    if ('last_name' in info) {
      set(() => ({
        cdekDeliveryInfo: info,
      }));
    } else {
      set(() => ({
        courierDeliveryInfo: info,
      }));
    }
  },
  setStep: (step: 1 | 2 | 3) => {
    set(() => ({
      step,
    }));
  },
  setDeliveryType: (type: 'CDEK' | 'courier') => {
    set(() => ({
      deliveyType: type,
    }));
  },
  setPaymentType: (type: 'number' | 'juridical') => {
    set(() => ({
      paymentType: type,
    }));
  },
  clearAll() {
    set(() => ({
      step: 1,
      cdekDeliveryInfo: {
        first_name: '',
        last_name: '',
        middle_name: '',
        phone: '',
        cdek_adress: '',
      },
      courierDeliveryInfo: {
        first_name: '',
        telegram_nickname: '',
        phone: '',
        address: '',
        date: null,
        time: null,
      },
      deliveyType: null,
      havePayed: false,
      paymentStatus: 'checking',
      paymentType: null,
    }));
  },
}));
