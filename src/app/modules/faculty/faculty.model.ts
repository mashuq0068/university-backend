import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';
import { TUserName } from '../student/student.interface';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const facultySchema = new Schema<IFaculty>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'user',
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  designation: {
    type: String,
    required: [true, 'designation is required'],
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'academic faculty is required'],
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'academic department is required'],
  },
  profileImg: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const FacultyModel = model<IFaculty>('faculty' , facultySchema)