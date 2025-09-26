import type { PacienteType } from '../utils/PacienteType'
import { create } from 'zustand'

type PacienteStore = {
    paciente: PacienteType
    logaPaciente: (pacienteLogado: PacienteType) => void
    deslogaPaciente: () => void
}
const pacienteInicial = JSON.parse(localStorage.getItem('paciente') || '{}') as PacienteType

export const usePacienteStore = create<PacienteStore>((set) => ({
  paciente: pacienteInicial, 

  logaPaciente: (pacienteLogado) => {
    localStorage.setItem('paciente', JSON.stringify(pacienteLogado)) 
    set({ paciente: pacienteLogado })
  },

  deslogaPaciente: () => {
    localStorage.removeItem('paciente')
    set({ paciente: {} as PacienteType })
  }
}))