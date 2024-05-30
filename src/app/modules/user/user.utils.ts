import { IAcademicSemester } from "../academicSemister/academicSemester.interface";

import { UserModel } from "./user.model";
const latestId = async(payload:IAcademicSemester) => {
 
    const latestStudentId = await UserModel.findOne(
        {
          role: 'student',
          id:{$regex:`^${payload.year}${payload.code}`}
        },
        {
          id: 1,
          _id: 0,
        },
      )
        .sort({
          createdAt: -1,
        })
        .lean();
  
    
        
   
    return latestStudentId ? latestStudentId?.id?.substring(6) : '0'
}

const generateStudentId = async(payload:IAcademicSemester) => {

const currentId = await latestId(payload)
const newId = Number(currentId) + 1
const fullDigitId = newId.toString().padStart(4 , '0')
const studentId = `${payload.year}${payload.code}${fullDigitId}`
return studentId
}
export default generateStudentId
