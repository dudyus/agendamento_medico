import { useEffect, useState } from "react"
import ItemConsulta from "./components/ItemConsulta"
import type { ConsultaType } from "../utils/ConsultaType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminControleConsultas() {
  const [consultas, setConsultas] = useState<ConsultaType[]>([])

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const response = await fetch(`${apiUrl}/consultas`)
        if (!response.ok) {
          alert("Erro ao buscar consultas")
          return
        }
        const dados = await response.json()
        setConsultas(dados)
      } catch (error) {
        console.error(error)
        alert("Erro de conexão com o servidor")
      }
    }
    fetchConsultas()
  }, [])

  const listaConsultas = consultas.map((consulta) => (
    <ItemConsulta
      key={consulta.id}
      consulta={consulta}
      consultas={consultas}
      setConsultas={setConsultas}
    />
  ))

  return (
    <div className="m-4 mt-24">
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Consultas
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Paciente</th>
              <th className="px-6 py-3">Profissional</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Hora</th>
              <th className="px-6 py-3">Confirmação</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>{listaConsultas}</tbody>
        </table>
      </div>
    </div>
  )
}
