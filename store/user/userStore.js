import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { userStorage } from './userMmkv';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: {
        name: null,
        lastName: null,
        email: null,
        phone: null,
        address: null,
        city: null,
        country: null,
        photo: null,
        type: null,
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
      getStorage: createJSONStorage(() => userStorage),
    }
  )
);

export default useUserStore;
