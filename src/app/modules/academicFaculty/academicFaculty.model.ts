import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFacuty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFacultyModel = model<IAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);