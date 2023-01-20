import { CartState, ShippingAddress } from './CartProvider';
import { ICartProduct } from '../../interfaces';

type CartActionType =
  | { type: '[Cart] - Load cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Add product'; payload: ICartProduct[] }
  | { type: '[Cart] - Update quantity'; payload: ICartProduct }
  | { type: '[Cart] - Remove product'; payload: ICartProduct }
  | { type: '[Cart] - Load address from cookies'; payload: ShippingAddress }
  | { type: '[Cart] - Update address from cookies'; payload: ShippingAddress }
  | {
      type: '[Cart] - Update order summary';
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart':
      return {
        ...state,
        isLoaded: true,
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
    case '[Cart] - Remove product':
      return {
        ...state,
        cart: state.cart.filter(
          // si es false se elimina de la lista
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      };
    case '[Cart] - Load address from cookies':
    case '[Cart] - Update address from cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
