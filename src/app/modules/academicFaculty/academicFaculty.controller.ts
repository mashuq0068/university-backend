import { RequestHandler } from 'express';
import { academicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';

const createAcademicFaculty: RequestHandler = async (req, res) => {
  const academicFaculty = req.body;
  const result =
    await academicFacultyServices.createAcademicFacultyIntoDB(academicFaculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'created academic faculty successfully',
    data: result,
  });
};

const getAcademicFaculty: RequestHandler = async (req, res) => {
  const result = await academicFacultyServices.getAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'created academic faculty fetched successfully',
    data: result,
  });
};
const getSingleAcademicFaculty:RequestHandler = async (req , res) => {

    const id = req.params.academicFacultyId
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'created academic faculty fetched successfully',
        data: result,
      });
}
const updateSingleAcademicFaculty:RequestHandler = async (req , res) => {

    const id = req.params.academicFacultyId
    const payload = req.body
    const result = await academicFacultyServices.updateSingleAcademicFacultyFromDB(id , payload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'updated academic faculty  successfully',
        data: result,
      });
}
export const academicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty
};
