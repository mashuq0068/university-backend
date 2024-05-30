import { IAcademicSemester } from '../academicSemister/academicSemester.interface';
import { academicSemesterModel } from '../academicSemister/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import generateStudentId from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const academicSemester = await academicSemesterModel.findById(
    studentData.academicSemester,
  );
  
  const userData: Partial<IUser> = {
    id:await generateStudentId(academicSemester as IAcademicSemester),
    password: password || process.env.DEFAULT_PASS,
    role:'student',
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
