import { useReducer, useEffect } from 'react';

import Cookie from 'js-cookie';

import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // obteniendo datos de las cookies
  useEffect(() => {
    try {
      const cartCookie = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : [];

      dispatch({
        type: '[Cart] - Load cart',
        payload: cartCookie,
      });
    } catch {
      // en caso que la cookie haya sido manipulada o no se pueda parsear
      dispatch({
        type: '[Cart] - Load cart',
        payload: [],
      });
    }
  }, []);

  // guardando en las cookies
  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    // sumando todas las cantidades
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    // sumando todos los precios
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({
      type: '[Cart] - Update order summary',
      payload: orderSummary,
    });
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] - Update quantity',
      payload: product,
    });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] - Remove product',
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
