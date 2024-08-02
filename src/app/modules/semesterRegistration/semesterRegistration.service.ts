/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: ISemesterRegistration,
) => {
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationModelQuery =
    SemesterRegistration.find().populate('academicSemester');
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModelQuery,
    query,
  )
    .search(['status'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const updateSemesterRegistrationDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const isOngoingOrUpcomingSemester = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (isOngoingOrUpcomingSemester) {
    throw new AppError(
      400,
      `There is already an ${isOngoingOrUpcomingSemester?.status} semester`,
    );
  }

  const currentSemester = await SemesterRegistration.findById(id);
  const currentStatus = currentSemester?.status;
  const requestedStatus = payload?.status;
  if (currentStatus === 'ENDED') {
    throw new AppError(400, 'The semester is already existed');
  }
};
export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  updateSemesterRegistrationDB,
};
