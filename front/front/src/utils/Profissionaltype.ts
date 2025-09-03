import type { FuncaoType } from "./FuncaoType"

export type ProfissionalType = {
  id: number            
  nome: string          
  idade: number             
  genero: string
  ano_inicio_carreira: number  
  foto: string          
  id_funcao: number           
  funcao: FuncaoType }          