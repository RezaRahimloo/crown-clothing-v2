import { createContext, useEffect, useState } from "react";

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

const getAllItemsCount = (cartItems) => {
  return cartItems.reduce((accumilator, currentValue) => {
    return accumilator + currentValue.quantity;
  }, 0);
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  isCartOpen: false,
  toggleCartOpen: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getAllItemsCount(cartItems));
  }, [cartItems]);

  const toggleCartOpen = () => {
    setIsCartOpen((prevState) => {
      return !prevState;
    });
  };

  const addItemToCart = (productToAdd) => {
    setCartItems((prevState) => {
      return addCartItem(prevState, productToAdd);
    });
  };

  const value = {
    isCartOpen,
    cartItems,
    toggleCartOpen,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
