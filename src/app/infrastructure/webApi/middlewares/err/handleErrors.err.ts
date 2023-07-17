import HttpStatusCode from '@utils/httpStatusCode.utils';
import {
  Request as ExRequest,
  Response as ExResponse,
  NextFunction,
} from 'express';
import { ValidateError } from 'tsoa';

export class BadReqError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadReqError';
  }
}

export class Unauthorized extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Unauthorized';
  }
}

export const handlerError = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof BadReqError) {
    console.warn(`Caught Validation Error for ${req.path}:`);
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      statusCode: HttpStatusCode.BAD_REQUEST,
      error: "Bad Request",
      message: err.message,
    });
  }
  if (err instanceof Unauthorized) {
    console.warn(`Caught Validation Error for ${req.path}:`);
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      error: "Unauthorized",
      message: err.message,
    });
  }
  if (err instanceof Error) {
    console.warn(`Caught Validation Error for ${req.path}:`);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      error: "Internal Server Error",
      message: err.message,
    });
  }

  next();
}

// Si no encuentra ningun endpoint registrado
export const notFound = (req: ExRequest, res: ExResponse, next: NextFunction) => {
  return res
    .status(HttpStatusCode.NOT_FOUND)
    .json({
      statusCode: HttpStatusCode.NOT_FOUND,
      error: {
        code: "ERROR - Not Found",
        message: "Resource not found error",
      },
      message: "ERROR - Not Found"
    });
};

export const fatalError = (err: any) => {
  console.error(`${err.message}`);
  console.error(err.stack);
  process.exit(1);
};
