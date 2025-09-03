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
        <nav className="bg-blue-900 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logoMedica.jpg" className="h-12" alt="Logo Medica" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Agendamento Médico
                    </span>
                </Link>
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-Linecap="round" stroke-Linejoin="round" stroke-Width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent ">
                        <li>
                             {paciente.id ?
                                <>
                                    <span className="text-black">
                                        {paciente.nome}
                                    </span>&nbsp;&nbsp;
                                    <Link to="/propostas" className="text-white font-bold bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-400 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                        Minhas Propostas
                                    </Link>&nbsp;&nbsp;
                                    <span className="cursor-pointer font-bold text-gray-600"
                                        onClick={pacienteSair}>
                                        Sair
                                    </span>
                                </>
                                :
                                <Link to="/login" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Identifique-se
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}