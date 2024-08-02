/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import USER_ROLE from './user.constant';

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export type TUserRole = keyof typeof USER_ROLE
export interface IUserMethods extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
  // isUserDeleted(id: string): Promise<boolean | null>;
}
