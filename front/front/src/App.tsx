import { CardProf } from "./components/CardProf";
import { InputPesquisa } from "./components/InputPesquisa";
import type { ProfissionalType } from "./utils/ProfissionalType";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [profissionais, setProfissionais] = useState<ProfissionalType[]>([])
  

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/carros`)
      const dados = await response.json()
      // console.log(dados)
      setProfissionais(dados)
    }
    buscaDados()
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
        <div className="flex gap-3">
          {listaProfissionais}
        </div>
      </div>
    </>
  );
}
