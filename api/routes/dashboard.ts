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

type ClienteGroupByCidade = {
  cidade: string
  _count: {
    cidade: number
  }
}

// router.get("/clientesCidade", async (req, res) => {
//   try {
//     const clientes = await prisma.cliente.groupBy({
//       by: ['cidade'],
//       _count: {
//         cidade: true,
//       },
//     })

//     const clientes2 = clientes.map((cliente: ClienteGroupByCidade) => ({
//       cidade: cliente.cidade,
//       num: cliente._count.cidade
//     }))

//     res.status(200).json(clientes2)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

export default router