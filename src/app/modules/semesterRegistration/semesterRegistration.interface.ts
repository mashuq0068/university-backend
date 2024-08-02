import { Model, Types } from 'mongoose';

export interface ISemesterRegistration {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
}

export interface AcademicSemesterMethodsModel
  extends Model<ISemesterRegistration> {
  // eslint-disable-next-line no-unused-vars
  isAcademicSemesterExist(id: string): Promise<boolean>;
}
