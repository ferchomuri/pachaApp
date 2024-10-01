import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import storage from './categoryMmkv';

export const categoryStore = create(
  persist(
    (set, get) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      getCategories: () => get().categories,
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
      clearCategories: () => set({ categories: [] }),
    }),
    {
      name: 'category',
      storage: createJSONStorage(() => storage),
    }
  )
);
