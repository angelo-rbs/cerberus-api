
export type CustomErrorContent = {
  message: string,
  context?: { [key: string]: any }
};

export abstract class HttpException extends Error {

  abstract readonly statusCode: number
  abstract readonly errorCode: number
  abstract readonly logging: boolean
  abstract readonly errors: CustomErrorContent[]

  constructor(message: string) {
    super(message)

    // porque extende uma classe built-in
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export enum ErrorCode {
  USUARIO_NAO_ENCONTRADO = 1000,
  USUARIO_JA_EXISTE = 1001,
  SENHA_INCORRETA = 1003,
}

export enum HttpStatusCode {

  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  INTERNAL_SERVER_ERROR = 500

}
