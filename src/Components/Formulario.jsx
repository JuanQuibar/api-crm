import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre:   Yup.string()
                  .min(3, "El nombre es muy corto")
                  .max(20, "El nombre es muy largo")
                  .required("El nombre es obligatorio"),
    empresa:  Yup.string()
                  .required("El nombre de la empresa es obligatorio"),
    telefono: Yup.number()
                  .integer("Número no válido")
                  .positive("Número no válido")
                  .typeError("El número no es válido"),
    email:    Yup.string()
                  .email("Correo no válido")
                  .required("El correo es obligatorio"),
    notas: ""
  })

  const handleSubmit = async  (valores) => {
    try {

      let respuesta

      if (cliente.id){
        //Editando cliente
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json"
          }
        })

      } else {
        //Creando cliente nuevo
        const url = import.meta.env.VITE_API_URL
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json"
          }
        })
      }
      await respuesta.json()
      navigate("/clientes")
      
    } catch (error) {
        console.log("error de handleSubmit", error)
    }
    
  }

  return (

    cargando ? <Spinner /> : (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">

          <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? "Editar cliente" : "Agregar cliente"} </h1>

          <Formik
            initialValues={{
              //Nullish coalescing operator
              nombre: cliente?.nombre ?? "",
              empresa: cliente?.empresa ?? "",
              telefono: cliente?.telefono ?? "",
              email: cliente?.email ?? "",
              notas: cliente?.notas ?? ""
            }}

            //ejecuta de nuevo el componente Formulario por si no se cargaron los datos de la api que llegan via props cliente
            enableReinitialize={true}

            onSubmit={ async (values, {resetForm}) => {
              await handleSubmit(values)
              resetForm()
            }}

            validationSchema={nuevoClienteSchema}
          >
            {({errors, touched}) =>{
              
              return (
              <Form className="mt-10"> 

                <div className="mb-4">

                  <label
                    className="text-gray-800"
                    htmlFor="nombre"
                  >Nombre:</label>

                  <Field
                    id="nombre"
                    type= "text"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Nombre del cliente"
                    name="nombre"
                  />

                  {errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                  ) : null }

                </div>

                <div className="mb-4">

                  <label
                    className="text-gray-800"
                    htmlFor="empresa"
                  >Empresa:</label>

                  <Field
                    id="empresa"
                    type= "text"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Empresa del cliente"
                    name="empresa"
                  />
                  {errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                  ) : null }

                </div>

                <div className="mb-4">

                  <label
                    className="text-gray-800"
                    htmlFor="email"
                  >Correo:</label>

                  <Field
                    id="email"
                    type= "email"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Correo del cliente"
                    name="email"
                  />
                    {errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                  ) : null }

                </div>

                <div className="mb-4">

                  <label
                    className="text-gray-800"
                    htmlFor="telefono"
                  >Teléfono:</label>

                  <Field
                    id="telefono"
                    type= "tel"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Teléfono del cliente"
                    name="telefono"
                  />
                  {errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                  ) : null }

                </div>
                
                <div className="mb-4">

                  <label
                    className="text-gray-800"
                    htmlFor="notas"
                  >Notas:</label>

                  <Field
                    as="textarea"
                    id="notas"
                    type= "text"
                    className="mt-2 block w-full p-3 bg-gray-100 h-40"
                    placeholder="Agregar comentario"
                    name="notas"
                  />

                </div>

                <input 
                  type="submit" 
                  value={cliente?.nombre ? "Actualizar" : "Enviar"}
                  className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                />

              </Form>
            )}}
          </Formik>
      </div>
    )
  )
}

//creo un prop por si no encuenta el que esta requerido el parámetro de la función principal
Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario