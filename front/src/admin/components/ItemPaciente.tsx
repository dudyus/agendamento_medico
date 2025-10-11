import { TiDeleteOutline } from "react-icons/ti"
// import { FaRegStar } from "react-icons/fa"

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

  async function excluirPaciente() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir pacientes");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/pacientes/${paciente.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const pacientes2 = pacientes.filter(x => x.id != paciente.id)
        setPacientes(pacientes2)
        alert("Paciente excluído com sucesso")
      } else {
        alert("Erro... Paciente não foi excluído")
      }
    }
  }

  // async function alterarDestaque() {

  //   const response = await fetch(`${apiUrl}/pacientes/destacar/${paciente.id}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${admin.token}`
  //       },
  //     },
  //   )

  //   if (response.status == 200) {
  //     const pacientes2 = pacientes.map(x => {
  //       if (x.id == paciente.id) {
  //         return { ...x, destaque: !x.destaque }
  //       }
  //       return x
  //     })
  //     setPacientes(pacientes2)
  //   }
  // }

  return (
    <tr key={paciente.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {paciente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {paciente.email}
      </td>
      <td className={`px-6 py-4`}>
        {paciente.fone}
      </td>
      <td className={`px-6 py-4`}>
        {paciente.endereco}
      </td>
      <td className={`px-6 py-4`}>
        {paciente.cpf}
      </td>
      <td className={`px-6 py-4`}>
        {paciente.data_nasc}
      </td>
      
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirPaciente} />&nbsp;
        {/* <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} /> */}
      </td>
    </tr>
  )
}