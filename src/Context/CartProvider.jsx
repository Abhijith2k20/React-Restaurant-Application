import React, { createContext, useState } from 'react';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.idMeal === item.idMeal);

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.idMeal === item.idMeal
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );  
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (idMeal) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.idMeal !== idMeal));
  };

  const increaseQuantity = (idMeal) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.idMeal === idMeal ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (idMeal) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.idMeal === idMeal ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};