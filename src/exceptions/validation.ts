
import BadRequestException from "./bad-request";
import { HttpException, HttpStatusCode } from "./root";

export default class ValidationError extends BadRequestException {

  readonly statusCode = HttpStatusCode.BAD_REQUEST
  readonly errorCode: number
  readonly logging: boolean
  readonly context: { [key: string]: any }

  constructor( params: { errorCode?: number, message: string, logging?: boolean,
    context?: { [key: string]: any}
  }) {

    const { errorCode, message, logging } = params

    super({ message })
    this.errorCode =  errorCode || 0
    this.logging = logging || false
    this.context = params?.context || { }

    // porque extende uma classe built-in
    Object.setPrototypeOf(this, HttpException.prototype)
  }

  get errors() {
    return [{ message: this.message, context: this.context }]
  }
}
