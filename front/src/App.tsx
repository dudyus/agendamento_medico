import { CardProf } from "./components/CardProf";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ProfissionalType } from "./utils/ProfissionalType";
import { useEffect, useState } from "react";
import { usePacienteStore } from "./context/PacienteContext"


const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [profissionais, setProfissionais] = useState<ProfissionalType[]>([])
  const { logaPaciente, paciente } = usePacienteStore()


  useEffect(() => {
    if (!paciente?.id) {
      const stored = localStorage.getItem("paciente")
      if (stored) logaPaciente(JSON.parse(stored))
    }
  }, [])
  

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/profissionais`)
      const dados = await response.json()
      // console.log(dados)
      setProfissionais(dados)
    }
    buscaDados()

    async function buscaPaciente(id: string) {
      const response = await fetch(`${apiUrl}/pacientes/${id}`)
      const dados = await response.json()
      logaPaciente(dados)
    }
    if (localStorage.getItem("pacienteKey")) {
      const idPaciente = localStorage.getItem("pacienteKey")
      buscaPaciente(idPaciente as string)
    }    
  }, [])

  const listaProfissionais = profissionais.map( profissional => (
    <CardProf data={profissional} key={profissional.id} />
  ))

  return (
    <>
      <InputPesquisa  setProfissionais={setProfissionais} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          Profissionais <span className="">em destaque</span>
        </h1>
        <div className="grid grid-cols-4 gap-6">
          {listaProfissionais}
        </div>
      </div>
    </>
  );
}

