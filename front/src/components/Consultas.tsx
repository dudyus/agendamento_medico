// src/pages/Consultas.tsx
import { useEffect, useState } from "react";

type Consulta = {
  id: number;
  data: string;
  hora: string;
  paciente: { nome: string };
  profissional: { nome: string };
};

export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/consultas`)
      .then((res) => res.json())
      .then(setConsultas);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Minhas Consultas</h1>
      <ul>
        {consultas.map((c) => (
          <li key={c.id} className="mb-2 border p-2 rounded">
            {c.data} {c.hora} - {c.paciente.nome} com {c.profissional.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
