import { useEffect, useState } from "react"
import ItemPaciente from './components/ItemPaciente'
import type { PacienteType } from "../utils/PacienteType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminPaciente() {
     const [pacientes, setPacientes] = useState<PacienteType[]>([])

  useEffect(() => {
    async function getPacientes() {
      const response = await fetch(`${apiUrl}/pacientes`)
      const dados = await response.json()
      setPacientes(dados)
    }
    getPacientes()
  }, [])

  const listaPacientes = pacientes.map(paciente => (
    <ItemPaciente key={paciente.id} paciente={paciente} pacientes={pacientes} setPacientes={setPacientes} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de pacientes
        </h1>
        <Link
  to="/admin/pacientes/novo"
  className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 text-white font-medium rounded px-4 py-1.5 text-sm mb-4">
  Novo paciente
</Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Fone
              </th>
              <th scope="col" className="px-6 py-3">
                Endereço
              </th>
              <th scope="col" className="px-6 py-3">
                CPF
              </th>
              <th scope="col" className="px-6 py-3">
                Data de nascimento
              </th>
              <th scope="col" className="px-6 py-3">
                Ações 
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPacientes}
          </tbody>
        </table>
      </div>
    </div>
  )
}