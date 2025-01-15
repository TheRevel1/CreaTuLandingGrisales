import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const { cartItems, quitarDelCarrito } = useContext(CartContext)

  if (cartItems.length === 0) {
    return <h2 style={{ color: 'white', textAlign: 'center' }}>El carrito está vacío.</h2>
  }

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Tu Carrito</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <p>{item.nombre} (x{item.cantidad})</p>
          <button onClick={() => quitarDelCarrito(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem' }}>
            Quitar
          </button>
        </div>
      ))}
    </div>
  )
}

export default Cart