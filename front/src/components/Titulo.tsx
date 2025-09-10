import { Link } from "react-router-dom"
import { usePacienteStore } from "../context/PacienteContext"
import { useNavigate } from "react-router-dom"

export default function Titulo() {
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
<nav className="bg-blue-900">
  <div className="flex justify-between items-center p-4 h-20">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="./logo2.webp" className="h-8" alt="Logo" />
        <span className="text-2xl font-semibold text-white">Agendamento Médico</span>
    </a>
    <ul className="flex p-4 mt-4 font-semibold md:space-x-8 md:flex-row ">
      <li>
        <a href="/" className="block py-2 px-3 text-white font-semibold rounded-sm" aria-current="page">Home</a>
      </li>
      <li>
        <Link to="/propostas" className="block py-2 px-3 text-white font-semibold rounded-sm">Minhas Consultas</Link>
      </li>
      </ul>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
        <li>
        {paciente.id ? (
            <>
             <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {paciente.nome ? paciente.nome.split(" ").map(n => n[0].toUpperCase()).slice(0, 2).join("") : ""}
                </span>
            </div>
            <span className="text-white ml-2 mr-2">{paciente.nome}</span>&nbsp;&nbsp;
            <span className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2 text-center" onClick={pacienteSair}>Sair</span>
            </>
        ) : (
            <Link to="/login" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
        )}
        </li>
    </ul>
    </div>  
  </div>
</nav>
    )
}