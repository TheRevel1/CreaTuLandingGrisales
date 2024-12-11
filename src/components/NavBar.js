import React from 'react'
import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <nav style={{ alignItems: 'center' , display: 'flex', justifyContent: 'space-around', padding: '1rem', background: '#272a2a', color: 'white'}}>
      <h1>Vicious Library</h1>
      <div>
        <a href="#productos" style={{ margin: '0 1rem' , color: 'white' }}>Catálogo</a>
        <a href="#contacto" style={{ margin: '0 1rem' , color: 'white' }}>Carrito</a>
      </div>
      <CartWidget />
    </nav>
  )
}

export default NavBar