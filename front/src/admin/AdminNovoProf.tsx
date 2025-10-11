import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { FuncaoType } from "../utils/FuncaoType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  idade: number
  genero: string
  ano_inicio_carreira: number
  foto: string 
  id_funcao: number
  destaque: boolean
}

export default function AdminNovoProf() {
  const [funcoes, setFuncoes] = useState<FuncaoType[]>([])
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getFuncoes() {
      const response = await fetch(`${apiUrl}/funcoes`)
      const dados = await response.json()
      setFuncoes(dados)
    }
    getFuncoes()
    setFocus("nome")
  }, [])

  const optionsFuncao = funcoes.map(funcao => (
    <option key={funcao.id} value={funcao.id}>{funcao.nome_funcao}</option>
  ))

  async function incluirProf(data: Inputs) {

    const novoProf: Inputs = {
        nome: data.nome,
        idade: Number(data.idade),
        genero: data.genero,
        ano_inicio_carreira: Number(data.ano_inicio_carreira),
        foto: data.foto,
        id_funcao: Number(data.id_funcao),
        destaque: data.destaque
    }

    const response = await fetch(`${apiUrl}/profissionais`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify(novoProf)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Profisional cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Profissional...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Profissional
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirProf)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome do Profissional</label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("nome")}
          />
        </div>

        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="id_funcao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Função</label>
            <select id="id_funcao"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("id_funcao")}
            >
              {optionsFuncao}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="ano_inicio_carreira" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ano de Incio de Carreira</label>
            <input type="number" id="ano_inicio_carreira"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("ano_inicio_carreira")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="idade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Idade</label>
            <input type="number" id="idade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("idade")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="destaque" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profissional em Destaque?
            </label>
            <input
              type="checkbox"
              id="destaque"
              {...register("destaque")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("foto")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gênero</label>
            <select id="genero"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("genero")}
            >
              <option>MASCULINO</option>
              <option>FEMININO</option>
            </select>
          </div>
          
        </div>
        <button type="submit" className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 text-white font-medium rounded px-4 py-1.5 text-sm mb-4">
          Incluir</button>
      </form>
    </>
  )
}