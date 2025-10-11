import { useAdminStore } from "../context/AdminContext"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaCarSide, FaUsers } from "react-icons/fa6"
import { BsCashCoin } from "react-icons/bs"

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
  className="w-64 h-auto bg-blue-300 dark:bg-gray-800"
  aria-label="Sidebar"
>      <div className="h-full px-3 py-4 bg-blue-300 dark:bg-gray-800 ">
        <ul className="space-y-2 font-medium">
        <li>
            <Link to="/admin" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <BiSolidDashboard />
              </span>
              <span className="ms-2 mt-1">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/cadastro-profissionais" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <FaCarSide />
              </span>
              <span className="ms-2 mt-1">Cadastro de Profissionais</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/cadastro-pacientes" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <FaUsers />
              </span>
              <span className="ms-2 mt-1">Controle de Pacientes</span>
            </Link>
          </li>
          <li>
          <Link to="/admin/controle-consultas" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-600 text-2xl">
                <BsCashCoin />
              </span>
              <span className="ms-2 mt-1">Controle de Consultas</span>
            </Link>
          </li>

          <li>
            <span className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-600 text-2xl">
                <IoExitOutline />
              </span>
              <span className="ms-2 mt-1" onClick={adminSair}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}