import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ id, nombre, precio, imagen }) => {
    return (
        <div style={{
            border: 'none',
            borderRadius: '10px',
            padding: '1rem',
            margin: '1rem',
            width: '350px',
            backgroundColor: '#1e1e1e',
            color: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            textAlign: 'center'
        }}>
            <img
                src={imagen}
                alt={nombre}
                style={{ borderRadius: '8px', width: '100%', height: '350px', objectFit: 'cover' }}
            />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <Link to={`/producto/${id}`} style={{
                textDecoration: 'none',
                color: '#fff',
                backgroundColor: '#007bff',
                padding: '0.5rem 1rem',
                borderRadius: '5px'
            }}>
                Ver detalles
            </Link>
        </div>
    )
}

export default Item