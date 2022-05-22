import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, notas, id} = cliente

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3">{nombre} </td>

        <td className="p-3">
            <p><span className="text-gray-600 uppercase font-bold">Correo: </span>{email} </p>
            <p><span className="text-gray-600 uppercase font-bold">Tel: </span>{telefono ? telefono: "no aportado"} </p>
        </td>

        <td className="p-3">{empresa} </td>

        <td className="p-3">
            <button
            className="bg-yellow-500 hover:bg-yellow-600 block uppercase font-bold text-xs p-2 text-white w-full"
            type="button"
            onClick={() => navigate(`/clientes/${id}`)}
            >Ver</button>

            <button
            className="bg-blue-600 hover:bg-blue-700 block uppercase font-bold text-xs p-2 text-white w-full mt-3"
            type="button"
            onClick={() => navigate(`/clientes/editar/${id}`)}
            >Editar</button>

            <button
            className="bg-red-600 hover:bg-red-700 block uppercase font-bold text-xs p-2 text-white w-full mt-3"
            type="button"
            onClick={()=> handleEliminar(id)}
            >Eliminar</button>
        </td>
        
    </tr>
  )
}

export default Cliente