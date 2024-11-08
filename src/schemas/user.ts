import { z } from "zod"

export const userRegisterSchema = z.object({
  email: z.string().email({ message:  'E-mail inválido.' }),
  username: z.string({message: ''}),
  password: z.string()
    .min(8, { message: 'A senha deve conter entre 8 e 40 caracteres.'})
    .max(40, { message: 'A senha deve conter entre 8 e 40 caracteres.'}),
  name: z.string()
})


// identifier could be email or usernam

export const loginSchema = z.object({
  credential: z.string() || z.string().email(),
  password: z.string().min(8)
})

