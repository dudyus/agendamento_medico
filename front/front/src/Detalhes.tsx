import type { ProfissionalType } from "./utils/ProfissionalType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const apiUrl = import.meta.env.VITE_API_URL

export default function Detalhes() {
  const { profissionalId } = useParams()
  const [profissional, setProfissional] = useState<ProfissionalType>()

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

  return (
    <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
        src={profissional?.foto}
        alt={`Foto de ${profissional?.nome}`}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {profissional?.funcao?.nome_funcao ?? "Função não informada"} {profissional?.nome}
        </h5>
        <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          Idade: {profissional?.idade ?? "Não informada"}
        </h5>
        <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          Função: {profissional?.funcao?.nome_funcao?? "Não informada"}
        </h5>
      </div>
    </section>
  )
}
