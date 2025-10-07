import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const pacientes = await prisma.paciente.count()
    const profissionais = await prisma.profissional.count()
    const consultas = await prisma.consulta.count()
    res.status(200).json({ pacientes, profissionais, consultas })
  } catch (error) {
    res.status(400).json(error)
  }
})

type FuncaoGroupByName = {
  nome_funcao: string
  _count: {
    profissionais: number
  }
}

router.get("/profissionaisFuncao", async (req, res) => {
  try {
    const funcoes = await prisma.funcao.findMany({
      select: {
        nome_funcao: true,
        _count: {
          select: { profissionais: true }
        }
      }
    })

    const funcoes2 = funcoes
        .filter((item: FuncaoGroupByName) => item._count.profissionais > 0)
        .map((item: FuncaoGroupByName) => ({
            funcao: item.nome_funcao,
            num: item._count.profissionais
        }))
    res.status(200).json(funcoes2)
  } catch (error) {
    res.status(400).json(error)
  }
})

type ConsultaGroupByTipo = {
  tipo: string
  _count: {
    tipo: number
  }
}

router.get("/consultasTipo", async (req, res) => {
  try {
    const consultas = await prisma.consulta.groupBy({
      by: ['tipo'],
      _count: {
        tipo: true,
      },
    })

    const consultas2 = consultas.map((consulta: ConsultaGroupByTipo) => ({
      tipo: consulta.tipo,
      num: consulta._count.tipo
    }))

    res.status(200).json(consultas2)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router