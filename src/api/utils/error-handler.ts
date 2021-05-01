import type { FastifyReply } from 'fastify';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { JsonWebTokenError } from 'jsonwebtoken';
import type { Validation } from '../types/util';

export class ErrorResponse extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler: (err: ErrorResponse | unknown, res: FastifyReply) => void = (
  err,
  res,
) => {
  if (err instanceof ErrorResponse) {
    const { message, status } = err;
    switch (status) {
      case 400:
        res.badRequest(message);
        break;
      case 403:
        res.forbidden(message);
        break;
      case 404:
        res.notFound(message);
        break;
      default:
        res.internalServerError('server error');
    }
  } else if (err instanceof UniqueConstraintError) {
    const errValue = err.errors[0].value;
    const errMsg = `${errValue} already used`;
    res.badRequest(errMsg);
  } else if (err instanceof ValidationError) {
    const errMsg = err.errors[0].message;
    res.unprocessableEntity(errMsg);
  } else if (err instanceof JsonWebTokenError) {
    res.forbidden();
  } else throw new Error('...');
};

export const schemaValidationError: (
  err: Error & { validation: Validation[]; validationContext: string },
  res: FastifyReply,
) => void = (err, res) => {
  const context = err.validationContext;
  if (context === 'headers') res.forbidden();

  res.unprocessableEntity();
};
