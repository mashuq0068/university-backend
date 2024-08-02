import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';

const getFacultyFromDB = async () => {
  const result = await Faculty.find();
  return result;
};
const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};
const updateSingleFacultyFromDB = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const { name, ...primitiveFields } = payload;
  const updatedData: Record<string, unknown> = {
    ...primitiveFields,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate(
    {id: id},
    { $set: updatedData },
    { new: true, runValidators: true },
  );
  return result;
};
const deleteSingleFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await UserModel.findOneAndUpdate(
      { id: id },
      { $set: { isDeleted: true } },
      { new: true, runValidators: true, session },
    );
    const result = await Faculty.findOneAndUpdate(
      { id: id },
      { $set: { isDeleted: true } },
      { new: true, runValidators: true, session },
    );
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(400, 'Process denied for not finding data');
  }
};
export const facultyServices = {
  getFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyFromDB,
  deleteSingleFacultyFromDB,
};
