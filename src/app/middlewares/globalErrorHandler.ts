/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { NextFunction, Request, Response } from "express";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = 500;
    const message = err.message || 'something went wrong';
    res.status(status).json({
      success: false,
      message,
      error:err
    });
 
};

export default globalErrorHandler;