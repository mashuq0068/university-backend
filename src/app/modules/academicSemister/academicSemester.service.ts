import { semesterNamesWithCodes } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemester = async (payload: IAcademicSemester) => {
  if (semesterNamesWithCodes[payload.name] !== payload.code) {
    throw new Error('code does not match according to the semester name');
  }
  const result = await academicSemesterModel.create(payload);
  return result;
};

const getAcademicSemestersFromDB = async () => {
  const result = await academicSemesterModel.find();
  return result;
};
const getSingleAcademicSemestersFromDB = async (id: string) => {
  const result = await academicSemesterModel.findById(id);
  return result;
};
const updateSingleAcademicSemesterFromDB = async (
  id: string,
  updatedDoc: Partial<IAcademicSemester>,
) => {
  if (
    updatedDoc.name &&
    updatedDoc.code &&
    semesterNamesWithCodes[updatedDoc.name] !== updatedDoc.code
  )
  {
    throw new Error('code does not match according to the semester name');
  }
  const result = await academicSemesterModel.findByIdAndUpdate(id, {
    $set: { updatedDoc },
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
  getAcademicSemestersFromDB,
  getSingleAcademicSemestersFromDB,
  updateSingleAcademicSemesterFromDB,
};
