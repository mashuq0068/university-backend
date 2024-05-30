import { AcademicFacultyModel } from "./academicFaculty.model";
import { IAcademicFaculty } from "./academicFacuty.interface";

const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
 const result = await AcademicFacultyModel.create(payload)
 return result
}
const getAcademicFacultyFromDB =async () => {
    const result = await AcademicFacultyModel.find()
    return result
}
const getSingleAcademicFacultyFromDB =async(id: string) =>{
    const result = await AcademicFacultyModel.findById(id)
    return result
}
const updateSingleAcademicFacultyFromDB = async(id:string , payload:Partial<IAcademicFaculty>) => {
    const result = await AcademicFacultyModel.findByIdAndUpdate(id , {$set: payload})
    return result
}
export const academicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateSingleAcademicFacultyFromDB
}