import { PrismaClient, Status } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'
import { Tipo } from "@prisma/client"


const prisma = new PrismaClient()
const router = Router()

const consultaSchema = z.object({
  id_paciente: z.string(),
  id_profissional: z.number(),
  data: z.string(), 
  hora: z.string(),
  tipo: z.nativeEnum(Tipo).optional(),
  confirmada: z.boolean().optional(),
  admin_id: z.number()
})

router.get("/", async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      include: {
        paciente: true,
        profissional: true,
        admin: true
      },
      orderBy: { id: 'desc' }
    })
    res.status(200).json(consultas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const valida = consultaSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { id_paciente, id_profissional, data, hora, tipo, confirmada, admin_id } = valida.data

  try {
    const consulta = await prisma.consulta.create({
      data: {
        id_paciente, id_profissional, data, hora, tipo, confirmada, admin_id
      }
    })
    res.status(201).json(consulta)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id_paciente", async (req, res) => {
  const { id_paciente } = req.params
  try {
    const consultas = await prisma.consulta.findMany({
      where: { id_paciente },
      include: {
        profissional: true,
        admin: true
      },
      orderBy: { data: 'desc' }
    })
    res.status(200).json(consultas)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router