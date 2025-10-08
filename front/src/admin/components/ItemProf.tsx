import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"

import type { ProfissionalType } from "../../utils/ProfissionalType"
import { useAdminStore } from "../context/AdminContext"

type listaCarroProps = {
  profissional: ProfissionalType;
  profissionais: ProfissionalType[];
  setProfissionais: React.Dispatch<React.SetStateAction<ProfissionalType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProf({ profissional, profissionais, setProfissionais }: listaCarroProps) {
  const { admin } = useAdminStore()

  async function excluirProf() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir profissionais");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/profissionais/${profissional.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const profissionais2 = profissionais.filter(x => x.id != profissional.id)
        setProfissionais(profissionais2)
        alert("Profisisonal excluído com sucesso")
      } else {
        alert("Erro... Profissional não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${apiUrl}/profissionais/destacar/${profissional.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.status == 200) {
      const profissionais2 = profissionais.map(x => {
        if (x.id == profissional.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setProfissionais(profissionais2)
    }
  }

  return (
    <tr key={profissional.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={profissional.foto} alt={`Foto do ${profissional.funcao}`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${profissional.destaque ? "font-extrabold" : ""}`}>
        {profissional.nome}
      </td>
      <td className={`px-6 py-4 ${profissional.destaque ? "font-extrabold" : ""}`}>
        {profissional.funcao.nome_funcao}
      </td>
      <td className={`px-6 py-4 ${profissional.destaque ? "font-extrabold" : ""}`}>
        {Number(profissional.ano_inicio_carreira)}
      </td>
      <td className={`px-6 py-4 ${profissional.destaque ? "font-extrabold" : ""}`}>
        {Number(profissional.idade)}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirProf} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}