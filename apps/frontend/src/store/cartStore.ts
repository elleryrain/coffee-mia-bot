import { create } from 'zustand';

export type CartProduct = {
  name: string;
  description?: string;
  quantity: string;
  count: number;
  image?: string;
  isFavourite: boolean;
  id: string;
  link_id?: string;
  price: number;
};

interface cartState {
  products: CartProduct[];
  totalPrice: number;
  changeCount: (productId: string, quantity: number) => void;
  addProduct: (product: CartProduct) => void;
  deleteProduct: (productId: string) => void;
}

export const useCartStore = create<cartState>()((set) => ({
  products: [],
  totalPrice: 0,
  changeCount(productId, quantity) {
    set((state) => ({
      ...state,
      products: state.products
        .map((p) => {
          if (p.id === productId) {
            return { ...p, count: p.count + quantity };
          } else {
            return p;
          }
        })
        .filter((p) => p.count > 0),
      totalPrice:
        state.totalPrice +
        state.products.find((e) => e.id === productId)!.price * quantity,
    }));
  },
  deleteProduct(productId) {
    set((state) => ({
      ...state,
      products: state.products.filter((p) => p.id !== productId),
      totalPrice:
        state.totalPrice -
        state.products.find((e) => e.id === productId)!.price *
          state.products.find((e) => e.id === productId)!.count,
    }));
  },
  addProduct(product) {
    if (this.products.find((p) => p.id === product.id)) {
      set((state) => ({
        ...state,
        products: state.products.map((e) => {
          if (e.id === product.id) {
            return { ...e, count: e.count + 1 };
          } else {
            return e;
          }
        }),
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      set((state) => ({
        ...state,
        products: [...state.products, product],
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
}));
