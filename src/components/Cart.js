import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cartItems, quitarDelCarrito } = useContext(CartContext)

  if (cartItems.length === 0) {
    return <h2 style={{ color: 'white', textAlign: 'center' }}>El carrito está vacío.</h2>
  }

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Tu Carrito</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <p>{item.nombre} (x{item.cantidad}) - ${item.precio * item.cantidad}</p>
          <button 
            onClick={() => quitarDelCarrito(item.id)} 
            style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem' }}>
            Quitar
          </button>
        </div>
      ))}
      <h3 style={{ textAlign: 'right', marginTop: '1rem' }}>Total: ${total.toFixed(2)}</h3>

      <Link to="/checkout" style={{ 
        display: 'block', marginTop: '1rem', backgroundColor: 'green', 
        color: 'white', padding: '0.5rem', textAlign: 'center', textDecoration: 'none' }}>
        Ir a Checkout
      </Link>
    </div>
  )
}

export default Cart