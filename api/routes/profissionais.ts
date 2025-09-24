import { Genero, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const profissionalSchema = z.object({
  nome: z.string().min(2,
    { message: "Nome deve possuir, no mínimo, 2 caracteres" }),
  idade: z.number(),
  genero: z.nativeEnum(Genero),
  ano_inicio_carreira: z.number(),
  foto: z.string(),
  destaque: z.boolean(),
  id_funcao: z.number()

})

router.get("/", async (req, res) => {
  try {
    const profissionais = await prisma.profissional.findMany({
      include: {
        funcao: true,
      }
    })
    res.status(200).json(profissionais)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get("/destaques", async (req, res) => {
  try {
    const profissionais = await prisma.profissional.findMany({
      include: {
        funcao: true,
      }
      // ,
      // where: {
      //   destaque: true // add destaque na model prof.
      // }
    })
    res.status(200).json(profissionais)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const profissional = await prisma.profissional.findFirst({
      where: { id: Number(id)},
      include: {
        funcao: true,
      }
    })
    res.status(200).json(profissional)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})


router.post("/", async (req, res) => {

  const valida = profissionalSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, idade, genero, ano_inicio_carreira, foto, destaque, id_funcao } = valida.data

  try {
    const profissional = await prisma.profissional.create({
      data: {
        nome, idade, genero, ano_inicio_carreira, foto, destaque, id_funcao
      }
    })
    res.status(201).json(profissional)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const profissional = await prisma.profissional.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(profissional)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = profissionalSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, idade, genero, ano_inicio_carreira, foto, id_funcao } = valida.data

  try {
    const profissional = await prisma.profissional.update({
      where: { id: Number(id) },
      data: { nome, idade, genero, ano_inicio_carreira, foto, id_funcao}
    })
    res.status(200).json(profissional)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  // tenta converter para número
  const termoNumero = Number(termo)

  // is Not a Number, ou seja, se não é um número: filtra por texto
  if (isNaN(termoNumero)) {
    try {
      const profissionais = await prisma.profissional.findMany({
        include: {
          funcao: true,
        },
        where: {
          OR: [
            { nome: { contains: termo, mode: "insensitive" } },
            { funcao: { nome_funcao: {contains: termo, mode: "insensitive" } } }
          ]
        }
      })
      res.status(200).json(profissionais)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  } else {
    res.status(400).json({ erro: "Pesquisa numérica não implementada"})
  }
})

export default router
