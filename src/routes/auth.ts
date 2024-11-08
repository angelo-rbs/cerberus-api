import { Router } from "express";
import { auth, register } from "@controller/auth";
import validate from "@src/middlewares/validacao";
import { loginSchema, userRegisterSchema } from "@src/schemas/user";

const authRoutes = Router()

authRoutes.post('/autenticar', validate(loginSchema), auth)
authRoutes.post('/registrar', validate(userRegisterSchema), register)

export default authRoutes
