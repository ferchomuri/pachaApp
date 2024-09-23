import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cartStorage } from './cartMmkv';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      items: 0,
      addProduct: (product) =>
        set((state) => ({
          cart: [...state.cart, product],
          items: state.items + 1,
        })),
      removeProduct: (product) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== product.id),
          items: state.items - 1,
        })),
      clearCart: () => set({ cart: [], items: 0 }),
    }),
    {
      name: 'cart-storage',
      getStorage: createJSONStorage(() => cartStorage),
    }
  )
);

export default useCartStore;
