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
  data_nasc: z.coerce.date(),
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const paciente = await prisma.paciente.delete({
      where: { id: String(id) }
    })
    res.status(200).json(paciente)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params

  try {
    // valida os campos que vierem
    const dados = pacienteSchema.partial().safeParse(req.body)
    if (!dados.success) {
      return res.status(400).json({ erro: dados.error })
    }

    const pacienteExistente = await prisma.paciente.findUnique({
      where: { id: String(id) }
    })

    if (!pacienteExistente) {
      return res.status(404).json({ erro: "Paciente não encontrado" })
    }

    let novaSenha = pacienteExistente.senha

    // Se o usuário quiser atualizar a senha
    if (dados.data.senha) {
      const erros = validaSenha(dados.data.senha)
      if (erros.length > 0) {
        return res.status(400).json({ erro: erros.join("; ") })
      }

      const salt = bcrypt.genSaltSync(12)
      novaSenha = bcrypt.hashSync(dados.data.senha, salt)
    }

    const pacienteAtualizado = await prisma.paciente.update({
      where: { id: String(id) },
      data: {
        ...dados.data,
        senha: novaSenha, // garante que senha atualizada (ou antiga) seja usada
      },
    })

    res.status(200).json(pacienteAtualizado)
  } catch (error) {
    console.error(error)
    res.status(400).json({ erro: "Erro ao atualizar paciente" })
  }
})


export default router