import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Inicio from "./paginas/Inicio"
import NuevoCiente from "./paginas/NuevoCiente"
import EditarCliente from "./paginas/EditarCliente"
import VerCliente from "./paginas/VerCliente"

function App() {
  

  return (
    <BrowserRouter>
        <Routes>

            <Route path="/clientes" element={<Layout/>} >
              //las 3 route que siguen a continuación son la Outlet que se importa en Layout y que se cargan según la ruta de la url. 
              <Route index element={<Inicio/>} />
              <Route path="nuevo" element={<NuevoCiente/>} />
              <Route path="editar/:id" element={<EditarCliente/>} />
              <Route path=":id" element={<VerCliente/>} />
            </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default App
