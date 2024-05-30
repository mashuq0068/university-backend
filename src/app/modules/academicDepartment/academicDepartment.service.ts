import { AcademicDepartment } from "./academicDeparntment.model";
import { IAacademicDepartment } from "./academicDepatment.interface";

const createAcademicDepartmentIntoDB = async (payload: IAacademicDepartment) =>{
    const result =await AcademicDepartment.create(payload)
    return result
} 

const getAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find()
    return result
}
const getSingleAcademicDepartmentFromDB = async(id:string) => {
    const result = await AcademicDepartment.findById(id)
    return result
}
const updateSingleAcademicDepartmentFromDB = async(id:string , payload:Partial<IAacademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate(id , {$set:payload } , {new:true})
    return result
}


export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateSingleAcademicDepartmentFromDB
}