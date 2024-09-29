// hooks/useUserStore.js
import { userStore } from '../store/user/userStore';

export const useUserStore = () => {
  return userStore();
};
