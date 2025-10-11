import { useAdminStore } from "../context/AdminContext"
import { IoExit } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi"
import { FaIdCard, FaMedrt, FaUserPlus  } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"

export function MenuLateral() {
  const navigate = useNavigate()
  const { deslogaAdmin } = useAdminStore()

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      deslogaAdmin()
      navigate("/", { replace: true })
    }
  }

  return (
<aside
  id="default-sidebar"
  className="w-64 h-auto bg-blue-9  00 dark:bg-gray-800"
  aria-label="Sidebar"
>      <div className="h-full px-3 py-4 bg-blue-900 dark:bg-gray-800 ">
        <ul className="space-y-2 font-medium">
        <li>
            <Link to="/admin" className="flex items-center p-2">
              <span className="h-5 text-white text-2xl">
                <BiSolidDashboard />
              </span>
              <span className="ms-2 mt-1 text-white">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/cadastro-profissionais" className="flex items-center p-2">
              <span className="h-5 text-white text-2xl">
                <FaIdCard  />
              </span>
              <span className="ms-2 mt-1 text-white">Cadastro de Profissionais</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/cadastro-pacientes" className="flex items-center p-2">
              <span className="h-5 text-white text-2xl">
                <FaUserPlus />
              </span>
              <span className="ms-2 mt-1 text-white">Controle de Pacientes</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/controle-consultas" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-white text-2xl">
                <FaMedrt  />
              </span>
              <span className="ms-2 mt-1 text-white">Controle de Consultas</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-white text-2xl">
                <IoExit  />
              </span>
              <span className="ms-2 mt-1 text-white" onClick={adminSair}>Sair do Sistema</span>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  )
}