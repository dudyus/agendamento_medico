export interface ConsultaType {
  id: number
  data: string
  hora: string
  confirmada: boolean
  ativo: boolean
  id_paciente: string
  id_profissional: number
  
  paciente: {
    nome: string
    email: string
  }
  profissional: {
    nome: string
  }
  admin: {
    nome: string
  }
}
