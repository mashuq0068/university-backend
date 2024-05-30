import { RequestHandler } from "express";
import { academicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";

const createAcademicDepartment:RequestHandler = async (req , res) => {
  const payload = req.body
  const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(payload)
  sendResponse(res , {
    success:true,
    statusCode:httpStatus.OK,
    message:"academic department created successfully",
    data:result

  })
}

const getAcademicDepartments:RequestHandler = async(req, res) => {
 const result = await academicDepartmentServices.getAcademicDepartmentsFromDB()
 sendResponse(res , {
    success:true,
    statusCode:httpStatus.OK,
    message:"academic departments fetched successfully",
    data:result

  })
}

const getSingleAcademicDepartment:RequestHandler = async(req, res) => {
    const id = req.params.academicDepartmentId 
    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(id)
    sendResponse(res , {
        success:true,
        statusCode:httpStatus.OK,
        message:"academic department fetched successfully",
        data:result
    
      })
}
const updateSingleAcademicDepartment:RequestHandler = async (req , res) => {
    const payload = req.body
    const id = req.params.academicDepartmentId 
    const result = await academicDepartmentServices.updateSingleAcademicDepartmentFromDB(id , payload)
    sendResponse(res , {
        success:true,
        statusCode:httpStatus.OK,
        message:"academic department updated successfully",
        data:result
    
      })
}
export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAcademicDepartments,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment
}