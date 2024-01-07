/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../Error/zodError';
import handleValidationError from '../Error/validationError';
import handleCastError from '../Error/CastError';
import handleDuplicateError from '../Error/duplicateError';
import AppError from '../Error/AppError';

export type TerrorSource = {
  path: string | number;
  message: string;
}[];

export type TgenaratedRespone = {
  success: boolean;
  message: string;
  errorSource: TerrorSource;
};

const globalErrorHandle: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message: string = err.sms || 'Error';
  let errorMessage: string = err.message || 'Error';
  let statusCode = 404;

  if (err instanceof ZodError) {
    const simpleError = handleZodError(err);
    message = 'Zod Error';
    errorMessage = simpleError?.errorMessage;
    statusCode = simpleError?.statusCode;
  } else if (err.name === 'ValidationError') {
    const simpleError = handleValidationError(err);
    message = 'Schema Validation Error';
    errorMessage = simpleError?.errorMessage;
    statusCode = simpleError?.statusCode;
  } else if (err.name === 'CastError') {
    const simpleError = handleCastError(err);
    message = 'Cast Error';
    errorMessage = simpleError?.errorMessage;
    statusCode = simpleError?.statusCode;
  } else if (err.code === 11000) {
    const simpleError = handleDuplicateError(err);
    message = 'Duplicate Error';
    errorMessage = simpleError?.errorMessage;
    statusCode = simpleError?.statusCode;
  } else if (err instanceof AppError) {
    errorMessage = err?.message;
    statusCode = err?.statuCode;
  } else if (err instanceof Error) {
    errorMessage = err?.message;
  }

  if (err.statuCode === 401) {
    message = 'Unauthorized Access';
    err = null;
  }

  return res.status(404).json({
    success: false,
    message: message,
    errorMessage,
    errorDetails: err,
  });
};
export default globalErrorHandle;
