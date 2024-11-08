import { Router } from "express";
import publicRoutes from "./public";
import privateRoutes from "./private";

const rootRouter = Router()

rootRouter.use(publicRoutes)

rootRouter.use(privateRoutes)

export default rootRouter
