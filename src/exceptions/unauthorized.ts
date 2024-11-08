import { HttpException, HttpStatusCode } from "./root";


export default class UnauthorizedException extends HttpException {

  readonly statusCode = HttpStatusCode.UNAUTHORIZED
  readonly errorCode: number
  readonly logging: boolean
  readonly context: { [key: string]: any }

  constructor( params: { errorCode?: number, message: string, logging?: boolean,
    context?: { [key: string]: any}
  }) {

    const { errorCode, message, logging } = params

    super(message || 'Unauthorized')
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
