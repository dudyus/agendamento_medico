import type { ProfissionalType } from "./utils/ProfissionalType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { usePacienteStore } from "./context/PacienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  data: string
  hora: string
  tipo: "PRESENCIAL" | "ONLINE"
}

export default function Detalhes() {
  const params = useParams()
  const [profissional, setProfissional] = useState<ProfissionalType>()
  const { paciente } = usePacienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      if (!params.profissionalId) return
      const response = await fetch(`${apiUrl}/profissionais/${params.profissionalId}`)
      const dados = await response.json()
      setProfissional(dados)
    }
    buscaDados()
  }, [params.profissionalId])

  async function enviaConsulta(data: Inputs) {
    if (!paciente?.id || !params.profissionalId) return

    try {
      const response = await fetch(`${apiUrl}/consultas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_paciente: paciente.id,
          id_profissional: Number(params.profissionalId),
          data: new Date(data.data),       
          hora: new Date(`${data.data}T${data.hora}`),      
          tipo: data.tipo,       
          admin_id: 1            
        })
      })

      if (response.status === 201) {
        toast.success("Consulta marcada com sucesso!")
        reset()
      } else {
        toast.error("Erro ao marcar a consulta")
        console.error(await response.json())
      }
    } catch (error) {
      toast.error("Erro de conexão com a API")
      console.error(error)
    }
  }

  return (
    <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
        src={profissional?.foto}
        alt={`Foto de ${profissional?.nome}`}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {profissional?.nome}
        </h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {profissional?.funcao?.nome_funcao ?? "Função não informada"} 
        </h5>
        <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          Idade: {profissional?.idade ?? "Não informada"}
        </h5>

        {paciente.id ? (
          <form onSubmit={handleSubmit(enviaConsulta)} className="mt-4 w-full">
            <input
              type="date"
              {...register("data")}
              className="mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required
            />
            <input
              type="time"
              {...register("hora")}
              className="mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required
            />
            <select
              {...register("tipo")}
              className="mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              required
            >
              <option value="PRESENCIAL">Presencial</option>
              <option value="ONLINE">Online</option>
            </select>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Marcar Consulta
            </button>
          </form>
        ) : (
          <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            😎Crie ou logue na sua conta para marcar uma consulta.
          </h2>
        )}
      </div>
    </section>
  )
}
