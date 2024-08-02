// import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';
// import asyncHandler from '../../utils/asyncHandler';
import { RequestHandler } from 'express';
// import { TStudent } from '../student/student.interface';

const createStudent: RequestHandler = async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'student user created successfully',
    success: true,
    data: result,
  });
};
const createFaculty: RequestHandler = async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await userServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'student user created successfully',
    success: true,
    data: result,
  });
};

export const userControllers = {
  createStudent,
  createFaculty,
};
