import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] - Load cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Add product'; payload: ICartProduct[] }
  | { type: '[Cart] - Update quantity'; payload: ICartProduct };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart':
      return {
        ...state,
        cart: action.payload,
      };
    case '[Cart] - Add product':
      return {
        ...state,
        cart: [...action.payload],
      };
    case '[Cart] - Update quantity':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          // devolviendo el producto actualizado con la cantidad
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
