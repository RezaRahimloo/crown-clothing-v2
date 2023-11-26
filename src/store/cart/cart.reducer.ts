import { AnyAction } from "redux";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: Boolean;
  readonly cartCount: number;
  readonly total: number;
};

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  total: 0,
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  return state;
};

// export const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         cartItems: payload,
//       };

//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };

//     default:
//       return state;
//   }
// };
