import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
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

const removeItemFromCartHelper = (cartItems, productToRemove) => {
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

const clearCartItem = (cartItems, itemToDelete) => {
  const existingItem = cartItems.find((item) => item.id === itemToDelete.id);
  if (existingItem) {
    return cartItems.filter((item) => item.id !== itemToDelete.id);
  }
};

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};

export const removeItemFromCart = (cartItems, poductToBeRemoved) => {
  const newCartItems = removeItemFromCartHelper(cartItems, poductToBeRemoved);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemRoRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemRoRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};
