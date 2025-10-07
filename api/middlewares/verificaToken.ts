import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'

type TokenType = {
  userLogadoId: number
  userLogadoNome: string
  userLogadoNivel: number
}

export function verificaToken(req: Request | any, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({ error: "Token não informado" })
    return
  }

  const token = authorization.split(" ")[1]

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY as string)
    const { userLogadoId, userLogadoNome, userLogadoNivel } = decode as TokenType

    req.userLogadoId    = userLogadoId
    req.userLogadoNome  = userLogadoNome
    req.userLogadoNivel = userLogadoNivel

    next()
  } catch (error) {
    res.status(401).json({ error: "Token inválido" })
  }
}