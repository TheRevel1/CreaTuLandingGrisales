import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {
  const { cartItems } = useContext(CartContext)
  const totalItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <Link to="/carrito" style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ fontSize: '2.5rem' }}>🛒</span>
      {totalItems > 0 && (
        <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-10px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '0.2rem 0.5rem',
          fontSize: '0.8rem'
        }}>
          {totalItems}
        </span>
      )}
    </Link>
  )
}

export default CartWidget