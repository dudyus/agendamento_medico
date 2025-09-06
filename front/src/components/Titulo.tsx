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
  <div className=" flex justify-between items-center p-4 h-20">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="./logo2.webp" className="h-8" alt="Logo" />
        <span className="text-2xl font-semibold text-white">Agendamento Médico</span>
    </a>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
        <li>
        {paciente.id ? (
            <>
            <span className="text-white">{paciente.nome}</span>&nbsp;&nbsp;
            <Link to="/propostas" className="text-white font-bold bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-400 rounded-lg 
            text-sm w-full sm:w-auto px-3 py-2 text-center ">Minhas Propostas</Link>&nbsp;&nbsp;
            <span className="cursor-pointer font-bold text-gray-600" onClick={pacienteSair}>Sair</span>
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