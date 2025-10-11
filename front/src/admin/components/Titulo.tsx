import { Link } from "react-router-dom"
import { usePacienteStore } from "../../context/PacienteContext"
import { useNavigate } from "react-router-dom"
import { useAdminStore } from "../../admin/context/AdminContext"
import { FiUsers } from "react-icons/fi"

export default function Titulo() {
  const { admin } = useAdminStore()
  const { paciente, deslogaPaciente } = usePacienteStore()
  const navigate = useNavigate()

  function pacienteSair() {
    if (confirm("Confirma saída do sistema?")) {
      deslogaPaciente()
      if (localStorage.getItem("pacienteKey")) {
        localStorage.removeItem("pacienteKey")
      }
      navigate("/login")
    }
  }

  return (
    <nav className="bg-blue-900 shadow-md">
      <div className="flex justify-between items-center p-4 h-20 max-w-screen-xl mx-auto">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./logo2.webp" className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold text-white">Agendamento Médico</span>
        </Link>

        <ul className="hidden md:flex p-4 font-semibold space-x-8">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-white font-semibold rounded-sm hover:text-blue-300 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/consultas"
              className="block py-2 px-3 text-white font-semibold rounded-sm hover:text-blue-300 transition"
            >
              Minhas Consultas
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          {admin?.nome && (
            <div className="flex items-center text-white font-bold">
              <FiUsers className="mr-2" />
              {admin.nome}
            </div>
          )}
          {paciente.id ? (
            <div className="flex items-center">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {paciente.nome
                    ? paciente.nome
                        .split(" ")
                        .map((n) => n[0].toUpperCase())
                        .slice(0, 2)
                        .join("")
                    : ""}
                </span>
              </div>
              <span className="text-white ml-2 mr-4">{paciente.nome}</span>
              <button
                onClick={pacienteSair}
                className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2 text-center transition"
              >
                Sair
              </button>
            </div>
          ) : admin?.nome ? null : (
            <Link
              to="/login"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
