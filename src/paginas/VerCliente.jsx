import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../Components/Spinner"

const VerCliente = () => {

    const {id} = useParams()

    const [cliente, setCliente] = useState({})

    const [cargando, setCargando] = useState(true)

    useEffect(() =>{
        const obtenerClienteApi = async () => {
            
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
                
            } catch (error) {
                console.log("Error en obtenerClienteApi", error)
                
            }

            setCargando(!cargando)

            /* setTimeout(() => {
                setCargando(!cargando)
            }, 1000); */

        }
        obtenerClienteApi()

    }, [])

  return (

    cargando ? <Spinner/> : 
        Object.keys(cliente).length === 0 ? 
        <p> No hay resultado</p> : 
    (
        <>
            
            <div>

                <h1 className='font-black text-4xl text-blue-900'>Ver cliente: {cliente.nombre} </h1>
                <p className="mt-3">Inoformación detallada</p>

                <p className="text-gray-600 text-3xl mt-4">
                    <span className="text-gray-700 uppercase font-bold">Nombre: </span>
                    {cliente.nombre} 

                </p>
                <p className="text-gray-600 text-2xl mt-4">
                    <span className="text-gray-700 uppercase font-bold mt-4">Empresa: </span>
                    {cliente.empresa} 
                </p>

                <p className="text-gray-600 text-2xl mt-4">
                    <span className="text-gray-700 uppercase font-bold mt-4">Correo: </span>
                    {cliente.email} 
                </p>

                {cliente.telefono ? (
                    <p className="text-gray-600 text-2xl mt-4">
                        <span className="text-gray-700 uppercase font-bold mt-4">Teléfono: </span>
                        {cliente.telefono} 
                    </p> ) : (
                    <p className="text-gray-600 text-2xl mt-4">
                    <span className="text-gray-700 uppercase font-bold mt-4">Teléfono: </span>
                    Teléfono no aportado
                    </p>
                    ) 
                }

                {cliente.notas && (
                    <p className="text-gray-600 text-2xl mt-4">
                        <span className="text-gray-700 uppercase font-bold">Notas: </span>
                        {cliente.notas} 
                    </p>
                )}

            </div>
              
        </>
    )
  )
}

export default VerCliente