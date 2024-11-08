import { HttpException } from "./root";


export default class BadRequestException extends HttpException {

  readonly statusCode  = 400
  readonly errorCode: number
  readonly logging: boolean
  readonly context: { [key: string]: any }


  constructor( params: { errorCode?: number, message: string, logging?: boolean
    context?: { [key: string]: any }}) {

    const { errorCode, message, logging } = params

    super(message || 'Bad request')
    this.errorCode =  errorCode || 0
    this.logging = logging || false
    this.context = params?.context || { }

    // porque extende uma classe built-in
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this.context }]
  }
}
