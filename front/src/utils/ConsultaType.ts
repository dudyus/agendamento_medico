export interface ConsultaType {
  id: number
  data: string
  hora: string
  status: string
  confirmada: boolean
  ativo: boolean
  id_paciente: string
  id_profissional: number
  
  paciente: {
    id: number
    nome: string
    email: string
  }
  profissional: {
    id: number
    nome: string
  }
  admin: {
    nome: string
  }
}
