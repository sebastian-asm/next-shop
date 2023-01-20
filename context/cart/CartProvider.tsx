import { useReducer, useEffect } from 'react';

import Cookies from 'js-cookie';

import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
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
  isLoaded: false,
  shippingAddress: undefined,
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // obteniendo datos de las cookies
  useEffect(() => {
    try {
      const cartCookie = Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart')!)
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
      Cookies.set('cart', JSON.stringify(state.cart));
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

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        zipcode: Cookies.get('zipcode') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };

      dispatch({
        type: '[Cart] - Load address from cookies',
        payload: shippingAddress,
      });
    }
  }, []);

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

  const updateAddress = (data: ShippingAddress) => {
    Cookies.set('firstName', data.firstName);
    Cookies.set('lastName', data.lastName);
    Cookies.set('address', data.address);
    Cookies.set('zipcode', data.zipcode);
    Cookies.set('city', data.city);
    Cookies.set('country', data.country);
    Cookies.set('phone', data.phone);

    dispatch({
      type: '[Cart] - Update address from cookies',
      payload: data,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
