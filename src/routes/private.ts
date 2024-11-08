import { helloWorld } from "@src/controller/auth";
import { Router } from "express";

export const privateRoutes = Router()

// registro de rotas aqui

privateRoutes.use(helloWorld)

export default privateRoutes
