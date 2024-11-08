import express, { Express, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import rootRouter from '@routes/index'
import { errorMiddleware } from './middlewares/erros'

import listEndpoints from 'express-list-endpoints'

dotenv.config()

const app: Express = express()
app.use(express.json())

const PORT = process.env.PORT || 3000


export const prisma = new PrismaClient({log: ["query"]})




async function main() {

    app.use("/api", rootRouter)
    app.use(errorMiddleware)

    console.log(listEndpoints(app))

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
