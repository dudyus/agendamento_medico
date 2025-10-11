import { useForm } from "react-hook-form"
import { toast } from "sonner"
// import { useState, useEffect } from "react"
// import type { FuncaoType } from "../utils/FuncaoType"
import { useAdminStore } from "./context/AdminContext"
// import { useEffect } from "react"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  email: string
  senha: string
  fone: string
  endereco: string
  data_nasc: string
  cpf: string
}

export default function AdminNovoPaciente() {
  // const [funcoes, setFuncoes] = useState<FuncaoType[]>([])
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    //setFocus
  } = useForm<Inputs>()

//   useEffect(() => {
//     async function getFuncoes() {
//       const response = await fetch(`${apiUrl}/funcoes`)
//       const dados = await response.json()
//       setFuncoes(dados)
//     }
//     getFuncoes()
//     setFocus("nome")
//   }, [])

//   const optionsFuncao = funcoes.map(funcao => (
//     <option key={funcao.id} value={funcao.id}>{funcao.nome_funcao}</option>
//   ))

  async function incluirPaciente(data: Inputs) {

    const AdminNovoPaciente: Inputs = {
  nome: data.nome,
  email: data.email,
  senha: data.senha,
  fone: data.fone,
  endereco: data.endereco,
  data_nasc: data.data_nasc,
  cpf: data.cpf
}

    const response = await fetch(`${apiUrl}/pacientes`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify(AdminNovoPaciente)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Paciente cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Paciente...")
    }
  }

 return (
  <>
    <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
      Inclusão de Paciente
    </h1>

    <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirPaciente)}>
      <div className="mb-3">
        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nome do Paciente
        </label>
        <input
          type="text"
          id="nome"
          {...register("nome")}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Senha
        </label>
        <input
          type="password"
          id="senha"
          {...register("senha")}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="grid gap-6 mb-3 md:grid-cols-2">
        <div className="mb-3">
          <label htmlFor="fone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Telefone
          </label>
          <input
            type="text"
            id="fone"
            {...register("fone")}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            {...register("cpf")}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Endereço
        </label>
        <input
          type="text"
          id="endereco"
          {...register("endereco")}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="data_nasc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Data de Nascimento
        </label>
        <input
          type="date"
          id="data_nasc"
          {...register("data_nasc")}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 text-white font-medium rounded px-4 py-1.5 text-sm mb-4"
      >
        Incluir
      </button>
    </form>
  </>
)
}