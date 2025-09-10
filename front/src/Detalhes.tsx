import type { ProfissionalType } from "./utils/ProfissionalType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { usePacienteStore } from "./context/PacienteContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const { profissionalId } = useParams()
  const [profissional, setProfissional] = useState<ProfissionalType>()
  const { paciente } = usePacienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaDados() {
      if (!profissionalId) return

      const response = await fetch(`${apiUrl}/profissionais/${profissionalId}`)
      const dados = await response.json()
      console.log(dados) // veja o que vem da API
      setProfissional(dados)
    }

    buscaDados()
  }, [profissionalId])

    async function enviaConsulta(data: Inputs) {

    const response = await fetch(`${apiUrl}/consultas`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        id_paciente: paciente.id,
        id_profissional: Number(profissionalId),
        data: new Date(),
        hora: new Date(), 
        tipo: , 
        admin_id: Number(),
        descricao: data.descricao
      })
    })

    if (response.status == 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta")
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
        <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          Função: {profissional?.funcao?.nome_funcao?? "Não informada"}
        </h5>
        {paciente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                🙂Você pode marcar uma consulta com este profissional !</h3>
              <form>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${paciente.nome} (${paciente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua proposta"
                  required></textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Marcar Consulta</button>
              </form>
            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Crie ou logue na sua conta para marcar uma consulta.
            </h2>
          }
      </div>
    </section>
  )
}
