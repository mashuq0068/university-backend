/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

const auth = (...roles: TUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'user is not authorized1');
    }
    jwt.verify(
      token,
      config.jwt_access_token as string,
      async function (err, decoded) {
        if (err) {
          return next(
            new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized2'),
          );
        }
        const { id, role } = decoded as JwtPayload;
        if (roles && !roles?.includes(role)) {
          return next(
            new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized3'),
          );
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  };
};

export default auth;
