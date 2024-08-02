import config from '../../config';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sendEmail from '../../utils/sendEmail';

const login = async (payload: ILoginUser) => {
  const user = await UserModel.findOne({ id: payload?.id }).select('+password');
  if (!(await UserModel?.isUserExist(payload?.id))) {
    throw new AppError(404, 'Invalid id. No user found with this id');
  }

  if (user?.status === 'blocked') {
    throw new AppError(402, 'user has been blocked by authorization');
  }
  const checkPassword = bcrypt.compare(
    payload?.password,
    user?.password as string,
  );
  if (!checkPassword) {
    throw new AppError(402, 'user password is not valid');
  }
  const data = {
    id: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(data, config.jwt_access_token as string, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign(data, config.jwt_refresh_token as string, {
    expiresIn: '360d',
  });
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
const forgetPassword = async (payload: ILoginUser) => {
  const id = payload?.id;
  const token = jwt.sign(payload, config.jwt_access_token as string, {
    expiresIn: '10min',
  });

  const url = `http://localhost:3000/?id=${id}&token=${token}`;
  sendEmail(url);
  const hashedPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await UserModel.findOneAndUpdate(
    { id: id },
    {
      $set: {
        password: hashedPassword,
      },
    },
    { new: true, runValidators: true },
  );
  return result;
};

export const authServices = {
  login,
  forgetPassword,
};
