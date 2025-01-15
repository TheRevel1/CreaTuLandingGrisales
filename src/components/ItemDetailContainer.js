import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const mockData = [
  { id: '1', nombre: 'League of Legends', precio: 0, descripcion: 'MOBA competitivo.' },
  { id: '2', nombre: 'Elden Ring', precio: 60, descripcion: 'El nuevo juego de rol y acción de ambientación fantástica de FromSoftware' },
  { id: '3', nombre: 'God of War', precio: 50, descripcion: 'Kratos ha dejado atrás su venganza contra los dioses del Olimpo y vive ahora como un hombre en los dominios de los dioses y monstruos nórdicos. En este mundo cruel e implacable debe luchar para sobrevivir… y enseñar a su hijo a hacerlo también.', },
  { id: '4', nombre: 'Minecraft', precio: 30, descripcion: 'Minecraft es un videojuego de construcción de tipo «mundo abierto»', },
  { id: '5', nombre: 'Zelda: Breath of the Wild', precio: 60, descripcion: 'Juego de rol y aventura', }

]

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const { agregarAlCarrito } = useContext(CartContext)

  useEffect(() => {
    const obtenerProducto = new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData.find(item => item.id === id))
      }, 1000)
    })

    obtenerProducto.then(data => setProducto(data))
  }, [id])

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
      {producto ? (
        <>
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p>Precio: ${producto.precio}</p>
          <button onClick={() => agregarAlCarrito(producto)} style={{ padding: '0.5rem 1rem', backgroundColor: 'green', color: 'white' }}>
            Agregar al carrito
          </button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default ItemDetailContainer