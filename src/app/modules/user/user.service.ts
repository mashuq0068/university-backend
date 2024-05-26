import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<IUser> = {
    id: '2000393939',
    password: password || process.env.DEFAULT_PASS,
    role: 'student',
  };

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const result = await Student.create(studentData);
    return result;
  }
};

export const userServices = {
  createStudentIntoDB,
};
