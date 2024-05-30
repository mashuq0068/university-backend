import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,

} from './academicSemester.interface';
import { months, semesterCodes, semesterNames } from './academicSemester.constant';


export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: semesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save' , async function(next){
 const isAcademicSemesterExisted = await academicSemesterModel.findOne({name:this.name , year:this.year}) 
 if(isAcademicSemesterExisted){
  throw new Error(`${this.name} semester is already created in ${this.year}. You can't make a same semester multiple times in a same year`)
 }

 next()
})

export const academicSemesterModel = model<IAcademicSemester>('academicSemester' , academicSemesterSchema)