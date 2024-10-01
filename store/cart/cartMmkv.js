import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV({
  id: 'cart',
});

const storage = {
  setItem: (key, value) => {
    try {
      mmkv.set(key, value);
    } catch (error) {
      console.error(`Error setting item with key "${key}":`, error);
    }
  },
  getItem: (key) => {
    try {
      return mmkv.getString(key);
    } catch (error) {
      console.error(`Error getting item with key "${key}":`, error);
      return null;
    }
  },
  removeItem: (key) => {
    try {
      mmkv.delete(key);
    } catch (error) {
      console.error(`Error removing item with key "${key}":`, error);
    }
  },
};

export default storage;
