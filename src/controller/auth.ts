import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync, compare } from "bcrypt";
import * as jwt from "jsonwebtoken"

import { prisma } from "@src/index";
import { JWT_SECRET } from "@src/secrets";
import { registroUsuarioSchema } from "@src/schemas/usuario";
import { ErrorCode } from "@src/exceptions/root";
import BadRequestException from "@src/exceptions/bad-request";
import NotFoundException from "@src/exceptions/not-found";
import { removerAtributos } from "@src/utils/usuario";

const ONE_DAY_IN_SECONDS : number = 86400

export const helloWorld = async(req: Request, res: Response, next: NextFunction) => {
  return next(res.status(200).send('hello world!'))
}

type GeracaoTokenProps = {
  idUsuario: string
}

const gerarToken = (params: GeracaoTokenProps) => {
  return jwt.sign(params, JWT_SECRET, { expiresIn: ONE_DAY_IN_SECONDS })
}


export const registrar = async (req: Request, res: Response, next: NextFunction) => {

  const parsedDTO = registroUsuarioSchema.parse(req.body)
  const { nome, email, senha, username } = parsedDTO

  let usuarioExistente = await prisma.usuario.findFirst({ where: {
    OR: [{ username }, { email }]
  }})

  if (usuarioExistente && usuarioExistente.email == email)
    return next(new BadRequestException(
      { message: 'E-mail já utilizado.', errorCode: ErrorCode.USUARIO_JA_EXISTE }))

  if (usuarioExistente && usuarioExistente.username == username)
    return next(new BadRequestException(
      { message: 'Nome de usuário já utilizado.', errorCode: ErrorCode.USUARIO_JA_EXISTE }))

  const usuarioCriado = await prisma.usuario.create({
      data: {
        email,
        username,
        senha: hashSync(senha, 10),
        nome
      }
    })

  const usuarioSemSenha = removerAtributos(usuarioCriado, ['senha'])
  const token = gerarToken({ idUsuario: usuarioCriado.id })

  return next(res.status(201).json({ usuarioSemSenha, token }))
}

export const autenticar = async (req: Request, res: Response, next: NextFunction) => {

  const { credencial, senha } = req.body

  const usuarioEncontrado = await prisma.usuario.findFirst({
    where: {
      OR: [{ username: credencial }, { email: credencial }]
    },
  })

  if (!usuarioEncontrado)
    return next(new NotFoundException(
      { message: 'Usuário não encontrado.', errorCode: ErrorCode.USUARIO_NAO_ENCONTRADO }))

  if (!await compare(senha, usuarioEncontrado.senha))
    return next(new BadRequestException(
      { message: 'Senha incorreta.', errorCode: ErrorCode.SENHA_INCORRETA }))


  // remove a senha do objeto
  const usuario = removerAtributos(usuarioEncontrado, ['senha'])
  const token = gerarToken({ idUsuario: usuario.id })

  res.json({ usuario, token })
}
