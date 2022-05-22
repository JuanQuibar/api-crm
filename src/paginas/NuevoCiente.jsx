import Formulario from '../Components/Formulario'

const NuevoCiente = () => {
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
        <p className="mt-3">Llenar los campos para registrar a un nuevo cliente</p>
        <Formulario />
    </>
  )
}

export default NuevoCiente