import { RequestHandler } from 'express';
import { authServices } from './auth.service';
import sendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const loginUser: RequestHandler = async (req, res) => {
  const payload = req.body;
  const result = await authServices.login(payload);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
};
const forgetPassword: RequestHandler = async (req, res) => {
  const result = await authServices.forgetPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'forget password process started successfully',
    data: result,
  });
};
export const authControllers = {
  loginUser,
  forgetPassword,
};
