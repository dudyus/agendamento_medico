import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes  from './Detalhes.tsx'
import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CadPaciente from './CadPaciente.tsx'
import Consultas from './components/Consultas.tsx' 
import AdminLogin from './admin/AdminLogin.tsx'
import AdminDashboard from './admin/AdminDashboard.tsx'
import AdminLayout from './admin/AdminLayout.tsx';            
import AdminProf from './admin/AdminProf.tsx'; 
import AdminControleConsultas from './admin/AdminControleConsultas.tsx'
import AdminNovoProf from './admin/AdminNovoProf.tsx'


const rotas = createBrowserRouter([
   {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },     // rota /admin
      { path: "cadastro-profissionais", element: <AdminProf /> },     // rota /admin/carros
      { path: "controle-consultas", element: <AdminControleConsultas /> },     // rota /admin/carros
      { path: "profissionais/novo", element: <AdminNovoProf /> },     // rota /admin/carros
      { path: 'cadPaciente', element: <CadPaciente /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:profissionalId', element: <Detalhes /> },
      { path: 'consultas', element: <Consultas /> },
    ],
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)