import { Link } from "react-router-dom"
import type { ProfissionalType } from "../utils/ProfissionalType"

export function CardProf({data}: {data: ProfissionalType}) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
            <img className="rounded-t-lg" src={data.foto} alt="Foto" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.nome} 
                </h5>
                <h1 className="font-bold">
                    {data.funcao.nome_funcao} 
                </h1>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Idade: {data.idade} 
                </p>
                <Link to={`/detalhes/${data.id}`} className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-Linecap="round" stroke-Linejoin="round" stroke-Width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}