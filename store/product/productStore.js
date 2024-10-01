import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import storage from './productMmkv';

export const productStore = create(
  persist(
    (set, get) => ({
      products: [],
      setProducts: (products) => set({ products }),
      getProducts: () => get().products,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'product',
      storage: createJSONStorage(() => storage),
    }
  )
);
