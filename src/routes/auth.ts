import { Router } from "express";
import { autenticar, registrar } from "@controller/auth";
import validate from "@src/middlewares/validacao";
import { loginSchema, registroUsuarioSchema } from "@src/schemas/usuario";

const authRoutes = Router()

authRoutes.post('/autenticar', validate(loginSchema), autenticar)
authRoutes.post('/registrar', validate(registroUsuarioSchema), registrar)

export default authRoutes
