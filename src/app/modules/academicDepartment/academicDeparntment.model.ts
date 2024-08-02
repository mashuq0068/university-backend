import { Schema, model } from "mongoose";
import { IAacademicDepartment } from "./academicDepatment.interface";
import AppError from "../../errors/AppError";


const academicDepartmentSchema = new Schema<IAacademicDepartment>({
  name:{
    type:String,
    required:[true , 'academic department is required'],
    unique:true
  },
 
    academicFaculty:{
        type:Schema.Types.ObjectId,
        required:[true , 'academic Faculty is required'],
        ref:'academicFaculty'
    } 
},
{
    timestamps:true
})

academicDepartmentSchema.pre('save' , async function(next){
  const isAcademicDepartmentExist = await AcademicDepartment.findOne({name: this.name})
  if(isAcademicDepartmentExist){
    throw new Error('Academic department already existed')
  }
  next()
})
  
academicDepartmentSchema.pre('findOneAndUpdate' , async function(next){
  const query = this.getQuery()
  const isAcademicDepartmentExist = await this.model.findOne(query)
  if(!isAcademicDepartmentExist){
    throw new AppError(404 , 'Any academic department did not exist like that')
  }
  next()
})


export const AcademicDepartment = model<IAacademicDepartment>('AcademicDepartment' , academicDepartmentSchema)