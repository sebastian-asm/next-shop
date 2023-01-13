import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] - Load cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Add product'; payload: ICartProduct[] };

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

    default:
      return state;
  }
};
