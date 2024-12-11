import React from 'react'

const CartWidget = () => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ fontSize: '2.5rem' }}>🛒</span>
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
        3
      </span>
    </div>
  )
}

export default CartWidget