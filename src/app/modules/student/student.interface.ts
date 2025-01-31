// import { Model } from 'mongoose';

// export interface TPrograms {
//   name: string;
//   date: Date;
//   isWinner?: boolean;
// }

// export interface TPreviousJobs {
//   company: string;
//   position: string;
//   duration: string;
//   salary?: number;
// }

// export type TStudent = {
//   studentId: number;
//   name: string;
//   email: string;
//   password: string;
//   age: number;
//   enrolledCourse: string[];
//   gender: 'Male' | 'Female';
//   address: string;
//   programs: TPrograms;
//   skills: string[];
//   Payment: number;
//   totalPayment: number;
//   duePayment: number;
//   previousJobs: TPreviousJobs[];
//   isAdmin: boolean;
//   isMarried?: boolean;
//   isDeleted: boolean;
// };

// export interface StudentMethods {
//   isExists(id:number): Promise<TStudent | null>;
// }


// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
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
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  academicSemester:Types.ObjectId
  profileImg?: string;
  isDeleted: boolean;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
 
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
  // eslint-disable-next-line no-unused-vars
  findByName(name: string): Promise<TStudent | null>;
  getAllStudents(): Promise<TStudent[]>;
}


// for creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;