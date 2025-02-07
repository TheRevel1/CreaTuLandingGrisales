import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

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

  const vaciarCarrito = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  )
}