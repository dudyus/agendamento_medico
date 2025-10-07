import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoFuncaoType = {
  Funcao: string
  num: number
}

type geralDadosType = {
  pacientes: number
  profissionais: number
  consultas: number
}

export default function AdminDashboard() {
  const [profFuncao, setprofFuncao] = useState<graficoFuncaoType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoFuncao() {
      const response = await fetch(`${apiUrl}/dashboard/profFuncao`)
      const dados = await response.json()
      setprofFuncao(dados)
    }
    getDadosGraficoFuncao()

  }, [])

  const listaprofFuncao = profFuncao.map(item => (
    { x: item.Funcao, y: item.num }
  ))


  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.pacientes}</span>
          <p className="font-bold mt-2 text-center">Pacientes Cadastrados</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.profissionais}</span>
          <p className="font-bold mt-2 text-center">Profisionais Cadastrados</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.consultas}</span>
          <p className="font-bold mt-2 text-center">Consultas Agendadas</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaprofFuncao}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Profissionais", "por Funcao"]}
          />
        </svg>
      </div>
    </div>
  )
}