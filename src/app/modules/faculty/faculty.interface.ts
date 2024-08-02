import { Model, Types } from 'mongoose';
import { TUserName } from '../student/student.interface';

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  designation:string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
}

export class FacultyModelMethods extends Model<IFaculty>{
  
}