import { Router } from "express";
import publicRoutes from "./public";
import privateRoutes from "./private";
import { authMiddleware } from "@src/middlewares/auth";

const rootRouter = Router()

rootRouter.use(publicRoutes)
rootRouter.use(authMiddleware, privateRoutes)

export default rootRouter
