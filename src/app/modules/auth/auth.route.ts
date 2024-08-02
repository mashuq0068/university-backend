import express from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { authControllers } from './auth.controller';
const router = express.Router();
router.post('/login-user', asyncHandler(authControllers.loginUser));
router.post('/forget-password', asyncHandler(authControllers.forgetPassword));
export const authRoutes = router;
