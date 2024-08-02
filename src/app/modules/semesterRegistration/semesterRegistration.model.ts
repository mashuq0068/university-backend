import { Schema, model } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';
import {
 
  SemesterRegistrationStatus,
} from './semesterRegistration.constraint';
import AppError from '../../errors/AppError';
import { academicSemesterModel } from '../academicSemister/academicSemester.model';
import httpStatus from 'http-status';

export const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

semesterRegistrationSchema.pre('save', async function (next) {
  const isAcademicSemesterValid = await academicSemesterModel.findById(
    this.academicSemester,
  );
  if (!isAcademicSemesterValid) {
    throw new AppError(500, 'Academic semester is not valid');
  }

  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    );
  }
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester: this.academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }
  next();
});

semesterRegistrationSchema.statics.isAcademicSemesterExisted = async function (
  id: string,
): Promise<boolean> {
  const isAcademicSemesterExist = await SemesterRegistration.findOne({
    academicSemester: id,
  });
  return isAcademicSemesterExist ? true : false;
};
export const SemesterRegistration = model<ISemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
