import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const funcoesSchema = z.object({
  nome_funcao: z.string().min(3,
    { message: "A função deve possuir, no mínimo, 3 caracteres" }),
})

router.get("/", async (req, res) => {
  try {
    const funcoes = await prisma.funcao.findMany()
    res.status(200).json(funcoes)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = funcoesSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome_funcao } = valida.data

  try {
    const funcao = await prisma.funcao.create({
      data: { nome_funcao }
    })
    res.status(201).json(funcao)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const funcao = await prisma.funcao.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(funcao)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = funcoesSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome_funcao } = valida.data

  try {
    const funcao = await prisma.funcao.update({
      where: { id: Number(id) },
      data: { nome_funcao }
    })
    res.status(200).json(funcao)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router