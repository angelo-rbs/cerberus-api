import { HttpException, HttpStatusCode } from "@src/exceptions/root";
import { NextFunction, Request, Response } from "express";
import { ZodError} from "zod"

export const errorMiddleware = (err: Error, _: Request, res: Response, next: NextFunction) => {

  if (err instanceof ZodError) {

    return next(res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: err.errors.map((e) => ({
        path: e.path,
        message: e.message,
      })),
    }))

  } else if (err instanceof HttpException) {
    const { statusCode, errors, logging, message} = err
    console.log(err)

    if (logging) {
      console.error(JSON.stringify({
        code: statusCode,
        errors: errors,
        stack: err.stack
      }, null, 2))
    }

    return next(res.status(statusCode).send({ message:  message, errors }))
  }


  // Unhandled errors
  return next(res.status(500).send({ errors: [{ message: "Something went wrong" }] }))
}
