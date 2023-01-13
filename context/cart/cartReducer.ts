import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] - Load cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Add product'; payload: ICartProduct };

export const cartReducer = (state: CartState, action: CartActionType) => {
  switch (action.type) {
    case '[Cart] - Load cart':
      return {
        ...state,
      };

    default:
      return state;
  }
};
