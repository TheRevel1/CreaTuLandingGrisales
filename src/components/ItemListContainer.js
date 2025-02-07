import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebaseConfig"
import ItemList from "./ItemList"

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([])
  const { categoriaId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Obteniendo productos desde Firestore...")
        const querySnapshot = await getDocs(collection(db, "productos"))
        
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        console.log("Productos obtenidos:", items)
        
        if (categoriaId) {
          const filtrados = items.filter((producto) => producto.categoria === categoriaId)
          console.log("Productos filtrados por categoría:", filtrados)
          setProductos(filtrados)
        } else {
          setProductos(items)
        }
      } catch (error) {
        console.error("Error obteniendo productos:", error)
      }
    }

    fetchData()
  }, [categoriaId])

  return (
    <section style={{ padding: "2rem", textAlign: "center", color: "white" }}>
      <h2>{categoriaId ? `Categoría: ${categoriaId}` : greeting}</h2>
      {productos.length > 0 ? <ItemList productos={productos} /> : <p>Cargando productos...</p>}
    </section>
  )
}

export default ItemListContainer