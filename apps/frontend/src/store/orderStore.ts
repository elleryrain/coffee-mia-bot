import { create } from 'zustand';

export interface courierDelivery {
  first_name: string;
  telegram_nickname: string;
  phone: string;
  address: string;
  date: string;
  time: string;
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
  deliveryInfo: courierDelivery | cdekDelivery;
  havePayed: boolean;
  paymentStatus: string;
  setDeliveryInfo: (info: courierDelivery | cdekDelivery) => void;
}

export const useOrderStore = create<orderState>()((set) => ({
  step: 1,
  deliveryInfo: {
    first_name: '',
    telegram_nickname: '',
    phone: '',
    address: '',
    date: '',
    time: '',
  },
  havePayed: false,
  paymentStatus: 'checking',
  setDeliveryInfo: (info: courierDelivery | cdekDelivery) => set(() => ({
    deliveryInfo: info,
  })),
}));
