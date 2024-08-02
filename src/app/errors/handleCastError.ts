import mongoose from 'mongoose';
import { IErrorResponse, TErrorSources } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): IErrorResponse => {
  const statusCode = 400;
  const message = 'invalid data request';
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};
export default handleCastError;
