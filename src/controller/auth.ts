import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync, compare } from "bcrypt";
import * as jwt from "jsonwebtoken"

import { prisma } from "@src/index";
import { JWT_SECRET } from "@src/secrets";
import { loginSchema, userRegisterSchema } from "@src/schemas/user";
import { ErrorCode } from "@src/exceptions/root";
import BadRequestException from "@src/exceptions/bad-request";
import NotFoundException from "@src/exceptions/not-found";
import { remove } from "@src/utils/user";

const ONE_DAY_IN_SECONDS : number = 86400

export const helloWorld = async(req: Request, res: Response, next: NextFunction) => {
  return next(res.status(200).send('hello world!'))
}

type TokenGeneratorProps = {
  userId: string
}

const generateToken = (params: TokenGeneratorProps) => {
  return jwt.sign(params, JWT_SECRET, { expiresIn: ONE_DAY_IN_SECONDS })
}


export const register = async (req: Request, res: Response, next: NextFunction) => {

  const parsedDTO = userRegisterSchema.parse(req.body)
  const { name, email, password, username } = parsedDTO

  let existentUser = await prisma.user.findFirst({ where: {
    OR: [{ username }, { email }]
  }})

  if (existentUser && existentUser.email == email)
    return next(new BadRequestException(
      { message: 'E-mail já utilizado.', errorCode: ErrorCode.USER_ALREADY_EXISTS }))

  if (existentUser && existentUser.username == username)
    return next(new BadRequestException(
      { message: 'Nome de usuário já utilizado.', errorCode: ErrorCode.USER_ALREADY_EXISTS }))

  const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashSync(password, 10),
        name
      }
    })

  const userWithoutPassword = remove(newUser, ['password'])
  const token = generateToken({ userId: newUser.id })

  return next(res.status(201).json({ userWithoutPassword, token }))
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {

  const { credential, password } = loginSchema.parse(req.body)

  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: credential }, { email: credential }]
    },
  })

  if (!foundUser)
    return next(new NotFoundException(
      { message: 'Usuário não encontrado.', errorCode: ErrorCode.USER_NOT_FOUND }))

  if (!await compare(password, foundUser.password))
    return next(new BadRequestException(
      { message: 'Senha incorreta.', errorCode: ErrorCode.INCORRECT_PASSWORD }))


  // removes password attribute from object
  const user = remove(foundUser, ['password'])
  const token = generateToken({ userId: user.id })

  res.json({ user, token })
}
