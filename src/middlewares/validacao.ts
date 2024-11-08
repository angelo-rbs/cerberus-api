import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";


    /**
 * Aplica a validação do schema e encaminha para o middleware de erros caso inválido
 */
const validar = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      next(err); // Passa o erro para o errorMiddleware
    }
  };

export default validar
