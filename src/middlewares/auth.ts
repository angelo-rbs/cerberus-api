import UnauthorizedException from "@src/exceptions/unauthorized";
import { JWT_SECRET } from "@src/secrets";
import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";


export interface CustomHeaders extends Headers {
  authorization: string
}

export interface CustomRequest extends Request {
  userId: string
  headers: CustomHeaders
}

export interface CustomJwtPayload extends jwt.JwtPayload {
  id: string
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authHeader : string = (req.headers as CustomHeaders).authorization
  if (!authHeader)
    return next(new UnauthorizedException({ message: "Nenhum token fornecido" }))

  const partes = authHeader.split(" ")
  if (!(partes.length === 2))
    return next(new UnauthorizedException({ message: "Erro de token" }))

  const [scheme, token] = partes
  if (!/^Bearer$/i.test(scheme))
    return next(new UnauthorizedException({ message: "Formato do token inesperado" }))

  const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload
  if (!decoded) {
    return next(new UnauthorizedException({ message: "Impossível decodificar token" }))
  }

  (req as CustomRequest).userId = decoded.id

  return next()
}
