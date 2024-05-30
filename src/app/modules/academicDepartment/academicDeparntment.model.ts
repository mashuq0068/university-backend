import { Schema, model } from "mongoose";
import { IAacademicDepartment } from "./academicDepatment.interface";


const academicDepartmentSchema = new Schema<IAacademicDepartment>({
  name:{
    type:String,
    required:[true , 'academic department is required']
  },
 
    academicFaculty:{
        type:Schema.Types.ObjectId,
        required:[true , 'academic Faculty is required'],
        ref:'academicFaculty'
    } 
})

export const AcademicDepartment = model<IAacademicDepartment>('AcademicDepartment' , academicDepartmentSchema)