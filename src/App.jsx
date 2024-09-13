import './App.css'
import CrearLibro from './components/CrearLibro';  // Importar componente de crear libro
import DetalleLibro from './components/DetalleLibro'; //importar componente nuevo de detalle  libro
import EditarLibro from './components/EditarLibro'; //importar componente nuevo de editar libro
import Index from './components/Index'
import { BrowserRouter, Route, Routes } from "react-router-dom"; // importar libreria

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Index /> }/>
              <Route path="/libro/:id" element={ <DetalleLibro /> }/>
              <Route path="/edit/:id" element={ <EditarLibro /> }/>
              <Route path="/create" element={ <CrearLibro /> }/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App