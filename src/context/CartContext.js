import React, { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const agregarAlCarrito = (producto) => {
    const itemExistente = cartItems.find(item => item.id === producto.id)
    if (itemExistente) {
      setCartItems(cartItems.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ))
    } else {
      setCartItems([...cartItems, { ...producto, cantidad: 1 }])
    }
  }

  const quitarDelCarrito = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ cartItems, agregarAlCarrito, quitarDelCarrito }}>
      {children}
    </CartContext.Provider>
  )
}