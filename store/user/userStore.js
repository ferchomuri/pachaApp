import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import storage from './userMmkv';

export const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      getUser: () => get().user,
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => storage),
    }
  )
);
