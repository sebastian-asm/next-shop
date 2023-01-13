import { useReducer } from 'react';

import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces';

export interface CartState {
  cart: ICartProduct[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};
