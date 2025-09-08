import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
  const { email, senha } = req.body

  const mensagemPadrao = "Login ou senha incorretos"

  // Verifica se o usuário enviou e-mail e senha
  if (!email || !senha) {
    return res.status(400).json({ erro: mensagemPadrao })
  }

  try {
    // Procura o paciente pelo e-mail
    const paciente = await prisma.paciente.findFirst({ where: { email } })

    // Se não existir, retorna erro
    if (!paciente) {
      return res.status(400).json({ erro: mensagemPadrao })
    }

    // Compara a senha enviada com o hash armazenado no banco
    const senhaValida = bcrypt.compareSync(senha, paciente.senha)
    if (!senhaValida) {
      return res.status(400).json({ erro: mensagemPadrao })
    }

    // Gera o token JWT
    const token = jwt.sign(
      { pacienteLogadoId: paciente.id, pacienteLogadoNome: paciente.nome },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    )

    // Retorna os dados do paciente e o token
    res.status(200).json({
      id: paciente.id,
      nome: paciente.nome,
      email: paciente.email,
      token
    })
  } catch (error) {
    console.error("Erro no login:", error)
    res.status(500).json({ erro: "Erro ao processar login" })
  }
})

export default router
