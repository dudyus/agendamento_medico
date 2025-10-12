// src/pages/Consultas.tsx
import { useEffect, useState } from "react";
import { usePacienteStore } from "../context/PacienteContext"; 
import { useNavigate } from "react-router-dom";

type Consulta = {
  id: number;
  data: string;
  hora: string;
  paciente: { id: number; nome: string };
  profissional: { nome: string };
};

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const { logaPaciente, paciente } = usePacienteStore(); // pega o paciente logado
  const navigate = useNavigate();

  useEffect(() => {
    if (!paciente?.id) {
      const stored = localStorage.getItem("paciente")
      if (stored) logaPaciente(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/consultas`)
      .then((res) => res.json())
      .then((data: Consulta[]) => {
        const minhas = data.filter((c) => String(c.paciente.id) === String(paciente.id));
        setConsultas(minhas);
      });
  }, [paciente, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Consultas</h1>
      <ul>
        {consultas.map((c) => {
          const dataFormatada = new Date(c.data).toLocaleDateString("pt-BR")
          const horaFormatada = new Date(c.hora).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })

        return (
          <li key={c.id} className="mb-2 border p-2 rounded">
            {dataFormatada} {horaFormatada} - {c.profissional.nome}
          </li>
        )
  })}
</ul>
    </div>
  );
}
