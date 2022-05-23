import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../Components/Formulario"


const EditarCliente = () => {

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
    <>
        <h1 className='font-black text-4xl text-blue-900'>Edición</h1>
        <p className="mt-3">Formulario de edición de cliente</p> 
        
        {cliente.nombre ? 
          <Formulario 
            cliente={cliente}
            cargando={cargando}
          /> : <p> Cliente no hallado</p> }
        
        
        
    </>
    //Opción que desarrollé para evitar el enableReinitializa dentro de la etiqueta Formik del componente Formulario
    /* Object.keys(cliente).length === 0 ? <p> sin resultado</p> : (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Edición</h1>
        <p className="mt-3">Formulario de edición de cliente</p>
        <Formulario 
        cliente={cliente}
        
        />
    </>
    ) */
  )
}

export default EditarCliente