import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
  const { nome, email, senha, fone, endereco, data_nasc, cpf } = req.body

  const mensaPadrao = "Login ou senha incorretos"

  if (!email || !senha) {
    // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    const paciente = await prisma.paciente.findFirst({
      where: { email }
    })

    if (paciente == null) {
      // res.status(400).json({ erro: "E-mail inválido" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    // se o e-mail existe, faz-se a comparação dos hashs
    if (bcrypt.compareSync(senha, paciente.senha)) {
      // se confere, gera e retorna o token
      const token = jwt.sign({
        pacienteLogadoId: paciente.id,
        pacienteLogadoNome: paciente.nome
      },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      )

      res.status(200).json({
        id: paciente.id,
        nome: paciente.nome,
        email: paciente.email,
        token
      })
    } else {
      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router