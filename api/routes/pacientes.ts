import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const pacienteSchema = z.object({
  nome: z.string().min(10, {
    message: "Nome do paciente deve possuir, no mínimo, 10 caracteres"
  }),
  email: z.string().email({message: "Informe um e-mail válido"}),
  senha: z.string(),
  fone: z.string(),
  endereco: z.string(),
  data_nasc: z.date(),
  cpf: z.string()
})

router.get("/", async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany()
    res.status(200).json(pacientes)
  } catch (error) {
    res.status(400).json(error)
  }
})

function validaSenha(senha: string) {

  const mensa: string[] = []

  if (senha.length < 8) {
    mensa.push("A senha deve possuir, no mínimo, 8 caracteres")
  }

  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0) {
    mensa.push("A senha deve possuir letra(s) minúscula(s)")
  }

  if (grandes == 0) {
    mensa.push("A senha deve possuir letra(s) maiúscula(s)")
  }

  if (numeros == 0) {
    mensa.push("A senha deve possuir número(s)")
  }

  if (simbolos == 0) {
    mensa.push("A senha deve possuir símbolo(s)")
  }

  return mensa
}

router.post("/", async (req, res) => {

  const valida = pacienteSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const erros = validaSenha(valida.data.senha)
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") })
    return
  }

  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(valida.data.senha, salt)
 
  const { nome, email, fone, endereco, data_nasc, cpf } = valida.data

  try {
    const paciente = await prisma.paciente.create({
      data: { nome, email, senha: hash, fone, endereco, data_nasc, cpf  }
    })
    res.status(201).json(paciente)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const paciente = await prisma.paciente.findUnique({
      where: { id }
    })
    res.status(200).json(paciente)
  } catch (error) {
    res.status(400).json(error)
  }
})


export default router