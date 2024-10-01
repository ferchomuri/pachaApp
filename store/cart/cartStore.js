import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import storage from './cartMmkv';

export const cartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (cart) => set({ cart }),
      getCart: () => get().cart,
      addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((product) => product.id !== productId) })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => storage),
    }
  )
);
