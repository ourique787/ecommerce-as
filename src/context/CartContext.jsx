import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (produto) => {
    setCartItems(prevItems => {
      const itemExiste = prevItems.find(item => item.id === produto.id);
      
      if (itemExiste) {
        return prevItems.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...produto, quantidade: 1 }];
    });
  };

  const removeFromCart = (produtoId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== produtoId));
  };

  const aumentarQuantidade = (produtoId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuirQuantidade = (produtoId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === produtoId && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const getQuantidadeNoCarrinho = (produtoId) => {
    const item = cartItems.find(item => item.id === produtoId);
    return item ? item.quantidade : 0;
  };

  const getTotalCarrinho = () => {
    return cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const getQuantidadeItens = () => {
    return cartItems.reduce((total, item) => total + item.quantidade, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        aumentarQuantidade,
        diminuirQuantidade,
        getQuantidadeNoCarrinho,
        getTotalCarrinho,
        getQuantidadeItens
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}