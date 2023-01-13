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

  const addProductToCart = (product: ICartProduct) => {
    // verificando si el product ya existe en el estado
    const productInCart = state.cart.some(({ _id }) => _id === product._id);
    if (!productInCart) {
      return dispatch({
        type: '[Cart] - Add product',
        payload: [...state.cart, product],
      });
    }

    // comprobando si el producto en cart existe pero con talla diferente
    const productInCartDifferentSize = state.cart.some(
      ({ _id, size }) => _id === product._id && size === product.size
    );
    if (!productInCartDifferentSize) {
      return dispatch({
        type: '[Cart] - Add product',
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: '[Cart] - Add product',
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
