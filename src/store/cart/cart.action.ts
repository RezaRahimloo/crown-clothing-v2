import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  if (!existingCartItem) {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  } else {
    return cartItems.map((item) => {
      if (item.id === existingCartItem.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  }
};

const removeItemFromCartHelper = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  const existingItem = cartItems.find((item) => item.id === productToRemove.id);

  if (!existingItem) {
    return cartItems;
  }
  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  itemToDelete: CartItem
): CartItem[] => {
  const existingItem = cartItems.find((item) => item.id === itemToDelete.id);
  if (existingItem) {
    return cartItems.filter((item) => item.id !== itemToDelete.id);
  }
  return cartItems;
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  Boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: Boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], poductToBeRemoved: CategoryItem) => {
  const newCartItems = removeItemFromCartHelper(cartItems, poductToBeRemoved);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemRoRemove: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemRoRemove);
  return setCartItems(newCartItems);
};
