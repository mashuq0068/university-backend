import mongoose from 'mongoose';
import { IErrorResponse, TErrorSources } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError): IErrorResponse => {
  const statusCode = 400;
  const message = 'validation error';
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleValidationError;
