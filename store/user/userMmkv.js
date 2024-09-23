import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'user-storage',
});

export const userStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
