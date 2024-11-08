import express, { Express } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import rootRouter from '@routes/index'
import { errorMiddleware } from './middlewares/erros'
import { authMiddleware } from './middlewares/auth'

import listEndpoints from 'express-list-endpoints'
import { helloWorld } from './controller/auth'

dotenv.config()

const app: Express = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


export const prisma = new PrismaClient({log: ["query"]})




async function main() {


    app.use("/api", rootRouter)
    console.log(listEndpoints(app))
    app.use(errorMiddleware)


    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}


main()
    .catch((e => {
        console.error(e)
        throw e
    }))
    .finally(async () => await prisma.$disconnect())
