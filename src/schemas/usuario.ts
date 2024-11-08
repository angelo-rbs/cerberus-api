import { z } from "zod"

export const registroUsuarioSchema = z.object({
  email: z.string().email({ message:  'E-mail inválido.' }),
  username: z.string({message: ''}),
  senha: z.string()
    .min(8, { message: 'A senha deve conter entre 8 e 40 caracteres.'})
    .max(40, { message: 'A senha deve conter entre 8 e 40 caracteres.'}),
  nome: z.string()
})


// identifier could be email or usernam

export const loginSchema = z.object({
  credencial: z.string() || z.string().email(),
  senha: z.string().min(8)
})

type UserRegistrationDTO = z.infer<typeof registroUsuarioSchema>
