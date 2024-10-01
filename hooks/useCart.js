import { useState } from 'react';
import { cartStore } from '../store/cart/cartStore';

const useCart = () => {
  const [cart, setCart] = useState(cartStore.getState().cart);

  cartStore.subscribe((cart) => {
    setCart(cart);
  });

  return {
    cart,
    setCart: cartStore.getState().setCart,
    getCart: cartStore.getState().getCart,
    addToCart: cartStore.getState().addToCart,
    removeFromCart: cartStore.getState().removeFromCart,
    clearCart: cartStore.getState().clearCart,
  };
};

export default useCart;
