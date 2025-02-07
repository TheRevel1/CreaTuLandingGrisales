import React, { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { db } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const Checkout = () => {
  const { cartItems, vaciarCarrito } = useContext(CartContext)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    pais: "",
    numeroTarjeta: "",
    codigoSeguridad: "",
    fechaExpiracion: "",
  })
  const [errors, setErrors] = useState({})
  const [orderId, setOrderId] = useState(null)

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validarFormulario = () => {
    let newErrors = {}
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio"
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido"
    }
    if (!formData.direccion) newErrors.direccion = "La dirección es obligatoria"
    if (!formData.pais) newErrors.pais = "El país es obligatorio"
    if (!/^[0-9]{16}$/.test(formData.numeroTarjeta)) {
      newErrors.numeroTarjeta = "El número de tarjeta debe tener 16 dígitos"
    }
    if (!/^[0-9]{3,4}$/.test(formData.codigoSeguridad)) {
      newErrors.codigoSeguridad = "El código de seguridad debe tener 3 o 4 dígitos"
    }
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(formData.fechaExpiracion)) {
      newErrors.fechaExpiracion = "Formato inválido (MM/YY)"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      console.error("Error: No hay productos en el carrito.")
      return
    }

    if (validarFormulario()) {
      try {
        const order = {
          comprador: formData,
          items: cartItems,
          total,
          fecha: new Date().toISOString(),
        }

        const docRef = await addDoc(collection(db, "orders"), order)
        setOrderId(docRef.id)
        setTimeout(() => {
          vaciarCarrito()
        }, 1000)

      } catch (error) {
        console.error("Error procesando la compra:", error)
      }
    }
  }

  return (
    <div style={{ padding: "2rem", color: "white", textAlign: "center" }}>
      <h2>Finalizar compra</h2>

      {orderId ? (
        <div>
          <h3 style={{ color: "lightgreen" }}>¡Gracias por tu compra!</h3>
          <p>Tu ID de compra es: <strong>{orderId}</strong></p>
          <Link to="/"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              backgroundColor: "blue",
              color: "white",
              padding: "0.5rem 1rem",
              textDecoration: "none",
              borderRadius: "5px",
            }}>
            Volver al inicio
          </Link>
        </div>
      ) : (
        cartItems.length === 0 ? (
          <div>
            <h2>No puedes hacer checkout sin productos en el carrito.</h2>
            <Link to="/"
              style={{
                display: "block",
                marginTop: "1rem",
                backgroundColor: "blue",
                color: "white",
                padding: "0.5rem",
                textAlign: "center",
                textDecoration: "none",
              }}>
              Volver al Catálogo
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <h3 style={{ marginTop: "1rem", color: "lightgreen" }}>Total a pagar: ${total.toFixed(2)}</h3>
            <input type="text" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleInputChange} />
            {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleInputChange} />
            {errors.direccion && <p style={{ color: "red" }}>{errors.direccion}</p>}
            <input type="text" name="pais" placeholder="País" value={formData.pais} onChange={handleInputChange} />
            {errors.pais && <p style={{ color: "red" }}>{errors.pais}</p>}
            <input type="text" name="numeroTarjeta" placeholder="Número de tarjeta" value={formData.numeroTarjeta} onChange={handleInputChange} />
            {errors.numeroTarjeta && <p style={{ color: "red" }}>{errors.numeroTarjeta}</p>}
            <input type="text" name="codigoSeguridad" placeholder="Código de seguridad" value={formData.codigoSeguridad} onChange={handleInputChange} />
            {errors.codigoSeguridad && <p style={{ color: "red" }}>{errors.codigoSeguridad}</p>}
            <input type="text" name="fechaExpiracion" placeholder="MM/YY" value={formData.fechaExpiracion} onChange={handleInputChange} />
            {errors.fechaExpiracion && <p style={{ color: "red" }}>{errors.fechaExpiracion}</p>}
            <button type="submit">Finalizar compra</button>
          </form>
        )
      )}
    </div>
  )
}

export default Checkout