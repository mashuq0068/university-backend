import mongoose from 'mongoose';
import { IAcademicSemester } from '../academicSemister/academicSemester.interface';
import { academicSemesterModel } from '../academicSemister/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import { IFaculty } from '../faculty/faculty.interface';
import config from '../../config';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const academicSemester = await academicSemesterModel.findById(
    studentData.academicSemester,
  );


  const userData: Partial<IUser> = {
    id: await generateStudentId(academicSemester as IAcademicSemester),
    password: password || process.env.DEFAULT_PASS,
    role: 'student',
  };
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await UserModel.create([userData], { session });

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    const newStudent = await Student.create([studentData], { session });
    // if (!newStudent.length) {
    //   throw new AppError(
    //     httpStatus.BAD_REQUEST,
    //     'something went wrong. student can not create',
    //   );
    // }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  const user: Partial<IUser> = {
    id: await generateFacultyId(),
    password: password || config.default_pass,
    role: 'faculty',
  };
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await UserModel.create([user], { session });

    if (newUser.length) {
      console.log('working for faculty');
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      const result = await Faculty.create([payload], { session });
      await session.commitTransaction();
      await session.endSession();
      return result;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('can not create Faculty');
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
