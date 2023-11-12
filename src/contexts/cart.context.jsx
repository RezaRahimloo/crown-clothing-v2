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

const getAllItemsCount = (cartItems) => {
  return cartItems.reduce((accumilator, currentValue) => {
    return accumilator + currentValue.quantity;
  }, 0);
};

const getTotalPrice = (cartItems) => {
  return cartItems.reduce((accumilator, currentValue) => {
    return accumilator + currentValue.price * currentValue.quantity;
  }, 0);
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  isCartOpen: false,
  toggleCartOpen: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartCount(getAllItemsCount(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    setTotal(getTotalPrice(cartItems));
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

  const removeItemFromCart = (poductToBeRemoved) => {
    console.log("prr", poductToBeRemoved);
    setCartItems((prevState) => {
      return removeItemFromCartHelper(prevState, poductToBeRemoved);
    });
  };

  const clearItemFromCart = (cartItemRoRemove) => {
    setCartItems((prevState) => {
      return clearCartItem(prevState, cartItemRoRemove);
    });
  };

  const value = {
    isCartOpen,
    cartItems,
    toggleCartOpen,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
