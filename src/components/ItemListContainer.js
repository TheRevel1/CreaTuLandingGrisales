import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'

const mockData = [
  { id: '1', nombre: 'League of Legends', precio: 0, categoria: 'accion', imagen: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/CNTWUAMXZRF3BPIYPCNPFHOMJQ.jpg' },
  { id: '2', nombre: 'Elden Ring', precio: 60, categoria: 'rpg', imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png' },
  { id: '3', nombre: 'God of War', precio: 50, categoria: 'accion', imagen: 'https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7' },
  { id: '4', nombre: 'Minecraft', precio: 30, categoria: 'aventura', imagen: 'https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png' },
  { id: '5', nombre: 'Zelda: Breath of the Wild', precio: 60, categoria: 'aventura', imagen: 'https://media.vandal.net/m/43030/the-legend-of-zelda-breath-of-the-wild-201732131429_1.jpg' }
]

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([])
  const { categoriaId } = useParams()

  useEffect(() => {
    const obtenerProductos = new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData)
      }, 1000)
    })

    obtenerProductos.then((data) => {
      if (categoriaId) {
        const productosFiltrados = data.filter(producto => producto.categoria === categoriaId)
        setProductos(productosFiltrados)
      } else {
        setProductos(data)
      }
    })
  }, [categoriaId])

  return (
    <section style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
      <h2>{categoriaId ? `Categoría: ${categoriaId}` : greeting}</h2>
      {productos.length > 0 ? (
        <ItemList productos={productos} />
      ) : (
        <p>Cargando productos...</p>
      )}
    </section>
  )
}

export default ItemListContainer