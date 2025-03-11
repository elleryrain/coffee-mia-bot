type PurchasedProduct = {
  name: string;
  description?: string;
  quantity: string;
  image?: string;
  id: string;
  link_id?: string;
  price: number;
};

export const purchased: PurchasedProduct[] = [
  {
    name: 'Кофе в зернах, Арабика',
    description: 'Для турки',
    quantity: '250 г',
    image: '/coffee1.jpg',
    id: '1',
    link_id: '',
    price: 500,
  },
  {
    name: 'Кофе в зернах, Арабика',
    description: 'Для турки',
    quantity: '250 г',
    image: '/coffee1.jpg',
    id: '1',
    link_id: '',
    price: 500,
  },
];
