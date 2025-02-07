import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { CartContext } from '../context/CartContext'

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const { agregarAlCarrito } = useContext(CartContext)

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const docRef = doc(db, 'productos', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() })
        } else {
          console.log('No se encontró el producto')
        }
      } catch (error) {
        console.error('Error obteniendo el producto:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducto()
  }, [id])

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Cargando...</p>
  if (!producto) return <p style={{ color: 'white', textAlign: 'center' }}>Producto no encontrado.</p>

  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: '60%', maxWidth: '500px', borderRadius: '10px' }} />
      <p>Precio: ${producto.precio}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>{producto.descripcion}</p>
      <button 
        onClick={() => agregarAlCarrito(producto)} 
        style={{ backgroundColor: 'blue', color: 'white', padding: '0.5rem', borderRadius: '5px', cursor: 'pointer' }}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemDetailContainer