import React from 'react'

const ItemListContainer = ({ greeting }) => {
  return (
    <section style={{ padding: '2rem', textAlign: 'center' , color: 'white' }}>
      <h2>{greeting}</h2>
    </section>
  )
}

export default ItemListContainer