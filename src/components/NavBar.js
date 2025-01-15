import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <nav style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '1rem',
      background: '#272a2a',
      color: 'white'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <h1>Vicious Library</h1>
      </Link>
      <div>
        <Link to="/" style={{ margin: '0 1rem', color: 'white' }}>Catálogo</Link>
        <Link to="/categoria/accion" style={{ margin: '0 1rem', color: 'white' }}>Acción</Link>
        <Link to="/categoria/aventura" style={{ margin: '0 1rem', color: 'white' }}>Aventura</Link>
        <Link to="/categoria/rpg" style={{ margin: '0 1rem', color: 'white' }}>RPG</Link>
        <Link to="/carrito" style={{ margin: '0 1rem', color: 'white' }}>Carrito</Link>
      </div>
      <CartWidget />
    </nav>
  )
}

export default NavBar