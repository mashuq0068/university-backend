/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError || err instanceof Error) {
    status = err instanceof AppError ? err?.statusCode : 500;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(status).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : '',
    // err,
  });
};

export default globalErrorHandler;
