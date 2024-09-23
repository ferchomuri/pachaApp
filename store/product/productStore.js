import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  setProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (product) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== product.id),
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  clearProducts: () => set({ products: [] }),
}));

export default useProductStore;
