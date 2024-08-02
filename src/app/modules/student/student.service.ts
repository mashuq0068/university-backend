import mongoose from 'mongoose';
import { Student } from './student.model';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm: string = '';
  // let sort = '-createdAt';
  // let limit = 3;
  // let skip = 0;
  // let fields = '-__v';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const objQuery = {
  //   ...query,
  // };

  // const excludeFields = [];
  // for (const key in objQuery) {
  //   if (!objQuery[key]) {
  //     excludeFields.push(key);
  //   }
  // }
  // excludeFields.forEach((q) => delete objQuery[q]);

  // const searchQuery = Student.find({
  //   $or: ['permanentAddress', 'contact', 'email'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // const filterQuery = searchQuery.find(objQuery);
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.skip) {
  //   skip = Number(query.skip);
  // }

  // const skipQuey = sortQuery.skip(skip * limit);

  // const limitQuery = skipQuey.limit(limit);
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');

  // }

  // const fieldQuery = await limitQuery.select(fields);
  const studentModelQuery = Student.find()
    .populate('user')
    .populate('localGuardian');
  const studentQuery = new QueryBuilder(studentModelQuery, query)
    .search(['name' , 'email'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  if (!(await Student.isUserExists(id))) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'wrong user');
  }
  await UserModel.findOneAndUpdate(
    { id: id },
    { $set: { isDeleted: true } },
    { session },
  );
  // if (!deleteUser) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new AppError(httpStatus.BAD_REQUEST, 'wrong user');
  // }
  const deleteStudent = await Student.findOneAndUpdate(
    { id: id },
    { $set: { isDeleted: true } },
    { new: true, session },
  );
  // if (!deleteStudent) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new AppError(httpStatus.BAD_REQUEST, 'student not found');
  // }
  await session.commitTransaction();
  await session.endSession();
  return deleteStudent;
};

const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  // const { name, guardian, localGuardian, ...primitiveFields } = payload;
  // const updatedStudent: Record<string, unknown> = {
  //   ...primitiveFields,
  // };
  // if (name && Object.keys(name).length) {
  //   for (const [key, value] of Object.entries(name)) {
  //     updatedStudent[`name.${key}`] = value;
  //   }
  // }
  // if (guardian && Object.keys(guardian).length) {
  //   for (const [key, value] of Object.entries(guardian)) {
  //     updatedStudent[`guardian.${key}`] = value;
  //   }
  // }
  // if (localGuardian && Object.keys(localGuardian).length) {
  //   for (const [key, value] of Object.entries(localGuardian)) {
  //     updatedStudent[`guardian.${key}`] = value;
  //   }
  // }
  // const result = await Student.findByIdAndUpdate(
  //   id,
  //   { $set: updatedStudent },
  //   {
  //     new: true,
  //     runValidators: true,
  //   },
  // );
  // return result;
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ _id : id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB,
};
