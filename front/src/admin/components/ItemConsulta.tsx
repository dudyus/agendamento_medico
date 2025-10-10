import type { ConsultaType } from "../../utils/ConsultaType"

interface Props {
  consulta: ConsultaType
  consultas: ConsultaType[]
  setConsultas: React.Dispatch<React.SetStateAction<ConsultaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemConsulta({ consulta, consultas, setConsultas }: Props) {

  async function confirmarConsulta() {
    if (!confirm(`Confirmar consulta de ${consulta.paciente.nome}?`)) return

    try {
      const response = await fetch(`${apiUrl}/consultas/${consulta.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmada: true }),
      })

      if (!response.ok) {
        alert("Erro ao confirmar consulta")
        return
      }

      const atualizada = await response.json()

      const novaLista = consultas.map(c =>
        c.id === atualizada.id ? { ...c, confirmada: true } : c
      )
      setConsultas(novaLista)
      alert("Consulta confirmada com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro de conexão com o servidor")
    }
  }
  async function excluirConsulta() {
    if (!confirm(`Tem certeza que deseja excluir a consulta de ${consulta.paciente.nome}?`)) return

    try {
      const response = await fetch(`${apiUrl}/consultas/${consulta.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        alert("Erro ao excluir a consulta")
        return
      }

      // Remove a consulta da lista local
      const novaLista = consultas.filter(c => c.id !== consulta.id)
      setConsultas(novaLista)
      alert("Consulta excluída com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro de conexão com o servidor")
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{consulta.paciente.nome}</td>
      <td className="px-6 py-4">{consulta.profissional.nome}</td>
      <td className="px-6 py-4">{new Date(consulta.data).toLocaleDateString()}</td>
      <td className="px-6 py-4">{consulta.hora}</td>
      <td className="px-6 py-4">
        {consulta.confirmada ? (
          <span className="text-green-600 font-semibold">Confirmada</span>
        ) : (
          <span className="text-red-600 font-semibold">Não Confirmada</span>
        )}
      </td>
      <td className="px-6 py-4">
        {!consulta.confirmada && (
          <button
            onClick={confirmarConsulta}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
          >
            Confirmar
          </button>
        )}
        <button
          onClick={excluirConsulta}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-2"
        >
          Excluir
        </button>
      </td>
    </tr>
  )
}
