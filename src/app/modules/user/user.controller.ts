// import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';
import asyncHandler from '../../utils/asyncHandler';


const createStudent = asyncHandler( async (req, res) => {
 
    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res , {
      statusCode:httpStatus.OK,
      message:"student user created successfully",
      success:true,
      data:result

    })
 
});

export const userControllers = {
  createStudent,
};
