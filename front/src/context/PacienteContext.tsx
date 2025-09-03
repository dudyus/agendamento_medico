import type { PacienteType } from '../utils/PacienteType'
import { create } from 'zustand'

type PacienteStore = {
    paciente: PacienteType
    logaPaciente: (pacienteLogado: PacienteType) => void
    deslogaPaciente: () => void
}

export const usePacienteStore = create<PacienteStore>((set) => ({
    paciente: {} as PacienteType,
    logaPaciente: (pacienteLogado) => set({paciente: pacienteLogado}),
    deslogaPaciente: () => set({paciente: {} as PacienteType})
}))