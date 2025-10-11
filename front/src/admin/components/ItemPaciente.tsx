import { useState } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FiEdit } from "react-icons/fi"
import type { PacienteType } from "../../utils/PacienteType"
import { useAdminStore } from "../context/AdminContext"

type listaPacienteProps = {
  paciente: PacienteType;
  pacientes: PacienteType[];
  setPacientes: React.Dispatch<React.SetStateAction<PacienteType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemPaciente({ paciente, pacientes, setPacientes }: listaPacienteProps) {
  const { admin } = useAdminStore()
  const [showModal, setShowModal] = useState(false)

  const [editNome, setEditNome] = useState(paciente.nome)
  const [editEmail, setEditEmail] = useState(paciente.email)
  const [editFone, setEditFone] = useState(paciente.fone || "")
  const [editEndereco, setEditEndereco] = useState(paciente.endereco || "")
  const [editDataNasc, setEditDataNasc] = useState(paciente.data_nasc || "")
  const [editCpf, setEditCpf] = useState(paciente.cpf || "")

  async function excluirPaciente() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir pacientes");
      return;
    }

    if (confirm(`Confirma a exclusão?`)) {
      const response = await fetch(`${apiUrl}/pacientes/${paciente.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      })

      if (response.status == 200) {
        const pacientes2 = pacientes.filter(x => x.id != paciente.id)
        setPacientes(pacientes2)
        alert("Paciente excluído com sucesso")
      } else {
        alert("Erro... Paciente não foi excluído")
      }
    }
  }

  async function salvarEdicao() {
    if (!admin) {
      alert("Você precisa estar logado para editar");
      return;
    }

    const response = await fetch(`${apiUrl}/pacientes/${paciente.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin.token}`
      },
      body: JSON.stringify({
        nome: editNome,
        email: editEmail,
        fone: editFone,
        endereco: editEndereco,
        data_nasc: editDataNasc,
        cpf: editCpf
      })
    })

    if (response.ok) {
      const atualizado = await response.json()
      const pacientes2 = pacientes.map(p =>
        p.id === paciente.id ? atualizado : p
      )
      setPacientes(pacientes2)
      setShowModal(false)
      alert("Paciente atualizado com sucesso!")
    } else {
      alert("Erro ao atualizar paciente")
    }
  }

  return (
    <>
      <tr key={paciente.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{paciente.nome}</td>
        <td className="px-6 py-4">{paciente.email}</td>
        <td className="px-6 py-4">{paciente.fone}</td>
        <td className="px-6 py-4">{paciente.endereco}</td>
        <td className="px-6 py-4">{paciente.cpf}</td>
        <td className="px-6 py-4">{paciente.data_nasc}</td>
        
        <td className="px-6 py-4 flex gap-2">
          <FiEdit
            className="text-2xl text-blue-600 cursor-pointer"
            title="Editar"
            onClick={() => setShowModal(true)}
          />
          <TiDeleteOutline
            className="text-3xl text-red-600 cursor-pointer"
            title="Excluir"
            onClick={excluirPaciente}
          />
        </td>
      </tr>

      {/* MODAL DE EDIÇÃO */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Editar Paciente</h2>
            
            <label className="block mb-1 text-gray-700 dark:text-gray-200">Nome</label>
            <input
              type="text"
              value={editNome}
              onChange={e => setEditNome(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
            />

            <label className="block mb-1 text-gray-700 dark:text-gray-200">E-mail</label>
            <input
              type="email"
              value={editEmail}
              onChange={e => setEditEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
            />

            <label className="block mb-1 text-gray-700 dark:text-gray-200">Telefone</label>
            <input
              type="text"
              value={editFone}
              onChange={e => setEditFone(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
            />

            <label className="block mb-1 text-gray-700 dark:text-gray-200">Endereço</label>
            <input
              type="text"
              value={editEndereco}
              onChange={e => setEditEndereco(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
            />

            <label className="block mb-1 text-gray-700 dark:text-gray-200">Data de Nascimento</label>
            <input
              type="date"
              value={editDataNasc}
              onChange={e => setEditDataNasc(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
            />

            <label className="block mb-1 text-gray-700 dark:text-gray-200">CPF</label>
            <input
              type="text"
              value={editCpf}
              onChange={e => setEditCpf(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
