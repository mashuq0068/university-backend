import { IAcademicSemester } from '../academicSemister/academicSemester.interface';

import { UserModel } from './user.model';
const latestStudentId = async (payload: IAcademicSemester) => {
  const latestStudentId = await UserModel.findOne(
    {
      role: 'student',
      id: { $regex: `^${payload?.year || "2024"}${payload?.code || "01"}` },
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return latestStudentId ? latestStudentId?.id?.substring(6) : '0';
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  const currentId = await latestStudentId(payload);
  const newId = Number(currentId) + 1;
  const fullDigitId = newId.toString().padStart(4, '0');
  const studentId = `${payload?.year || "2024"}${payload?.code || "01"}${fullDigitId}`;
  return studentId;
};
const latestFacultyId = async () => {
  const latestFaculty = await UserModel.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 },
  ).sort({ createdAt: -1 });
  return latestFaculty ? latestFaculty?.id?.substring('2') : 0;
};
export const generateFacultyId = async () => {
  const latestId = await latestFacultyId();
  const newId = Number(latestId) + 1;
  const fullDigitId = newId.toString().padStart(4, '0');
  const facultyId = `F-${fullDigitId}`;
  return facultyId;
};
