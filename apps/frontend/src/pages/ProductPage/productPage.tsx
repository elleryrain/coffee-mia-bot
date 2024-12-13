import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../mocks/mockProducts';
import { useCartStore } from '../../store/cartStore';

export const ProductPage: FC = () => {
  const params = useParams<{ id: string }>();
  const data = products[Number(params.id)];

  const cartStore = useCartStore();

  return (
    <div>
      Product {params.id} Page
      <h1>{data.name}</h1>
      <button
        onClick={() => {
          cartStore.addProduct({ ...data, count: 1 });
        }}
      >
        add to cart
      </button>
    </div>
  );
};
