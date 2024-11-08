import { Router } from "express";
import authRoutes from "./auth";

export const publicRoutes = Router()

publicRoutes.use("/auth", authRoutes)

export default publicRoutes
