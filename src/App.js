import React from 'react'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'

const App = () => {
  return (
    <div style={{ background: '#434747'}}>
      <NavBar />
      <ItemListContainer style={{color: 'white'}} greeting="¡Bienvenido a Vicious Library!" />
    </div>
  )
}

export default App