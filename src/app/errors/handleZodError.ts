import { ZodError, ZodIssue } from 'zod';
import { IErrorResponse, TErrorSources } from '../interface/error';

const handleZodError = (err: ZodError):IErrorResponse => {
  const statusCode = 400;
  const message = 'zod validation error';
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message,
    errorSources,
  };
};
export default handleZodError;
