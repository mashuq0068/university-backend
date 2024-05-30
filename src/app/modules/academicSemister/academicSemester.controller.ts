import { RequestHandler } from 'express';
import { academicSemesterServices } from './academicSemester.service';
import sendResponse from '../../utils/SendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import httpStatus from 'http-status';

const createAcademicSemester: RequestHandler = async (req, res) => {
    const result = await academicSemesterServices.createAcademicSemester(req.body)

    sendResponse<IAcademicSemester>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:'Academic semester created successfully',
        data:result
    })
};
const getAcademicSemesters:RequestHandler = async(req , res) =>{
    const result = await academicSemesterServices.getAcademicSemestersFromDB()
    sendResponse<IAcademicSemester[]>(res , {
      statusCode:httpStatus.OK,
      success:true,
      message:"academic semesters fetched successfully",
      data:result
    })
}

const getSingleAcademicSemester:RequestHandler = async(req , res) => {
  const id = req.params.id
  const result= await academicSemesterServices.getSingleAcademicSemestersFromDB(id)
  sendResponse(res , {
    statusCode:httpStatus.OK,
    success:true,
    message:"academic semester fetched successfully",
    data:result
  })
} 

const updateSingleAcademicSemester: RequestHandler = async(req, res) => {
  const id = req.params.id
  const updatedDoc = req.body
  const result = await academicSemesterServices.updateSingleAcademicSemesterFromDB(id, updatedDoc)
  sendResponse(res , {
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic semester updated successfully',
    data:result
})
}
export const academicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester
};
