import { createContext, useState } from "react";

export const CartContext = createContext({
  products: [],
  setProducts: () => {},
  isCartOpen: false,
  toggleCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setIsCartOpen((prevState) => {
      return !prevState;
    });
  };

  const value = {
    isCartOpen,
    products,
    toggleCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
